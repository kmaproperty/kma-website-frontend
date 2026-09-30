// import { NextResponse } from "next/server";
// import crypto from "crypto";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
//     }

//     const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
//     const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
//     const apiSecret = process.env.CLOUDINARY_API_SECRET;

//     if (!cloudName || !apiKey || !apiSecret) {
//       return NextResponse.json(
//         { success: false, message: "Cloudinary credentials missing on server" },
//         { status: 500 }
//       );
//     }

//     const timestamp = Math.round(new Date().getTime() / 1000);
//     const folder = "property_360_panoramas";

//     const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
//     const signature = crypto.createHash("sha1").update(stringToSign).digest("hex");

//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);
//     uploadFormData.append("api_key", apiKey);
//     uploadFormData.append("timestamp", String(timestamp));
//     uploadFormData.append("signature", signature);
//     uploadFormData.append("folder", folder);

//     const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
//       method: "POST",
//       body: uploadFormData,
//     });

//     const data = await response.json();

//     if (data.secure_url) {
//       return NextResponse.json({
//         success: true,
//         secure_url: data.secure_url,
//         public_id: data.public_id,
//       });
//     }

//     return NextResponse.json(
//       { success: false, message: data.error?.message || "Upload failed" },
//       { status: 400 }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error?.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cloudName =
      process.env.CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey =
      process.env.CLOUDINARY_API_KEY ||
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { success: false, message: "Cloudinary credentials missing on server" },
        { status: 500 }
      );
    }

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "property_360_panoramas";

    const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(stringToSign)
      .digest("hex");

    return NextResponse.json({
      success: true,
      timestamp,
      folder,
      signature,
      apiKey,
      cloudName,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}