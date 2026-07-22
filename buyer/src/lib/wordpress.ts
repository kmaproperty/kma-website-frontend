
const WP_API_URL = "https://kmaglobalproperty.in/wp-json/wp/v2";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage: string | null;
  authorName: string;
  category: string;
}

export async function fetchWPPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=20`, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      next: { revalidate: 60 }, 
    } as any);

    if (!res.ok) throw new Error(`WP API Error: ${res.status}`);
    const posts = await res.json();

    return posts.map((post: any) => ({
      id: post.id,
      title: post.title?.rendered || "Untitled Post",
      slug: post.slug,
      excerpt: post.excerpt?.rendered || "",
      content: post.content?.rendered || "",
      date: new Date(post.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      featuredImage: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      authorName: post._embedded?.["author"]?.[0]?.name || "KMA Editorial",
      category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Real Estate",
    }));
  } catch (error) {
    console.error("Error fetching WP posts:", error);
    return [];
  }
}

// Single Blog Fetch Helper
export async function fetchWPSinglePost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 60 },
    } as any);

    if (!res.ok) throw new Error("Post fetch failure");
    const posts = await res.json();

    if (!posts || posts.length === 0) return null;

    const post = posts[0];
    return {
      id: post.id,
      title: post.title?.rendered || "Untitled Post",
      slug: post.slug,
      excerpt: post.excerpt?.rendered || "",
      content: post.content?.rendered || "",
      date: new Date(post.date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      featuredImage: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      authorName: post._embedded?.["author"]?.[0]?.name || "KMA Editorial",
      category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Real Estate",
    };
  } catch (error) {
    console.error("Error fetching single WP post:", error);
    return null;
  }
}