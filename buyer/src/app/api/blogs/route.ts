import { NextResponse } from "next/server";
import { fetchWPPosts, fetchWPSinglePost } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const singlePost = await fetchWPSinglePost(slug);
      if (!singlePost) {
        return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: singlePost }, { status: 200 });
    }

    const posts = await fetchWPPosts();
    return NextResponse.json({ success: true, data: posts }, { status: 200 });

  } catch (error: any) {
    console.error("API Route Error:", error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}