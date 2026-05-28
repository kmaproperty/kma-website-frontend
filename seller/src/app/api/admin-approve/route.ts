import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { propertyId } = body;

    if (!propertyId) {
      return NextResponse.json({ success: false, message: "Property ID missing" }, { status: 400 });
    }

    // 🎯 SECURE ENVIRONMENT: No NEXT_PUBLIC prefix. Browser cannot leak this!
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    console.log("📡 [Server] Initiating secure server-to-server admin authentication...");

    // 1. Authenticate against core admin login gateway
    const loginResponse = await axios.post(
      "https://kmaglobalproperty.com/api/backend/admin/login",
      { username: adminUser, password: adminPass },
      { headers: { "Content-Type": "application/json" } }
    );

    const adminDynamicToken = 
      loginResponse?.data?.accessToken || 
      loginResponse?.data?.token ||
      loginResponse?.data?.data?.accessToken;

    if (!adminDynamicToken) {
      return NextResponse.json({ success: false, message: "Admin token validation failed on server context." }, { status: 401 });
    }

    console.log("✅ [Server] Admin token secured. Triggering proper admin approval endpoint...");

    // 2. 🎯 FIXED ROUTE: Added missing '/admin' back into the endpoint mapping path
    await axios.post(
      `https://kmaglobalproperty.com/api/backend/admin/properties/${propertyId}/approve`,
      { comment: "Automated real-time activation override via secure server-side API proxy module." },
      {
        headers: {
          Authorization: `Bearer ${adminDynamicToken.replace("Bearer ", "").trim()}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ success: true, message: "Property approved securely via server layout!" });

  } catch (error: any) {
    console.error("🚨 [Server Error] Admin proxy bridge failed:", error?.response?.data || error?.message);
    return NextResponse.json({ 
      success: false, 
      message: error?.response?.data?.message || "Internal server proxy execution failed." 
    }, { status: 500 });
  }
}