import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { userId, email } = await req.json();

    if (!userId || !email) {
      return NextResponse.json({ success: false, message: "Missing userId or email" }, { status: 400 });
    }

    console.log(`📥 [Next.js Mail Node] Request received for User ID: ${userId}`);

    // 🎯 SECURE ENVIRONMENT: Fetch credentials from process.env
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    console.log("📡 [Server] Initiating secure server-to-server admin authentication for agreement fetch...");

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
      console.error("❌ [Server] Admin token validation failed for agreement route.");
      return NextResponse.json({ success: false, message: "Admin authentication failed on server context." }, { status: 401 });
    }

    console.log("[Server] Admin token secured. Downloading agreement PDF...");

    const BACKEND_DOWNLOAD_URL = `https://kmaglobalproperty.com/api/backend/admin/users/${userId}/agreement?action=download`;
    
    let pdfBuffer;
    try {
      const pdfResponse = await axios.get(BACKEND_DOWNLOAD_URL, {
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer ${adminDynamicToken.replace("Bearer ", "").trim()}`,
          "Content-Type": "application/json",
        },
      });
      pdfBuffer = pdfResponse.data;
    } catch (fetchErr: any) {
      console.error("[Next.js Mail Node] Failed to fetch PDF from backend admin API:", fetchErr.response?.data || fetchErr.message);
      return NextResponse.json({ success: false, message: "Failed to download agreement from backend" }, { status: 500 });
    }

    // 3. Nodemailer SMTP Transporter Setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 4. Send Email with Attached Signed Agreement
    await transporter.sendMail({
      from: `"KMA Global Property" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `📄 Your Signed KMA Channel Partner Agreement`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; max-width: 500px; border: 1px solid #eef0f5; border-radius: 12px; margin: 0 auto; background-color: #ffffff;">
          <h2 style="color: #010048; margin-bottom: 5px;">KMA Global Property</h2>
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin-bottom: 20px;" />
          <p style="color: #2d3748; font-size: 14px;">Hello Partner,</p>
          <p style="color: #4a5568; font-size: 14px; line-height: 1.5;">Congratulations! Your Channel Partner onboarding is complete.</p>
          <p style="color: #4a5568; font-size: 14px; line-height: 1.5;">Please find the attached copy of your digitally signed <b>KMA Channel Partner Agreement</b> for your permanent financial and legal records.</p>
          <p style="color: #4a5568; font-size: 14px; line-height: 1.5;">Welcome to the KMA Network!</p>
          <hr style="border: 0; border-top: 1px solid #edf2f7; margin-top: 25px;" />
          <p style="font-size: 11px; color: #a0aec0; text-align: center;">© 2026 KMA Global Property. All rights reserved.</p>
        </div>
      `,
      attachments: [
        {
          filename: "KMA_Signed_Agreement.pdf",
          content: pdfBuffer,
          contentType: "application/pdf"
        }
      ]
    });

    console.log(`[Next.js Mail Node] Agreement PDF successfully mailed to: ${email}`);
    return NextResponse.json({ success: true, message: "Agreement PDF emailed successfully" });

  } catch (error: any) {
    console.error("[Next.js Mail Node Error]:", error?.response?.data || error.message);
    return NextResponse.json({ 
      success: false, 
      message: error?.response?.data?.message || "Internal server proxy execution failed." 
    }, { status: 500 });
  }
}