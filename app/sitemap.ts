import type { MetadataRoute } from "next";
import { articles, caseStudies } from "@/content/site-data";
import { catalogEntries } from "@/content/service-catalog";

const base = "https://serptrix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const hasVerifiedCaseStudies = caseStudies.some((study) => study.status === "verified");
  const staticPages = ["", "/services", "/about", "/case-studies", "/blog", "/contact", "/privacy", "/terms", "/cookies"]
    .filter((url) => url !== "/case-studies" || hasVerifiedCaseStudies)
    .map(
    (url) => ({
      url: `${base}${url}`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: (url === "/blog" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: url === "" ? 1 : url === "/services" ? 0.9 : 0.7,
    }),
    );
  const servicePages = catalogEntries.map((entry) => ({
    url: `${base}${entry.href}`,
    lastModified: new Date("2026-10-22"),
    changeFrequency: "monthly" as const,
    priority: entry.kind === "pillar" ? 0.85 : entry.kind === "category" ? 0.8 : 0.75,
  }));
  const posts = articles.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    lastModified: new Date(article.updated),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));
  const cases = caseStudies.filter((study) => study.status === "verified").map((study) => ({
    url: `${base}/case-studies/${study.slug}`,
    lastModified: new Date("2026-08-06"),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));
  const activeCategories = [...new Set(articles.map((article) => article.category))];
  const cats = activeCategories.map((category) => ({
    url: `${base}/blog/category/${category.toLowerCase().replaceAll(" ", "-")}`,
    lastModified: new Date("2026-08-06"),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));
  return [...staticPages, ...servicePages, ...posts, ...cases, ...cats];
}
