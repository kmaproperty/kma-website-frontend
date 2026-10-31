import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { client_phone, referrer_phone, client_name, referrer_name, refer_link } = body;

    const response = await axios.post(
      "https://app.pickyassist.com/url/a56cd422cec8d824b6d234e0510820b5a68c77f5",
      {
        client_phone,
        referrer_phone,
        client_name,
        referrer_name,
        refer_link,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    console.error("PickyAssist Proxy Error:", error?.response?.data || error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send WhatsApp message via PickyAssist",
      },
      { status: 500 }
    );
  }
}