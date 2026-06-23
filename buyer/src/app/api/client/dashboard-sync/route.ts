import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const referrerId = searchParams.get("referrerId");

    if (!referrerId) {
      return NextResponse.json(
        { success: false, message: "Client identity context token (referrerId) is required." },
        { status: 400 }
      );
    }

    const adminUser = process.env.ADMIN_USER?.replace(/['"]/g, '').trim();
    const adminPass = process.env.ADMIN_PASS?.replace(/['"]/g, '').trim();

    const BACKEND_BASE = "https://kmaglobalproperty.com/api/backend";
    const LIVE_ADMIN_BASE = "http://15.207.193.17:3000/admin";

    let adminDynamicToken = "";
    try {
      const loginResponse = await axios.post(
        `${BACKEND_BASE}/admin/login`,
        { username: adminUser, password: adminPass },
        { headers: { "Content-Type": "application/json" } }
      );
      adminDynamicToken = loginResponse?.data?.accessToken || loginResponse?.data?.data?.accessToken;
    } catch (adminAuthErr: any) {
      console.error("🚨 Admin login gateway rejected:", adminAuthErr.message);
      return NextResponse.json({ success: false, message: "Server authentication failure." }, { status: 401 });
    }

    if (!adminDynamicToken) {
      return NextResponse.json({ success: false, message: "Token generation failure." }, { status: 500 });
    }

    try {
      const cleanAdminToken = adminDynamicToken.replace("Bearer ", "").trim();
      
      const dataResponse = await axios.get(
        `${LIVE_ADMIN_BASE}/referrals?page=1&limit=200`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cleanAdminToken}`,
          },
        }
      );

      const allReferrals = dataResponse?.data?.data || [];

      const userSpecificReferrals = allReferrals.filter(
        (item: any) => String(item.referrerUniqueId).trim() === String(referrerId).trim()
      );

      console.log(`🎉 [Server Filter] Streamed ${userSpecificReferrals.length} personalized entries out of ${allReferrals.length} total rows.`);

      return NextResponse.json({
        success: true,
        data: userSpecificReferrals
      }, { status: 200 });

    } catch (fetchErr: any) {
      return NextResponse.json({ 
        success: false, 
        message: `Referral Sync Failed: ${fetchErr.message}` 
      }, { status: 500 });
    }

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Internal server error context." }, { status: 500 });
  }
}