import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertyId, photos, fileKeys, sellerToken } = body;

    if (!propertyId) {
      return NextResponse.json({ success: false, message: "Property ID missing." }, { status: 400 });
    }

    // 🎯 SECURE SERVER-SIDE ENVIRONMENT VARIABLES (No public leak!)
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    const BACKEND_BASE = "https://kmaglobalproperty.com/api/backend";

    // ==========================================
    // 🚀 STAGE 1: STEP-4 PHOTOS SAVE (Using Seller Token)
    // ==========================================
    if (photos && photos.length > 0 && sellerToken) {
      console.log("📡 [Server] Saving Step-4 assets using seller session...");
      const cleanSellerToken = sellerToken.replace("Bearer ", "").trim();
      
      try {
        await axios.post(
          `${BACKEND_BASE}/property/step-4`,
          { propertyId, photos },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cleanSellerToken}`,
            },
          }
        );
        console.log("✅ [Server] Step-4 Photos saved successfully!");
      } catch (step4Err: any) {
        console.error("🚨 [Server Error] Step-4 save failed:", step4Err?.response?.data || step4Err.message);
        return NextResponse.json({ 
          success: false, 
          message: `Step-4 Save Failed: ${step4Err?.response?.data?.message || step4Err.message}` 
        }, { status: 500 });
      }
    }

    // ==========================================
    // 🤖 STAGE 2: LIVE ADMIN LOGIN (To get privileged session)
    // ==========================================
    console.log(" [Server] Authenticating administrative bypass session...");
    let adminDynamicToken = "";
    try {
      const loginResponse = await axios.post(
        `${BACKEND_BASE}/admin/login`,
        { username: adminUser, password: adminPass },
        { headers: { "Content-Type": "application/json" } }
      );
      adminDynamicToken = loginResponse?.data?.accessToken || loginResponse?.data?.data?.accessToken;
    } catch (adminAuthErr: any) {
      console.error("🚨 [Server Error] Admin authentication gateway rejected:", adminAuthErr?.response?.data || adminAuthErr.message);
      return NextResponse.json({ success: false, message: "Admin Authentication Failed on server context." }, { status: 401 });
    }

    // ==========================================
    // ⚡ STAGE 3: BULK MEDIA APPROVAL (Using Dynamic Admin Token)
    // ==========================================
    if (fileKeys && Array.isArray(fileKeys) && fileKeys.length > 0 && adminDynamicToken) {
      console.log("📡 [Server] Executing media bulk-approval pipeline...");
      try {
        const cleanAdminToken = adminDynamicToken.replace("Bearer ", "").trim();
        await axios.post(
          `${BACKEND_BASE}/admin/properties/${propertyId}/media/bulk-approve`,
          { fileKeys },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cleanAdminToken}`,
            },
          }
        );
        console.log(" [Server] Bulk media approval successfully completed!");
      } catch (bulkErr: any) {
        console.error(" [Server Error] Bulk approval endpoint failed:", bulkErr?.response?.data || bulkErr.message);
        return NextResponse.json({ 
          success: false, 
          message: `Bulk Approval Failed: ${bulkErr?.response?.data?.message || bulkErr.message}` 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, message: "All pipelines synchronized and approved successfully!" });

  } catch (error: any) {
    console.error("🚨 [Server Global Crash]:", error.message);
    return NextResponse.json({ success: false, message: "Internal server proxy processing exception." }, { status: 500 });
  }
}