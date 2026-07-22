import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, User, BookOpen } from "lucide-react";
import { fetchWPPosts } from "@/lib/wordpress";
import HomdeHeader from "@/components/header/homeHeader";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeFooter from "@/components/footer/homeFooter";
import NewsletterBanner from "@/components/NewsLetterBanner";

export const metadata = {
  title: "Blogs & Real Estate Insights | KMA Global Property",
  description: "Stay updated with market trends, property guides, and news from KMA Global Property.",
};

export default async function BlogListingPage() {
  const posts = await fetchWPPosts();

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 pb-20">
        <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
                <div className="pointer-events-auto w-full flex justify-center">
                  <HomdeHeader />
                </div>
              </div>
      
      <section className="sm:rounded-br-[72px] sm:rounded-bl-[72px] lg:rounded-br-[100px] lg:rounded-bl-[100px] bg-blue text-white py-25 md:py-35 px-4 shadow-md">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-3xl md:text-6xl font-bold tracking-wide text-white leading-tighter">
            Real Estate <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-white/90">Intelligence</span> for Gurgaon
          </h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto font-light">
            Market trends, RERA guides, locality comparisons, NRI advisory and investment analysis — researched and written by the KMA Global Property advisory desk to help you buy with confidence.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 -mt-8 mb-20">
        {posts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
            <p className="text-slate-500 text-sm">No blogs published yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <Link href={`/blogs/${post.slug}`} >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    {post.featuredImage ? (
                      <img 
                        src={post.featuredImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#02013b]/5 text-blue-900 font-bold text-sm">
                        KMA
                      </div>
                    )}
                    {/* <span className="absolute top-3 left-3 bg-[#02013b] text-cyan-300 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md">
                      {post.category}
                    </span> */}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4 text-xs text-slate-500 mb-3 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-blue" />
                        {/* {post.authorName} */}
                        KMA
                      </span>
                    </div>

                    <h2 
                      className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-200 line-clamp-2 leading-tight"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />

                    <div 
                      className="text-sm text-slate-600 mt-3 line-clamp-3 leading-[140%] font-normal"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                  </div>
                </Link>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                  <Link 
                    href={`/blogs/${post.slug}`} 
                    className="inline-flex items-center justify-between w-full pt-4 text-xs font-bold text-blue group-hover:text-blue-900 transition-colors"
                  >
                    <span>Read Full Article</span>
                    <div className="w-7 h-7 rounded-full bg-blue text-white group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>

              </article>
            ))}
          </div>
        )}
      </main>

      <NewsletterBanner/>

      <div className="bg-text-black flex justify-center">
                            <AboutusDataSync />
                            <HomeFooter tab={1} />
                        </div>

    </div>
  );
}