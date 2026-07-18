import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });

export async function POST(req: Request) {
  try {
    const { userMessage, history } = await req.json();

    if (!userMessage) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 });
    }

    let contextText = "No specific database context found.";
    let detectedCityId: string | null = null;
    let detectedCityName: string | null = null;

    try {
      const embeddingResponse = await ai.models.embedContent({
        model: 'models/gemini-embedding-2',
        contents: userMessage,
      });

      const singleEmbedding = (embeddingResponse as any).embedding;
      const embeddingsArray = (embeddingResponse as any).embeddings;
      const queryVector = singleEmbedding?.values || embeddingsArray?.[0]?.values;

      if (queryVector) {
        const index = pc.Index(process.env.PINECONE_INDEX_NAME!);
        const queryResponse = await index.query({
          vector: queryVector,
          topK: 3,
          includeMetadata: true
        });

        contextText = queryResponse.matches
          ?.map((match) => {
            if (match.metadata?.category === "city-mapping" && match.metadata?.cityId) {
              detectedCityId = match.metadata.cityId as string;
              detectedCityName = match.metadata.cityName as string;
            }
            return match.metadata?.text;
          })
          .filter(Boolean)
          .join("\n\n") || contextText;
      }
    } catch (e) {
      console.error("Vector search failed:", e);
    }

    const lowerMsg = userMessage.toLowerCase();
    if (!detectedCityId) {
      if (lowerMsg.includes("gurgaon") || lowerMsg.includes("gurugram")) {
        detectedCityId = "e8894ea7-b8fc-43da-b983-b1d43c77597e";
        detectedCityName = "Gurugram";
      }
    }

    const formattedContents = [
      ...((history || []).map((h: any) => ({
        role: h.sender === "user" ? "user" : "model",
        parts: [{ text: h.text }]
      }))),
      { role: "user", parts: [{ text: userMessage }] }
    ];

    const systemInstruction = `You are an elite, highly professional real estate AI assistant for KMA. 

CRITICAL CONVERSATION FLOW STRATEGY:
- If the chat history is EMPTY, your absolute first priority is to politely ask the user for their name (e.g., "Welcome to KMA! May I know your name please?"). Do not answer any real estate queries until you get a name.
- Once you know their name, greet them personally and naturally by name in subsequent responses.

CITY EXTRACTION & PROPERTY ROUTING RULE:
- If the user asks to buy or view properties, verify if they have mentioned a specific city. If not, ask them: "Which city are you looking to buy a property in?"
- If a city is present, we must signal the UI component. If it maps to an active id (${detectedCityId}), append this exact tag at the absolute end: [CITY_ID_FOUND:${detectedCityId}]
- If it doesn't match any system mapping entries, respond ONLY with: [WHATSAPP_CITY_FALLBACK:UserTypedCity]

Database Context:
---
${contextText}
---`;

    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: formattedContents,
      config: { systemInstruction }
    });

    let replyText = aiResponse.text || "";
    let propertiesPayload: any[] = [];

    // Force validation check flag
    const hasCityLoadTrigger = replyText.includes("[CITY_ID_FOUND:") || detectedCityId;

    // 🎯 4. SERVER-SIDE DYNAMIC API FETCH PROXY
    if (hasCityLoadTrigger && detectedCityId) {
      const displayCity = detectedCityName || "Gurugram";
      replyText = `Here are the active properties available in ${displayCity} fetched straight from our live project database registry:`;

      try {
        const targetUrl = `https://kmaglobalproperty.com/api/backend/end-user/properties?page=1&limit=20&cityId=${detectedCityId}&sortBy=price&sortOrder=ASC`;
        console.log(`📡 Server proxy executing pipeline call: ${targetUrl}`);

        const apiRes = await fetch(targetUrl, {
          headers: {
            "Accept": "application/json",
            "User-Agent": "Mozilla/5.0 NextJS Chatbot Proxy"
          }
        });

        const contentType = apiRes.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const apiData = await apiRes.json();

          if (apiData.success && apiData.properties && apiData.properties.length > 0) {
            console.log(`🎉 Ingested ${apiData.properties.length} dynamic listings.`);
            propertiesPayload = apiData.properties.map((p: any) => ({
              id: p.id,
              propertyName: p.propertyName,
              address: p.address || `${p.locality || ""}, ${p.city || ""}`.trim() || `${displayCity}, Haryana`,
              price: p.price,
              bhkType: p.bhkType || "2 BHK",
              imageUrl: p.imageUrl || null,
              locality: p.locality || displayCity
            }));
          } else {
            replyText = `Currently, no direct properties are listed inside our online registry for ${displayCity}. Let me connect you directly to our team desk on WhatsApp. [WHATSAPP_CITY_FALLBACK:${displayCity}]`;
          }
        } else {
          replyText = `Connecting you to our live consultant via WhatsApp for properties in ${displayCity}! [WHATSAPP_CITY_FALLBACK:${displayCity}]`;
        }
      } catch (apiErr: any) {
        console.error("Proxy connection failure trace:", apiErr.message);
      }
    } else if (replyText.includes("[WHATSAPP_CITY_FALLBACK:") || replyText.includes("NOT_FOUND")) {
      // Direct text fallback matching standard
      const cleanCity = userMessage.replace(/please|show|properties|in/gi, "").trim();
      replyText = `[WHATSAPP_CITY_FALLBACK:${cleanCity || "Requested Location"}]`;
    }

    if (replyText.includes("[TRIGGER_WHATSAPP_REDIRECT]")) {
      return NextResponse.json({ success: true, reply: "[TRIGGER_WHATSAPP_REDIRECT]", properties: [] });
    }

    return NextResponse.json({ 
      success: true, 
      reply: replyText.replace(/\[CITY_ID_FOUND:.*?\]/, "").trim(), 
      properties: propertiesPayload 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}