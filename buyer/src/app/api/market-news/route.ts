import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET() {
  try {
    const GOOGLE_NEWS_RSS = "https://news.google.com/rss/search?q=real+estate+gurgaon+property&hl=en-IN&gl=IN&ceid=IN:en";

    const feed = await parser.parseURL(GOOGLE_NEWS_RSS);
    
    const latestItems = feed.items.slice(0, 3).map((item) => {
      const titleParts = item.title ? item.title.split(" - ") : [""];
      const cleanTitle = titleParts[0];
      const source = titleParts[1] || "Market Update";

      const rawSummary = item.contentSnippet || item.content || "";
      const cleanSummary = rawSummary.length > 140 ? rawSummary.substring(0, 140) + "..." : rawSummary;

      return {
        id: item.guid || Math.random().toString(),
        title: cleanTitle,
        summary: cleanSummary || "Click read more to check full infrastructure and property market updates.",
        source: source,
        url: item.link || "#",
        time: item.pubDate ? new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"
      };
    });

    return NextResponse.json({ success: true, data: latestItems }, { status: 200 });

  } catch (error: any) {
    console.error("RSS Fetch Failure:", error.message);
    return NextResponse.json({ success: false, message: "Failed to fetch news feed" }, { status: 500 });
  }
}