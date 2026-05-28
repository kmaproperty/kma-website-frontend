import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { v2 as cloudinary } from "cloudinary";

// Safe Config initialization
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const geminiKey = process.env.GEMINI_API_KEY;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

const ai = new GoogleGenAI({ 
  apiKey: geminiKey || "" 
});

// ⚠️ FIXED: Removed 'export const config' because it is completely unsupported in Next.js App Router

export async function POST(req: NextRequest) {
  try {
    // Check if configuration is missing on runtime
    if (!cloudName || !geminiKey) {
      console.error("🚨 [Config Error] Missing environment keys on AWS production container.");
      return NextResponse.json({ success: false, message: "Server misconfiguration. Environment missing." }, { status: 500 });
    }

    const body = await req.json();
    const { propertyId, stepId, imageBase64, prompt } = body;

    if (!imageBase64 || !stepId) {
      return NextResponse.json({ success: false, message: "Missing payload attributes." }, { status: 400 });
    }

    const base64Data = imageBase64.split(",")[1] || imageBase64;

    // ==========================================
    // 🤖 STAGE 1: DYNAMIC GEMINI VISION API CALL
    // ==========================================
    let aiTextResponse = "{}";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          prompt || "Verify this image and return JSON validation object with isValid property.",
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Data
            }
          }
        ]
      });
      aiTextResponse = response.text || "{}";
    } catch (geminiError) {
      console.error("🚨 Gemini Core Generation Crash:", geminiError);
      return NextResponse.json({ success: false, message: "AI Analysis Engine connection timed out." }, { status: 500 });
    }
    
    // Cleaning codeblock markdown wrappers safely
    const cleanJsonString = aiTextResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsedAI;
    try {
      parsedAI = JSON.parse(cleanJsonString);
    } catch (e) {
      console.error("JSON parsing error from Gemini raw content:", aiTextResponse);
      parsedAI = { isValid: false, reason: "AI response processing structural failure. Please recapture clear angle." };
    }

    // 🚨 IF VERIFICATION FAILS
    if (!parsedAI.isValid) {
      return NextResponse.json({
        success: true,
        aiVerified: false,
        message: parsedAI.reason || "Image does not match this property section. Please retake."
      });
    }

    // ==========================================
    // ☁️ STAGE 2: CLOUDINARY SECURE UPLOAD
    // ==========================================
    let uploadResponse;
    try {
      uploadResponse = await cloudinary.uploader.upload(imageBase64, {
        folder: `kma-properties/${propertyId || 'unassigned'}`, 
        public_id: `verified-${stepId}-${Date.now()}`,
        resource_type: "image"
      });
    } catch (cloudinaryError) {
      console.error("🚨 Cloudinary Upload Service Crash:", cloudinaryError);
      return NextResponse.json({ success: false, message: "Cloud Storage connection drop failure." }, { status: 500 });
    }

    const cloudinaryPublicUrl = uploadResponse.secure_url;

    // ==========================================
    // 🚀 STAGE 3: RETURN SUCCESS + SECURE LINK
    // ==========================================
    return NextResponse.json({
      success: true,
      aiVerified: true,
      s3Url: cloudinaryPublicUrl, 
      message: "Image verified by AI and saved successfully!"
    });

  } catch (error: any) {
    console.error("🚨 Global Next.js Cloudinary pipeline error:", error);
    return NextResponse.json({ 
      success: false, 
      message: "Internal server execution failure.",
      errorDetails: error?.message || "" 
    }, { status: 500 });
  }
}