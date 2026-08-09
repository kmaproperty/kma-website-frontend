"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";

interface Post {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featuredImage?: string;
}

interface BlogPaginatedListProps {
  posts: Post[];
  itemsPerPage?: number;
}

export default function BlogPaginatedList({
  posts,
  itemsPerPage = 6,
}: BlogPaginatedListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (!posts || posts.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
        <p className="text-slate-500 text-sm">No blogs published yet. Check back soon!</p>
      </div>
    );
  }

  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <Link href={`/blogs/${post.slug}`}>
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
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between gap-4 text-xs text-slate-500 mb-3 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue" />
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
                <div className="w-7 h-7 rounded-full bg-blue text-white group-hover:bg-blue-600 flex items-center justify-center transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => handlePageChange(pageNum)}
              className={`w-10 h-10 rounded-full text-sm font-semibold transition-all ${
                currentPage === pageNum
                  ? "bg-blue text-white shadow-md scale-105"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Button */}
          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            aria-label="Next Page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}