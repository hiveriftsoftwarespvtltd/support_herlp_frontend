"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts as fallbackPosts } from "@/data/blogData";
import { blogApi } from "@/api";
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react";

export function HomeBlogSection() {
  const [posts, setPosts] = useState(fallbackPosts.slice(0, 3));

  // Fetch live latest articles created from Admin in MongoDB
  useEffect(() => {
    async function loadLatestBlogs() {
      try {
        const res = await blogApi.getBlogs({ limit: 3 });
        if (res?.data?.items && res.data.items.length > 0) {
          const formatted = res.data.items.map((item) => ({
            slug: item.slug,
            title: item.title,
            category: item.category,
            date: item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recently",
            author:
              typeof item.author === "string"
                ? item.author
                : item.author?.name || "Support Help",
            image: item.coverImage || "/blog/zoho-books-used-for.png",
            excerpt: item.excerpt,
            featured: !!item.featured,
          }));
          setPosts(formatted);
        }
      } catch (err) {
        console.warn("Could not load home blogs from API, using fallback:", err.message);
      }
    }
    loadLatestBlogs();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-gray-50/60 border-t border-gray-200 relative overflow-hidden font-poppins">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#368b82]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Heading with View All Link */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 border-b border-gray-200 pb-6 text-center sm:text-left">
          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
              Knowledge Hub
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-poppins text-gray-900 uppercase tracking-tight">
              FROM OUR BLOG
            </h2>
            <div className="w-16 h-1 bg-[#368b82] rounded-full mx-auto sm:mx-0" />
            <p className="text-xs sm:text-sm text-gray-500 font-poppins leading-relaxed max-w-xl">
              Stay informed with the latest updates on tax regulations, software upgrades, and accounting strategies.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200/90 hover:border-[#368b82] text-gray-800 hover:text-[#368b82] font-bold text-xs uppercase tracking-wider transition-all shadow-2xs hover:shadow hover:-translate-y-0.5 shrink-0"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 text-[#368b82]" />
          </Link>
        </div>

        {/* 3 Live Blog Cards from MongoDB */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <Link
              key={post.slug || idx}
              href={`/blog/${post.slug}`}
              className="group relative bg-white border border-gray-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-[0_22px_45px_-12px_rgba(54,139,130,0.22)] hover:border-[#368b82] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#368b82] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              <div>
                {/* Visual Header / Cover Image with Zoom Effect */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    unoptimized
                    priority={idx === 0}
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle Gradient Shade on Bottom of Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Category tag overlay on top-left */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur-md text-[#368b82] rounded-full font-bold font-poppins text-xs uppercase tracking-wider shadow-sm">
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/90 backdrop-blur-md text-white rounded-full font-bold font-poppins text-[10px] uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Number badge on top-right */}
                  <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 group-hover:bg-[#368b82] backdrop-blur-md text-white flex items-center justify-center font-bold text-xs font-poppins shadow-sm transition-colors duration-300">
                    0{idx + 1}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-poppins">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#368b82]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#368b82]" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg font-poppins text-gray-900 group-hover:text-[#368b82] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-gray-500 font-poppins leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer Interactive Row */}
              <div className="p-6 sm:p-7 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between text-xs font-bold font-poppins text-[#368b82] uppercase tracking-wider">
                <span className="group-hover:translate-x-0.5 transition-transform">
                  Read Full Article
                </span>
                <div className="w-7 h-7 rounded-full bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-2xs">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeBlogSection;
