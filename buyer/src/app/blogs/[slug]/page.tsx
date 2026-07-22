import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { fetchWPSinglePost } from "@/lib/wordpress";
import HomdeHeader from "@/components/header/homeHeader";
import AboutusDataSync from "@/components/footer/AboutusDataSync";
import HomeFooter from "@/components/footer/homeFooter";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const post = await fetchWPSinglePost(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | KMA Global Property`,
    description: post.excerpt.replace(/<[^>]*>?/gm, "").substring(0, 160),
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const post = await fetchWPSinglePost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <div className="fixed left-0 right-0 z-[60] flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full flex justify-center">
          <HomdeHeader />
        </div>
      </div>

      <div className="min-h-screen bg-slate-50/40 text-slate-800 pb-20">
        
        <header className="relative w-full min-h-[380px] md:min-h-[480px] bg-[#02013b] flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden border-b border-slate-800 sm:rounded-br-[72px] sm:rounded-bl-[72px] lg:rounded-br-[100px] lg:rounded-bl-[100px] ">
          
          {post.featuredImage && (
            <div className="absolute inset-0 z-0">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02013b] via-[#02013b]/80 to-transparent" />
            </div>
          )}

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
            
            {/* {post.category && (
              <span className="inline-block bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                {post.category}
              </span>
            )} */}

            <h1
              className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md"
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            <div className="flex items-center justify-center gap-6 pt-2 text-xs md:text-sm text-slate-300 font-medium">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                KMA
              </span>
            </div>

          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 -mt-6 relative z-20">
          <main className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-12 shadow-xl">
            <div
              className="wp-blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </main>
        </div>

      </div>
      <div className="bg-text-black flex justify-center">
                      <AboutusDataSync />
                      <HomeFooter tab={1} />
                  </div>
    </>
  );
}