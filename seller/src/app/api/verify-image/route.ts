// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";
// import { v2 as cloudinary } from "cloudinary";

// // Safe Config initialization
// const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// const apiKey = process.env.CLOUDINARY_API_KEY;
// const apiSecret = process.env.CLOUDINARY_API_SECRET;
// const geminiKey = process.env.GEMINI_API_KEY;

// if (cloudName && apiKey && apiSecret) {
//   cloudinary.config({
//     cloud_name: cloudName,
//     api_key: apiKey,
//     api_secret: apiSecret,
//   });
// }

// const ai = new GoogleGenAI({ 
//   apiKey: geminiKey || "" 
// });

// // ⚠️ FIXED: Removed 'export const config' because it is completely unsupported in Next.js App Router

// export async function POST(req: NextRequest) {
//   try {
//     // Check if configuration is missing on runtime
//     if (!cloudName || !geminiKey) {
//       console.error("🚨 [Config Error] Missing environment keys on AWS production container.");
//       return NextResponse.json({ success: false, message: "Server misconfiguration. Environment missing." }, { status: 500 });
//     }

//     const body = await req.json();
//     const { propertyId, stepId, imageBase64, prompt } = body;

//     if (!imageBase64 || !stepId) {
//       return NextResponse.json({ success: false, message: "Missing payload attributes." }, { status: 400 });
//     }

//     const base64Data = imageBase64.split(",")[1] || imageBase64;

//     // ==========================================
//     // 🤖 STAGE 1: DYNAMIC GEMINI VISION API CALL
//     // ==========================================
//     let aiTextResponse = "{}";
//     try {
//       const response = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: [
//           prompt || "Verify this image and return JSON validation object with isValid property.",
//           {
//             inlineData: {
//               mimeType: "image/png",
//               data: base64Data
//             }
//           }
//         ]
//       });
//       aiTextResponse = response.text || "{}";
//     } catch (geminiError) {
//       console.error("🚨 Gemini Core Generation Crash:", geminiError);
//       return NextResponse.json({ success: false, message: "AI Analysis Engine connection timed out." }, { status: 500 });
//     }
    
//     // Cleaning codeblock markdown wrappers safely
//     const cleanJsonString = aiTextResponse
//       .replace(/```json/g, "")
//       .replace(/```/g, "")
//       .trim();

//     let parsedAI;
//     try {
//       parsedAI = JSON.parse(cleanJsonString);
//     } catch (e) {
//       console.error("JSON parsing error from Gemini raw content:", aiTextResponse);
//       parsedAI = { isValid: false, reason: "AI response processing structural failure. Please recapture clear angle." };
//     }

//     // 🚨 IF VERIFICATION FAILS
//     if (!parsedAI.isValid) {
//       return NextResponse.json({
//         success: true,
//         aiVerified: false,
//         message: parsedAI.reason || "Image does not match this property section. Please retake."
//       });
//     }

//     // ==========================================
//     // ☁️ STAGE 2: CLOUDINARY SECURE UPLOAD
//     // ==========================================
//     let uploadResponse;
//     try {
//       uploadResponse = await cloudinary.uploader.upload(imageBase64, {
//         folder: `kma-properties/${propertyId || 'unassigned'}`, 
//         public_id: `verified-${stepId}-${Date.now()}`,
//         resource_type: "image"
//       });
//     } catch (cloudinaryError) {
//       console.error("🚨 Cloudinary Upload Service Crash:", cloudinaryError);
//       return NextResponse.json({ success: false, message: "Cloud Storage connection drop failure." }, { status: 500 });
//     }

//     const cloudinaryPublicUrl = uploadResponse.secure_url;

//     // ==========================================
//     // 🚀 STAGE 3: RETURN SUCCESS + SECURE LINK
//     // ==========================================
//     return NextResponse.json({
//       success: true,
//       aiVerified: true,
//       s3Url: cloudinaryPublicUrl, 
//       message: "Image verified by AI and saved successfully!"
//     });

//   } catch (error: any) {
//     console.error("🚨 Global Next.js Cloudinary pipeline error:", error);
//     return NextResponse.json({ 
//       success: false, 
//       message: "Internal server execution failure.",
//       errorDetails: error?.message || "" 
//     }, { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
//   api_key: process.env.CLOUDINARY_API_KEY || "",
//   api_secret: process.env.CLOUDINARY_API_SECRET || "",
// });

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "50mb",
//     },
//   },
// };

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { propertyId, stepId, imageBase64 } = body;

//     if (!imageBase64 || !stepId || !propertyId) {
//       return NextResponse.json({ success: false, message: "Missing payload attributes." }, { status: 400 });
//     }

//     console.log(`📡 [Cloudinary Proxy] Uploading captured node for step: ${stepId}...`);

//     const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
//       folder: `kma-properties/${propertyId}`, 
//       public_id: `captured-${stepId}-${Date.now()}`,
//       resource_type: "image"
//     });

//     const cloudinaryPublicUrl = uploadResponse.secure_url;
//     console.log("✅ [Cloudinary Proxy] Upload Success! Hosted URL:", cloudinaryPublicUrl);

//     return NextResponse.json({
//       success: true,
//       aiVerified: true, 
//       s3Url: cloudinaryPublicUrl, 
//       message: "Image uploaded and hosted successfully!"
//     });

//   } catch (error: any) {
//     console.error("🚨 Next.js Cloudinary direct injection pipeline error:", error.message);
//     return NextResponse.json({ success: false, message: "Internal server proxy upload failure." }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};

function getDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertyId, stepId, imageBase64, latitude, longitude, floorNumber, bhkTypeId } = body;

    // console.log(`\n=================== 🆕 INCOMING CAPTURE REQUEST ===================`);
    // console.log(`📸 View/Step: ${stepId}`);
    // console.log(`🆔 Current Property ID: ${propertyId}`);
    // console.log(`📍 Live Clicked LL: ${latitude}, ${longitude}`);
    // console.log(`🏢 Live Input Floor: ${floorNumber} | BHK Type ID: ${bhkTypeId}`);
    // console.log(`==================================================================\n`);

    if (!imageBase64 || !stepId || !propertyId || latitude === undefined || longitude === undefined) {
      console.error("❌ Validation Failed: Missing required attributes in payload.");
      return NextResponse.json({ success: false, message: "Required attributes missing." }, { status: 400 });
    }

    const BACKEND_BASE = process.env.NEXT_PUBLIC_API_URL;
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    let adminDynamicToken = "";
    try {
      const loginResponse = await axios.post(
        `${BACKEND_BASE}/admin/login`,
        { username: adminUser, password: adminPass },
        { headers: { "Content-Type": "application/json" } }
      );
      adminDynamicToken = loginResponse?.data?.accessToken || loginResponse?.data?.data?.accessToken;
    } catch (adminAuthErr: any) {
      console.error("🚨 Admin login failed inside verify-image proxy:", adminAuthErr?.message || adminAuthErr);
    }

    if (adminDynamicToken) {
      try {
        const cleanAdminToken = adminDynamicToken.replace("Bearer ", "").trim();
        
        let currentPage = 1;
        let hasMorePages = true;
        const limitPerPage = 100;

        while (hasMorePages) {
          console.log(`📡 [Admin Database Sync] Fetching admin properties page ${currentPage}...`);
          
          const dbResponse = await axios.get(
            `${BACKEND_BASE}/admin/properties?page=${currentPage}&limit=${limitPerPage}`, 
            {
              headers: {
                Authorization: `Bearer ${cleanAdminToken}`,
                "Content-Type": "application/json",
              }
            }
          );

          const existingProperties = dbResponse.data?.data?.items || dbResponse.data?.data || [];

          if (existingProperties.length === 0) {
            hasMorePages = false;
            break;
          }

          for (const prop of existingProperties) {
            if (String(prop.id) === String(propertyId)) continue;

            if (prop.photos && Array.isArray(prop.photos)) {
              for (const photo of prop.photos) {
                const propLat = photo.latitude ? Number(photo.latitude) : null;
                const propLng = photo.longitude ? Number(photo.longitude) : null;

                if (propLat && propLng && !isNaN(propLat) && !isNaN(propLng) && propLat !== 0 && propLng !== 0) {
                  const distance = getDistanceInMeters(latitude, longitude, propLat, propLng);

                  if (distance <= 50) {
                    console.log(`\n🚨 [STAGE 1 MATCH]: Proximity inside 50m! -> Distance: ${distance.toFixed(2)}m with Prop ID: ${prop.id}`);
                    
                    const dbFloorStr = prop.floorNumber !== null && prop.floorNumber !== undefined ? String(prop.floorNumber).trim() : null;
                    const incomingFloorStr = floorNumber !== null && floorNumber !== undefined ? String(floorNumber).trim() : null;

                    console.log(`🔍 [STAGE 2 EVALUATION]: Comparing Floors -> DB Floor: [${dbFloorStr}] vs Live Input Floor: [${incomingFloorStr}]`);

                    if (dbFloorStr !== null && incomingFloorStr !== null && dbFloorStr === incomingFloorStr) {
                      console.log(`✅ Floor Matched! Moving to final step check.`);

                      const dbBhkStr = prop.bhkTypeId !== null && prop.bhkTypeId !== undefined ? String(prop.bhkTypeId).trim() : null;
                      const incomingBhkStr = bhkTypeId !== null && bhkTypeId !== undefined ? String(bhkTypeId).trim() : null;

                      console.log(`🔍 [STAGE 3 EVALUATION]: Comparing BHKs -> DB BHK ID: [${dbBhkStr}] vs Live Input BHK ID: [${incomingBhkStr}]`);

                      if (dbBhkStr !== null && incomingBhkStr !== null && dbBhkStr === incomingBhkStr) {
                        console.warn(`🛑 [CRITICAL TRAP HIT]: Exact Duplicate Found! Blocking upload for Prop ID: ${prop.id}`);
                        
                        return NextResponse.json({
                          success: false,
                          isDuplicate: true,
                          message: "This property is already listed."
                        }, { status: 409 });
                      } else {
                        console.log(`ℹ️ Bypass Granted: BHK is different. Moving to next photo asset.`);
                      }
                    } else {
                      console.log(`ℹ️ Bypass Granted: Floor is different. Moving to next photo asset.`);
                    }
                  }
                }
              }
            }
          }

          if (existingProperties.length < limitPerPage) {
            hasMorePages = false;
          } else {
            currentPage++;
          }
        }
        
        console.log("✅ [Geo-Audit] Full Admin Database proximity scan completed safely with 0 configuration matches.");
      } catch (dbErr: any) {
        console.error("⚠️ Proximity audit bypass due to admin database fetch error:", dbErr?.response?.data || dbErr.message);
      }
    }

    // ☁️ STEP 3: CLOUDINARY MEDIA STREAM UPLOAD
    console.log(`☁️ [Cloudinary] Uploading assets for verified node: ${stepId}...`);
    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: `kma-properties/${propertyId}`,
      public_id: `geo-verified-${stepId}-${Date.now()}`,
      resource_type: "image",
    });

    console.log(`✅ [Cloudinary Success] Hosted URL generated: ${uploadResponse.secure_url}\n`);

    return NextResponse.json({
      success: true,
      isDuplicate: false,
      s3Url: uploadResponse.secure_url,
      message: "Proximity checks passed and hosted successfully!"
    });

  } catch (error: any) {
    console.error("🚨 Next.js Geolocation proxy upload engine crashed:", error.message);
    return NextResponse.json({ success: false, message: "Internal proxy verification engine exception." }, { status: 500 });
  }
}