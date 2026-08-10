import type { MetadataRoute } from "next";
import { articles, caseStudies, services } from "@/content/site-data";

const base = "https://serptrix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/services", "/about", "/case-studies", "/blog", "/contact", "/privacy", "/terms", "/cookies"].map(
    (url) => ({
      url: `${base}${url}`,
      lastModified: new Date("2026-08-06"),
      changeFrequency: (url === "/blog" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: url === "" ? 1 : url === "/services" ? 0.9 : 0.7,
    }),
  );
  const division = ["digital-marketing", "development", "ai-technology"].map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: new Date("2026-08-06"),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));
  const servicePages = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date("2026-08-06"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const posts = articles.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    lastModified: new Date(article.updated),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));
  const cases = caseStudies.map((study) => ({
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
  return [...staticPages, ...division, ...servicePages, ...posts, ...cases, ...cats];
}
