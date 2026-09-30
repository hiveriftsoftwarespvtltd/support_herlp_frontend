import { API_BASE_URL } from "@/config";
import { blogPosts as fallbackBlogPosts } from "@/data/blogData";

const BASE_URL = "https://supporthelp.online";

export default async function sitemap() {
  const currentDate = new Date().toISOString();

  // Core static site routes
  const staticRoutes = [
    { url: `${BASE_URL}/`, lastModified: currentDate, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/about-us`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/services/bookkeeping`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/services/accounting`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/services/accounts-payable`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/services/accounts-receivable`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/services/payroll-management`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/services/cleanup-catchup-work`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/services/migration-services`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/software-expertise`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/software-expertise/quickbooks`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/software-expertise/zoho-books`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/software-expertise/xero`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/software-expertise/netsuite`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE_URL}/quickbooks-to-zoho-books-migration`, lastModified: currentDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: currentDate, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/free-consultation`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/contact-us`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/clientele`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/affiliation-and-certification`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/country-where-we-serve`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/methodology`, lastModified: currentDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: currentDate, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/terms`, lastModified: currentDate, changeFrequency: "yearly", priority: 0.5 },
  ];

  // Dynamic Blog routes (fetches live published blogs where includeInSitemap !== false)
  let blogRoutes = [];
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/seo/sitemap`, {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json?.data) && json.data.length > 0) {
        blogRoutes = json.data
          .filter((item) => item.isRobotsIndex !== false)
          .map((item) => ({
            url: `${BASE_URL}/blog/${item.slug}`,
            lastModified: item.updatedAt || item.publishedAt || currentDate,
            changeFrequency: item.sitemapChangeFreq || "weekly",
            priority: item.sitemapPriority || 0.8,
          }));
      }
    }
  } catch (err) {
    console.warn("Could not fetch sitemap blogs from API, falling back:", err.message);
  }

  // If live fetch didn't return any, use fallback posts
  if (blogRoutes.length === 0) {
    blogRoutes = fallbackBlogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  }

  return [...staticRoutes, ...blogRoutes];
}
