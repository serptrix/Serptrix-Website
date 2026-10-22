import Link from "next/link";
import { articles, caseStudies } from "@/content/site-data";
import { serviceEntries } from "@/content/service-catalog";
import { Breadcrumbs } from "../components/breadcrumbs";

type Props = { searchParams: Promise<{ q?: string }> };

export const metadata = {
  title: "Search",
  robots: { index: false, follow: true },
};

const suggestions = ["AI", "SEO", "Website", "Ecommerce", "Strategy"];

export default async function Search({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const term = q.trim().toLowerCase();
  const all = [
    ...serviceEntries.map((entry) => ({
      type: "Service",
      title: entry.service!.name,
      copy: entry.service!.outcome,
      href: entry.href,
    })),
    ...articles.map((item) => ({
      type: "Insight",
      title: item.title,
      copy: item.excerpt,
      href: `/blog/${item.slug}`,
    })),
    ...caseStudies.map((item) => ({
      type: "Case Study",
      title: item.project,
      copy: item.challenge,
      href: `/case-studies/${item.slug}`,
    })),
  ];
  const results = term
    ? all.filter((item) => `${item.title} ${item.copy} ${item.type}`.toLowerCase().includes(term))
    : [];

  return (
    <>
      <section className="search-hero shell">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
        <p className="eyebrow">
          <span /> SITE SEARCH
        </p>
        <h1>
          Find the useful
          <br />
          <em>signal.</em>
        </h1>
        <form action="/search" role="search" noValidate>
          <label className="sr-only" htmlFor="site-search">
            Search services, insights, and case studies
          </label>
          <input
            id="site-search"
            name="q"
            defaultValue={q}
            type="search"
            placeholder="Search services, insights, and case studies"
            autoComplete="off"
          />
          <button type="submit">
            Search <span>↗</span>
          </button>
        </form>
        <div className="search-suggestions" aria-label="Suggested searches">
          {suggestions.map((suggestion) => (
            <Link key={suggestion} href={`/search?q=${encodeURIComponent(suggestion)}`}>
              {suggestion}
            </Link>
          ))}
        </div>
      </section>
      <section className="search-results shell" aria-live="polite">
        <p>
          {term
            ? `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”`
            : "Enter a topic, service, or business challenge."}
        </p>
        {results.map((item) => (
          <article key={item.href}>
            <span>{item.type}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </div>
            <Link href={item.href} aria-label={`Open ${item.title}`}>
              ↗
            </Link>
          </article>
        ))}
        {term && results.length === 0 && (
          <div className="empty-state">
            <h2>No matching signal found.</h2>
            <p>Try a broader term or explore the complete services hub.</p>
            <div className="empty-actions">
              <Link className="btn btn-primary" href="/services">
                Explore services <span>→</span>
              </Link>
              <Link className="btn btn-quiet" href="/contact">
                Ask Serptrix <span>↗</span>
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
