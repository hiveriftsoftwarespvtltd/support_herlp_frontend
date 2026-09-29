import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts as fallbackBlogPosts } from "@/data/blogData";
import { contactInfo } from "@/data/navigationData";
import { PageHeroBanner } from "@/components/Common/PageHeroBanner";
import { IndustryCoffeeSection } from "@/components/Common/IndustryCoffeeSection";
import { API_BASE_URL } from "@/config";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Phone,
  Bookmark,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

async function fetchBlogBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data) {
        const item = json.data;
        return {
          slug: item.slug,
          title: item.title,
          category: item.category,
          date: item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Recently",
          readTime: item.readTime || "5 min read",
          author:
            typeof item.author === "string"
              ? item.author
              : item.author?.name || "Support Help",
          authorRole:
            item.authorRole ||
            (typeof item.author === "object" ? item.author?.role : "") ||
            "Certified Cloud Accounting Specialist",
          image: item.coverImage || "/blog/zoho-books-used-for.png",
          featured: !!item.featured,
          excerpt: item.excerpt,
          tags: Array.isArray(item.tags)
            ? item.tags
            : typeof item.tags === "string"
            ? item.tags.split(",").map((t) => t.trim())
            : [],
          content: Array.isArray(item.content)
            ? item.content
            : [{ type: "paragraph", text: String(item.content || "") }],
        };
      }
    }
  } catch (err) {
    console.warn("Could not fetch blog detail by slug from API:", err.message);
  }
  return fallbackBlogPosts.find((p) => p.slug === slug) || null;
}

export function generateStaticParams() {
  return fallbackBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found – Support Help",
      description: "The requested blog article could not be found.",
    };
  }

  return {
    title: `${post.title} – Support Help Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostDetailPage({ params }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  // Related posts (excluding current post)
  const relatedPosts = fallbackBlogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="w-full bg-[#fafbfc] font-poppins text-[#333333]">
      {/* 1. Page Hero Banner */}
      <PageHeroBanner
        title={post.title}
        subtitle={post.excerpt}
        category="Blog"
        categoryHref="/blog"
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Article Body (8 Cols) */}
          <article className="lg:col-span-8 space-y-8">
            {/* Top Back Navigation & Category Pill */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#368b82] hover:text-[#286b64] uppercase tracking-wider transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to All Articles</span>
              </Link>

              <span className="px-3.5 py-1 rounded-full bg-[#368b82]/10 border border-[#368b82]/20 text-[#368b82] text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            {/* Article Headline & Meta */}
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight font-poppins">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-gray-500 font-poppins border-y border-gray-100 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#edf7f6] text-[#368b82] flex items-center justify-center font-bold text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-800">{post.author}</span>
                    <span className="text-[11px] text-gray-400">{post.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#368b82]" />
                  <span>{post.date}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative w-full h-[320px] sm:h-[440px] rounded-3xl overflow-hidden shadow-md bg-gray-100 border border-gray-200/90">
              <Image
                src={post.image}
                alt={post.title}
                fill
                unoptimized
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Article Body Content */}
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-gray-200/90 shadow-xs space-y-6 text-gray-700 leading-relaxed font-poppins text-sm sm:text-base">
              {post.content.map((block, idx) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={idx} className="leading-relaxed">
                      {block.text}
                    </p>
                  );
                }

                if (block.type === "heading") {
                  return (
                    <div key={idx} className="pt-4 space-y-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight font-poppins">
                        {block.text}
                      </h2>
                      <div className="w-12 h-1 bg-[#368b82] rounded-full" />
                    </div>
                  );
                }

                if (block.type === "list") {
                  return (
                    <ul key={idx} className="space-y-3 py-2">
                      {block.items?.map((item, itemIdx) => {
                        const parts = item.split(":");
                        const hasColon = parts.length > 1;
                        return (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-md bg-[#edf7f6] text-[#368b82] flex items-center justify-center shrink-0 mt-0.5">
                              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <span className="leading-relaxed">
                              {hasColon ? (
                                <>
                                  <strong className="text-gray-900 font-bold">
                                    {parts[0]}:
                                  </strong>{" "}
                                  {parts.slice(1).join(":")}
                                </>
                              ) : (
                                item
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  );
                }

                if (block.type === "quote") {
                  return (
                    <blockquote
                      key={idx}
                      className="relative p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#edf7f6] to-white border-l-4 border-[#368b82] my-4 italic text-gray-800 text-base sm:text-lg font-medium leading-relaxed shadow-2xs"
                    >
                      &ldquo;{block.text}&rdquo;
                    </blockquote>
                  );
                }

                return null;
              })}

              {/* Tags Row */}
              <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-1">
                  Article Tags:
                </span>
                {post.tags?.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-[#edf7f6] hover:text-[#368b82] px-3 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Profile Card */}
            <div className="bg-gradient-to-br from-white to-[#edf7f6]/40 p-6 sm:p-8 rounded-3xl border border-gray-200/90 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-[#368b82] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-md shadow-[#368b82]/20">
                AB
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-base font-bold text-gray-900 font-poppins">
                    {post.author}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#368b82] bg-white px-2 py-0.5 rounded-md border border-[#368b82]/20">
                    Verified Accounting Team
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-poppins leading-relaxed">
                  Published by the certified bookkeeping and financial advisory team at Support Help. Empowering businesses globally with audit-ready financial statements and cloud accounting proficiency.
                </p>
              </div>
            </div>
          </article>

          {/* Right Sticky Sidebar (4 Cols) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Related Insights Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-xs space-y-5">
                <div className="border-b border-gray-100 pb-3">
                  <h3 className="text-base font-bold text-gray-900 tracking-tight font-poppins">
                    Related Articles
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Continue reading latest perspectives
                  </p>
                </div>

                <div className="space-y-4">
                  {relatedPosts.map((rel, idx) => (
                    <Link
                      key={idx}
                      href={`/blog/${rel.slug}`}
                      className="group flex items-start gap-3.5 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200/80">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#368b82] uppercase tracking-wider block">
                          {rel.category}
                        </span>
                        <h4 className="text-xs sm:text-[13px] font-bold text-gray-900 group-hover:text-[#368b82] transition-colors leading-snug line-clamp-2">
                          {rel.title}
                        </h4>
                        <span className="text-[11px] text-gray-400 block">
                          {rel.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Consultation Callout */}
              <div className="bg-gradient-to-br from-[#172f73] via-[#203f99] to-[#122353] text-white rounded-3xl p-6 text-center space-y-3.5 shadow-lg border border-white/10 relative overflow-hidden">
                <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mx-auto text-[#7ee3d7] shadow-xs">
                  <Sparkles className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h4 className="text-base font-bold font-poppins leading-tight">
                  Need Help with Your Bookkeeping?
                </h4>
                <p className="text-xs text-gray-200 leading-relaxed font-poppins">
                  Schedule a 30-minute free discovery consultation with our senior accountants.
                </p>
                <Link
                  href="/free-consultation"
                  className="block bg-[#368b82] hover:bg-[#286b64] text-white py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-xl font-poppins hover:-translate-y-0.5"
                >
                  Book Free Consultation
                </Link>
              </div>

              {/* Quick Support Phone Card */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-[#edf7f6]/60 border border-gray-200/90 rounded-2xl flex items-center gap-3.5 hover:border-[#368b82] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#dbefe9] text-[#368b82] flex items-center justify-center shrink-0 shadow-2xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="text-[11px] text-gray-500 block uppercase font-medium">Quick Support</span>
                  <a
                    href={`tel:${contactInfo.phoneTel}`}
                    className="text-sm font-bold text-gray-900 hover:text-[#368b82] transition-colors font-poppins"
                  >
                    {contactInfo.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 5. Contact / Coffee Section */}
      <IndustryCoffeeSection industryName="Accounting & Financial Advisory" />
    </main>
  );
}
