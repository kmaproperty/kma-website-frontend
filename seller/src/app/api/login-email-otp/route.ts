import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    console.log("[Next.js API] Incoming request received on /api/login-email-otp");

    const body = await req.json();
    const { phone, email, otpCode } = body;


    if (!otpCode || (!phone && !email)) {
      console.error("[Next.js API] Validation Failed: 'otpCode' and either 'phone' or 'email' must be provided!");
      return NextResponse.json(
        { 
          success: false, 
          message: "Required parameters missing", 
          debugInfo: { phone: phone || null, email: email || null, otpCode: otpCode || null } 
        }, 
        { status: 400 }
      );
    }

    let targetEmail = email;

    if (!targetEmail && phone) {
      console.log(`📡 [Next.js API] Email missing from frontend. Attempting to fetch email for phone: ${phone}`);
      const BACKEND_BASE = "https://kmaglobalproperty.com/api/backend";
      
      try {
        const userResponse = await axios.get(`${BACKEND_BASE}/users/search-by-phone?phone=${phone}`);
        targetEmail = userResponse.data?.email || userResponse.data?.data?.email;
        console.log(`[Next.js API] Resolved email from backend DB: ${targetEmail}`);
      } catch (userErr: any) {
        console.error("[Next.js API] Backend registry search failed:", userErr.message);
      }
    }

    if (!targetEmail) {
      console.log(`[Next.js API] No registered email found for phone ${phone}. Skipping mail trigger.`);
      return NextResponse.json({ success: true, message: "No registered email found, SMS fallback only." });
    }

    // SMTP Transporter configuration
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"KMA Global Property" <${process.env.SMTP_USER}>`,
      to: targetEmail,
      subject: `Your KMA Login Verification Code`,
    //   text: `Your one-time verification password (OTP) for login is ${otpCode}. It is valid for 10 minutes.`,
    html: `
    <div style="font-family: Arial, sans-serif; padding: 25px; max-width: 480px; border: 1px solid #eef0f5; border-radius: 12px; margin: 0 auto; bg-color: #ffffff;">
      <h2 style="color: #010048; margin-bottom: 4px; font-size: 22px;">KMA Global Property</h2>
      <p style="color: #4a5568; font-size: 14px;">Hello,</p>
      <p style="color: #4a5568; font-size: 14px; line-height: 1.5;">We received a request to log in to your KMA account. Please use the secure one-time password (OTP) below to verify your identity:</p>
      
      <div style="background: #f4f5f8; padding: 16px; text-align: center; font-size: 28px; font-weight: bold; color: #010048; letter-spacing: 6px; border-radius: 8px; margin: 24px 0; border: 1px solid #e2e8f0;">
        ${otpCode}
      </div>
      
      <p style="font-size: 12px; color: #718096; line-height: 1.4; margin-top: 20px;">This security code is strictly confidential and will expire in 10 minutes. If you did not make this request, you can safely ignore this email.</p>
      <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 20px 0;" />
      <p style="font-size: 11px; color: #a0aec0; text-align: center;">© 2026 KMA Global Property. All rights reserved.</p>
    </div>
  `,
    });

    console.log(`[Next.js API] OTP email successfully dispatched to: ${targetEmail}`);
    return NextResponse.json({ success: true, message: "Email dispatched successfully." });

  } catch (error: any) {
    console.error("[Next.js API Global Error]:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}