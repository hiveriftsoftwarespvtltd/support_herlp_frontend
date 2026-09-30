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
  ListOrdered,
  Link2,
  ExternalLink,
  ChevronRight,
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
          _id: item._id,
          slug: item.slug,
          title: item.title,
          subtitle: item.subtitle || item.excerpt || "",
          category: item.category,
          date: item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Recently",
          publishedAt: item.publishedAt,
          readTime: item.readTime || "5 min read",
          author:
            typeof item.author === "string"
              ? item.author
              : item.author?.name || "Support Help",
          authorRole:
            item.authorRole ||
            (typeof item.author === "object" ? item.author?.role : "") ||
            "Certified Cloud Accounting Specialist",
          authorBio:
            item.authorBio ||
            (typeof item.author === "object" ? item.author?.bio : "") ||
            "",
          image: item.coverImage || "/blog/zoho-books-used-for.png",
          imageAltText: item.imageAltText || item.title,
          featured: !!item.featured,
          excerpt: item.excerpt,
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription,
          canonicalUrl: item.canonicalUrl,
          isRobotsIndex: item.isRobotsIndex !== false,
          isRobotsFollow: item.isRobotsFollow !== false,
          ogTitle: item.ogTitle,
          ogDescription: item.ogDescription,
          ogImage: item.ogImage,
          twitterCard: item.twitterCard || "summary_large_image",
          tableOfContents: item.tableOfContents,
          internalLinks: Array.isArray(item.internalLinks) ? item.internalLinks : [],
          externalLinks: Array.isArray(item.externalLinks) ? item.externalLinks : [],
          schemaMarkup: item.schemaMarkup,
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
  const fallback = fallbackBlogPosts.find((p) => p.slug === slug);
  if (!fallback) return null;
  return {
    ...fallback,
    imageAltText: fallback.title,
    isRobotsIndex: true,
    isRobotsFollow: true,
    canonicalUrl: `https://supporthelp.online/blog/${fallback.slug}`,
  };
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

  const canonical = post.canonicalUrl || `https://supporthelp.online/blog/${post.slug}`;
  const rawImage = post.ogImage || post.image;
  const fullImageUrl = rawImage?.startsWith("http")
    ? rawImage
    : `https://supporthelp.online${rawImage?.startsWith("/") ? "" : "/"}${rawImage}`;

  const metaTitle = post.metaTitle
    ? `${post.metaTitle} | Support Help`
    : `${post.title} – Support Help Blog`;
  const metaDescription = post.metaDescription || post.excerpt;

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: post.isRobotsIndex !== false,
      follow: post.isRobotsFollow !== false,
      nocache: false,
      googleBot: {
        index: post.isRobotsIndex !== false,
        follow: post.isRobotsFollow !== false,
      },
    },
    openGraph: {
      title: post.ogTitle || metaTitle,
      description: post.ogDescription || metaDescription,
      url: canonical,
      siteName: "Support Help Accounting",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: post.imageAltText || post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt || undefined,
      authors: [post.author],
    },
    twitter: {
      card: post.twitterCard || "summary_large_image",
      title: post.ogTitle || metaTitle,
      description: post.ogDescription || metaDescription,
      images: [fullImageUrl],
    },
  };
}

export default async function BlogPostDetailPage({ params }) {
  const { slug } = await params;
  const post = await fetchBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonical = post.canonicalUrl || `https://supporthelp.online/blog/${post.slug}`;
  const rawImage = post.image;
  const fullImageUrl = rawImage?.startsWith("http")
    ? rawImage
    : `https://supporthelp.online${rawImage?.startsWith("/") ? "" : "/"}${rawImage}`;

  // Structured Data Schema (JSON-LD)
  let structuredDataJson = "";
  if (post.schemaMarkup && post.schemaMarkup.trim()) {
    structuredDataJson = post.schemaMarkup;
  } else {
    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
      headline: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      image: [fullImageUrl],
      datePublished: post.publishedAt || new Date().toISOString(),
      dateModified: post.publishedAt || new Date().toISOString(),
      author: {
        "@type": "Person",
        name: post.author,
        jobTitle: post.authorRole,
      },
      publisher: {
        "@type": "Organization",
        name: "Support Help",
        logo: {
          "@type": "ImageObject",
          url: "https://supporthelp.online/logo11.png",
        },
      },
      articleSection: post.category,
      keywords: post.tags?.join(", ") || "",
    };
    structuredDataJson = JSON.stringify(defaultSchema);
  }

  // Related posts (excluding current post)
  const relatedPosts = fallbackBlogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // Table of Contents calculation: use explicit items or build from heading blocks
  const explicitToc = post.tableOfContents?.items || [];
  const headingBlocks = (post.content || [])
    .filter((b) => b.type === "heading")
    .map((b) => ({
      title: b.text,
      id: b.text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    }));

  const tocItems = explicitToc.length > 0 ? explicitToc : headingBlocks;
  const showToc = post.tableOfContents?.enabled !== false && tocItems.length > 0;

  return (
    <main className="w-full bg-[#fafbfc] font-poppins text-[#333333]">
      {/* Schema.org JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredDataJson }}
      />

      {/* 1. Page Hero Banner */}
      <PageHeroBanner
        title={post.title}
        subtitle={post.subtitle || post.excerpt}
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

            {/* Featured Image with SEO Alt Text */}
            <div className="relative w-full h-[320px] sm:h-[440px] rounded-3xl overflow-hidden shadow-md bg-gray-100 border border-gray-200/90">
              <Image
                src={post.image}
                alt={post.imageAltText || post.title}
                fill
                unoptimized
                priority
                className="object-cover object-center"
              />
            </div>

            {/* Table of Contents Box (When Enabled) */}
            {showToc && (
              <div className="p-6 rounded-3xl bg-[#edf7f6]/60 border border-[#368b82]/20 shadow-2xs space-y-3 font-poppins">
                <div className="flex items-center gap-2.5 text-[#368b82]">
                  <ListOrdered className="w-5 h-5 stroke-[2.5]" />
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 uppercase tracking-wide">
                    Table of Contents
                  </h3>
                </div>
                <nav className="space-y-1.5 pt-1">
                  {tocItems.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 hover:text-[#368b82] hover:translate-x-1 transition-all"
                    >
                      <span className="w-5 h-5 rounded-md bg-white border border-[#368b82]/30 text-[#368b82] font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{item.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            )}

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
                  const headingId = block.text
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");
                  return (
                    <div key={idx} id={headingId} className="pt-4 space-y-2 scroll-mt-28">
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

              {/* Internal & External Reference Links Section (When Provided) */}
              {(post.internalLinks?.length > 0 || post.externalLinks?.length > 0) && (
                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <h4 className="font-extrabold text-sm uppercase tracking-wider text-gray-900">
                    Related Resources &amp; Citations
                  </h4>

                  {post.internalLinks?.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-[#368b82] uppercase tracking-wider block flex items-center gap-1.5">
                        <Link2 className="w-3.5 h-3.5" />
                        <span>Recommended Support Help Services</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {post.internalLinks.map((link, lIdx) => (
                          <Link
                            key={lIdx}
                            href={link.url}
                            className="p-3 rounded-xl bg-gray-50 hover:bg-[#edf7f6] border border-gray-200/90 hover:border-[#368b82]/40 text-xs font-bold text-gray-800 hover:text-[#368b82] flex items-center justify-between transition-colors group"
                          >
                            <span>{link.text}</span>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#368b82] group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {post.externalLinks?.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>External References &amp; Guides</span>
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {post.externalLinks.map((link, lIdx) => (
                          <a
                            key={lIdx}
                            href={link.url}
                            target="_blank"
                            rel={link.rel || "nofollow noopener noreferrer"}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-700 transition-colors"
                          >
                            <span>{link.text}</span>
                            <ExternalLink className="w-3 h-3 text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

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
                {post.author?.slice(0, 2) || "SH"}
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-base font-bold text-gray-900 font-poppins">
                    {post.author}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#368b82] bg-white px-2 py-0.5 rounded-md border border-[#368b82]/20">
                    {post.authorRole}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-poppins leading-relaxed">
                  {post.authorBio ||
                    "Published by the certified bookkeeping and financial advisory team at Support Help. Empowering businesses globally with audit-ready financial statements and cloud accounting proficiency."}
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
