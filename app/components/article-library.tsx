"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Article } from "@/content/site-data";

export function ArticleLibrary({ items }: { items: Article[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const shown = useMemo(
    () =>
      items.filter(
        (item) =>
          (category === "All" || item.category === category) &&
          `${item.title} ${item.excerpt}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category, items],
  );

  return (
    <>
      <div className="article-tools">
        <label>
          <span>Search insights</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="search"
            placeholder="Search by topic or question"
          />
        </label>
        <div role="group" aria-label="Filter articles">
          {categories.map((item) => (
            <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="article-library" aria-live="polite">
        {shown.map((article, index) => (
          <article key={article.slug}>
            <div className={`article-visual av-${index}`}>
              <span>{article.category}</span>
            </div>
            <p>
              {article.category} · {article.readingTime}
            </p>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <div>
              <time dateTime={article.date}>{format(article.date)}</time>
              <span>{article.author}</span>
            </div>
            <Link href={`/blog/${article.slug}`}>
              Read article <b>↗</b>
            </Link>
          </article>
        ))}
      </div>
      {shown.length === 0 && (
        <div className="empty-state">
          <h2>No articles match that search.</h2>
          <p>Clear the query or choose another topic.</p>
          <div className="empty-actions">
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
            >
              Reset filters
            </button>
            <Link className="btn btn-primary" href="/contact">
              Ask Serptrix <span>↗</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function format(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
