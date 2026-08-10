"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CaseStudy } from "@/content/site-data";

const options = [
  "All",
  "B2B SaaS",
  "Ecommerce",
  "Professional Services",
  "Development",
  "AI & Technology",
  "Digital Marketing",
] as const;

function matchesFilter(item: CaseStudy, filter: (typeof options)[number]) {
  if (filter === "All") return true;
  if (filter === "B2B SaaS" || filter === "Ecommerce" || filter === "Professional Services") {
    return item.industry === filter;
  }
  if (filter === "Development") {
    return item.services.some((service) =>
      /Website Development|SaaS Development|Ecommerce Development/.test(service),
    );
  }
  if (filter === "AI & Technology") {
    return item.services.some((service) => /AI Development|AI Automation|Digital Strategy/.test(service));
  }
  if (filter === "Digital Marketing") {
    return item.services.some((service) =>
      /SEO Optimization|Social Media Marketing|Performance Marketing/.test(service),
    );
  }
  return false;
}

export function CaseLibrary({ items }: { items: CaseStudy[] }) {
  const [filter, setFilter] = useState<(typeof options)[number]>("All");
  const shown = useMemo(() => items.filter((item) => matchesFilter(item, filter)), [filter, items]);

  return (
    <>
      <div className="case-filters" role="group" aria-label="Filter case studies">
        {options.map((option) => (
          <button key={option} aria-pressed={filter === option} onClick={() => setFilter(option)}>
            {option}
          </button>
        ))}
      </div>
      <div className="case-library" aria-live="polite">
        {shown.map((item, index) => (
          <article key={item.slug}>
            <div className={`library-visual lv-${index}`} aria-label="Project visual placeholder">
              <span>CMS VISUAL / {String(index + 1).padStart(2, "0")}</span>
              <strong>{item.result.split(" ")[0]}</strong>
            </div>
            <div>
              <p>
                {item.industry} / {item.status.toUpperCase()}
              </p>
              <h2>{item.project}</h2>
              <h3>{item.challenge}</h3>
              <p>{item.services.join(" · ")}</p>
              <small>{item.result} — evidence pending</small>
              <Link href={`/case-studies/${item.slug}`}>
                View case-study template <b>↗</b>
              </Link>
            </div>
          </article>
        ))}
      </div>
      {shown.length === 0 && (
        <div className="empty-state">
          <h2>No matching studies are published yet.</h2>
          <p>Try another filter or discuss a similar challenge with our team.</p>
          <div className="empty-actions">
            <button type="button" className="btn btn-quiet" onClick={() => setFilter("All")}>
              Clear filters
            </button>
            <Link className="btn btn-primary" href="/contact">
              Discuss your project <span>↗</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
