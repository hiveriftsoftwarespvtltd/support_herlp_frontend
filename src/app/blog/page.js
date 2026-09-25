import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { IndustryCoffeeSection } from "@/components/Common/IndustryCoffeeSection";
import {
  Calendar,
  User,
  ArrowRight,
  BookOpen,
  Clock,
  Sparkles,
  Tag,
} from "lucide-react";

export const metadata = {
  title: "Accounting & Financial Blog Insights – Support Help",
  description:
    "Explore authoritative guides, tax compliance updates, cloud software workflows, and bookkeeping strategies written by certified CPAs and accounting professionals.",
};

const categories = [
  "All Articles",
  "Cloud Accounting",
  "Software Guides",
  "Bookkeeping",
  "Cash Flow",
  "Data Migration",
];

export default function BlogHubPage() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <main className="w-full bg-[#fafbfc] font-poppins text-[#333333]">
      {/* 1. Page Hero Banner */}
      <PageHeroBanner
        title="FINANCIAL INSIGHTS & BLOG"
        subtitle="Expert perspectives, software walkthroughs, tax compliance guides, and bookkeeping best practices to give your business total financial clarity."
        category="Knowledge Hub"
        categoryHref="/blog"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        {/* 2. Category Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat, idx) => (
              <span
                key={idx}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all duration-200 ${
                  idx === 0
                    ? "bg-[#368b82] text-white shadow-sm shadow-[#368b82]/25"
                    : "bg-white text-gray-700 border border-gray-200/90 hover:bg-[#edf7f6] hover:text-[#368b82] hover:border-[#368b82]/30"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <BookOpen className="w-4 h-4 text-[#368b82]" />
            <span>Showing {blogPosts.length} articles</span>
          </div>
        </div>

        {/* 3. Featured Hero Article Card */}
        {featuredPost && (
          <section className="relative bg-white border border-gray-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-[0_20px_45px_-12px_rgba(54,139,130,0.2)] transition-all duration-300 group">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#368b82] via-[#203f99] to-[#368b82]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
              {/* Left: Featured Image */}
              <div className="lg:col-span-6">
                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <div className="relative w-full h-[260px] sm:h-[340px] rounded-2xl overflow-hidden shadow-md bg-gray-100">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      unoptimized
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#368b82] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        Featured Article
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right: Text & Meta Details */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-poppins">
                  <span className="px-3 py-1 rounded-md bg-[#edf7f6] text-[#368b82] font-bold">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`} className="block">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 group-hover:text-[#368b82] transition-colors leading-tight font-poppins">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-poppins">
                  {featuredPost.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredPost.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#368b82] hover:bg-[#286b64] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. Regular Articles Grid */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight font-poppins">
              Recent Articles &amp; Insights
            </h3>
            <div className="w-12 h-1 bg-[#368b82] rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, idx) => (
              <Link
                key={idx}
                href={`/blog/${post.slug}`}
                className="group relative bg-white border border-gray-200/90 rounded-3xl overflow-hidden shadow-xs hover:shadow-[0_20px_45px_-12px_rgba(54,139,130,0.2)] hover:border-[#368b82] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Top Subtle Hover Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#368b82] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                <div>
                  {/* Image Container with Zoom */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      unoptimized
                      priority={idx < 2}
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/95 backdrop-blur-md text-[#368b82] rounded-full font-bold font-poppins text-xs uppercase tracking-wider shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-poppins">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#368b82]" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {post.readTime}
                      </span>
                    </div>

                    <h4 className="font-bold text-base sm:text-lg font-poppins text-gray-900 group-hover:text-[#368b82] transition-colors leading-snug">
                      {post.title}
                    </h4>

                    <p className="text-xs sm:text-[13px] text-gray-500 font-poppins leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Interactive Row */}
                <div className="p-6 sm:p-7 pt-0 border-t border-gray-100 mt-2 flex items-center justify-between text-xs font-bold font-poppins text-[#368b82] uppercase tracking-wider">
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    Read Article
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#edf7f6] group-hover:bg-[#368b82] text-[#368b82] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Bottom Lead Capture / Coffee Section */}
        <div className="pt-6">
          <IndustryCoffeeSection industryName="Financial Advisory" />
        </div>
      </div>
    </main>
  );
}
