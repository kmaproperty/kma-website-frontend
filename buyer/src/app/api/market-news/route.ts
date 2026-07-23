// import { NextResponse } from "next/server";
// import Parser from "rss-parser";

// const parser = new Parser();

// export async function GET() {
//   try {
//     const GOOGLE_NEWS_RSS = "https://news.google.com/rss/search?q=real+estate+gurgaon+property&hl=en-IN&gl=IN&ceid=IN:en";

//     const feed = await parser.parseURL(GOOGLE_NEWS_RSS);
    
//     const latestItems = feed.items.slice(0, 3).map((item) => {
//       const titleParts = item.title ? item.title.split(" - ") : [""];
//       const cleanTitle = titleParts[0];
//       const source = titleParts[1] || "Market Update";

//       const rawSummary = item.contentSnippet || item.content || "";
//       const cleanSummary = rawSummary.length > 140 ? rawSummary.substring(0, 140) + "..." : rawSummary;

//       return {
//         id: item.guid || Math.random().toString(),
//         title: cleanTitle,
//         summary: cleanSummary || "Click read more to check full infrastructure and property market updates.",
//         source: source,
//         url: item.link || "#",
//         time: item.pubDate ? new Date(item.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"
//       };
//     });

//     return NextResponse.json({ success: true, data: latestItems }, { status: 200 });

//   } catch (error: any) {
//     console.error("RSS Fetch Failure:", error.message);
//     return NextResponse.json({ success: false, message: "Failed to fetch news feed" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function GET() {
//   try {
//     const API_KEY = process.env.GNEWS_API_KEY; 
//     if (!API_KEY) {
//       throw new Error("Missing GNEWS_API_KEY in environment variables.");
//     }

//     const searchTerms = '"Gurugram real estate" OR "Gurgaon property"';
    
//     const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchTerms)}&lang=en&sortby=publishedAt&max=9&apikey=${API_KEY}`;

//     const res = await fetch(url, { 
//       cache: 'no-store',
//       headers: {
//         'Pragma': 'no-cache',
//         'Cache-Control': 'no-cache'
//       }
//     });
    
//     const data = await res.json();

//     if (!res.ok || data.errors) {
//       throw new Error(data.errors ? data.errors[0] : "Failed to fetch from GNews");
//     }

//     const articles = data.articles || [];

//     const marketUpdates = articles.map((item: any) => {
//       const fallbackSummary = item.description || item.content || "Click to read full real estate updates.";
      
//       return {
//         id: item.url || Math.random().toString(),
//         title: item.title || "Gurgaon Property Update",
//         summary: fallbackSummary.length > 140 ? fallbackSummary.substring(0, 140) + "..." : fallbackSummary,
//         source: item.source?.name || "Market Bureau",
//         url: item.url || "#",
//         imageUrl: item.image || null, 
//         time: item.publishedAt ? new Date(item.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now"
//       };
//     });

//     return NextResponse.json({ success: true, data: marketUpdates }, {
//       status: 200,
//       headers: { 
//         "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
//         "Pragma": "no-cache",
//         "Expires": "0"
//       }
//     });

//   } catch (error: any) {
//     console.error("GNews Fetch Failure:", error.message);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function GET() {
//   try {
//     const API_KEY = process.env.GNEWS_API_KEY; 
//     if (!API_KEY) {
//       throw new Error("Missing GNEWS_API_KEY in environment variables.");
//     }

//     const searchTerms = '"Gurugram real estate" OR "Gurgaon property" OR "Delhi NCR real estate"';
    
//     const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchTerms)}&lang=en&sortby=publishedAt&max=9&apikey=${API_KEY}`;

//     const res = await fetch(url, { 
//       cache: 'no-store',
//       headers: {
//         'Pragma': 'no-cache',
//         'Cache-Control': 'no-cache'
//       }
//     });
    
//     const data = await res.json();

//     if (!res.ok || data.errors) {
//       throw new Error(data.errors ? data.errors[0] : "Failed to fetch from GNews");
//     }

//     const articles = data.articles || [];

//     const marketUpdates = articles.map((item: any) => {
//       const fallbackSummary = item.description || item.content || "Click to read full real estate updates.";
      
//       return {
//         id: item.url || Math.random().toString(),
//         title: item.title || "Gurgaon Property Update",
//         summary: fallbackSummary.length > 140 ? fallbackSummary.substring(0, 140) + "..." : fallbackSummary,
//         source: item.source?.name || "Market Bureau",
//         url: item.url || "#",
//         imageUrl: item.image || null, 
//         time: item.publishedAt 
//           ? new Date(item.publishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
//           : "Just now"
//       };
//     });

//     return NextResponse.json({ success: true, data: marketUpdates }, {
//       status: 200,
//       headers: { 
//         "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
//         "Pragma": "no-cache",
//         "Expires": "0"
//       }
//     });

//   } catch (error: any) {
//     console.error("GNews Fetch Failure:", error.message);
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import Parser from "rss-parser";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const parser = new Parser({
  customFields: {
    item: ['media:content', 'enclosure'],
  }
});

const RSS_FEED_URL = "https://economictimes.indiatimes.com/industry/services/property-/-real-estate/rssfeeds/13352306.cms";

const RELEVANT_KEYWORDS = [
  "gurgaon", "gurugram", "ncr", "delhi", "property", "realty", 
  "real estate", "housing", "land", "apartment", "residential", 
  "commercial", "dlf", "m3m", "godrej", "emaar", "sobha"
];

export async function GET() {
  try {
    const feed = await parser.parseURL(RSS_FEED_URL);
    const items = feed.items || [];

    const filteredItems = items.filter((item: any) => {
      const title = (item.title || "").toLowerCase();
      const summary = (item.contentSnippet || item.content || item.summary || "").toLowerCase();
      
      return RELEVANT_KEYWORDS.some((keyword) => 
        title.includes(keyword) || summary.includes(keyword)
      );
    });

    const finalItems = filteredItems.length > 0 ? filteredItems : items;

    const marketUpdates = finalItems.slice(0, 9).map((item: any) => {
      const rawSummary = item.contentSnippet || item.content || item.summary || "Click to read full real estate updates.";
      const cleanSummary = rawSummary.replace(/<[^>]*>?/gm, "").trim();

      const imageUrl = item['media:content']?.$.url || item.enclosure?.url || null;

      const formattedTime = item.pubDate
        ? new Date(item.pubDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "Just now";

      return {
        id: item.guid || item.link || Math.random().toString(),
        title: item.title || "Gurgaon Property Update",
        summary: cleanSummary.length > 140 ? cleanSummary.substring(0, 140) + "..." : cleanSummary,
        source: feed.title || "Economic Times Real Estate",
        url: item.link || "#",
        imageUrl: imageUrl,
        time: formattedTime,
      };
    });

    return NextResponse.json(
      { success: true, data: marketUpdates },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          "Pragma": "no-cache",
          "Expires": "0",
        },
      }
    );
  } catch (error: any) {
    console.error("RSS News Fetch Failure:", error.message);

    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}