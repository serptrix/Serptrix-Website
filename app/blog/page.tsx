import Link from "next/link";
import { articles } from "@/content/site-data";
import { ArticleLibrary } from "../components/article-library";

export const metadata = {
  title: "Insights",
  description:
    "Practical Serptrix thinking on search, growth, digital products, ecommerce, AI, automation, and strategy.",
  alternates: { canonical: "/blog" },
};

function slugify(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}

export default function Blog() {
  const featured = articles[0];
  const topicCloud = [...new Set(articles.map((article) => article.category))];

  return (
    <>
      <section className="blog-hero shell">
        <p className="eyebrow">
          <span /> SERPTRIX SIGNAL
        </p>
        <h1>
          Useful thinking for
          <br />
          <em>better digital decisions.</em>
        </h1>
        <p>
          Frameworks and field notes for leaders connecting growth, customer experience, operations, and
          technology.
        </p>
      </section>
      <section className="featured-post shell">
        <div className="featured-post-art">
          <span>EDITOR’S PICK</span>
        </div>
        <article>
          <p>
            {featured.category} · {featured.readingTime}
          </p>
          <h2>{featured.title}</h2>
          <p>{featured.excerpt}</p>
          <div>
            <time>{featured.date}</time>
            <span>{featured.author}</span>
          </div>
          <Link className="btn btn-primary" href={`/blog/${featured.slug}`}>
            Read the feature <span>↗</span>
          </Link>
        </article>
      </section>
      <nav className="category-cloud shell" aria-label="Article categories">
        {topicCloud.map((topic) => (
          <Link href={`/blog/category/${slugify(topic)}`} key={topic}>
            {topic}
          </Link>
        ))}
      </nav>
      <section className="blog-library-section shell">
        <div className="section-head">
          <p className="section-index">LATEST THINKING</p>
          <div>
            <h2>
              Explore the
              <br />
              <em>signal.</em>
            </h2>
          </div>
        </div>
        <ArticleLibrary items={articles} />
      </section>
      <section className="newsletter-cta shell">
        <div>
          <p className="section-index">THE SERPTRIX SIGNAL</p>
          <h2>One useful idea. No noise.</h2>
          <p>Join the newsletter for concise thinking on growth, technology, and practical AI.</p>
        </div>
        <form action="mailto:hello@serptrix.com?subject=Serptrix%20Signal%20subscribe" method="post" encType="text/plain">
          <label className="sr-only" htmlFor="blog-newsletter">
            Work email
          </label>
          <input
            id="blog-newsletter"
            name="email"
            type="email"
            required
            placeholder="Work email address"
            autoComplete="email"
          />
          <button type="submit">
            Subscribe <span>↗</span>
          </button>
        </form>
      </section>
    </>
  );
}
