import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { articles } from "@/content/site-data";
import { ArticleLibrary } from "@/app/components/article-library";
import { Breadcrumbs } from "@/app/components/breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

const slugify = (value: string) => value.toLowerCase().replaceAll(" ", "-");
const activeCategories = () => [...new Set(articles.map((article) => article.category))];

export function generateStaticParams() {
  return activeCategories().map((category) => ({ slug: slugify(category) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = activeCategories().find((category) => slugify(category) === slug);
  return name
    ? {
        title: `${name} Insights`,
        description: `Serptrix articles and practical guidance about ${name.toLowerCase()}.`,
        alternates: { canonical: `/blog/category/${slug}` },
      }
    : {};
}

export default async function Category({ params }: Props) {
  const { slug } = await params;
  const name = activeCategories().find((category) => slugify(category) === slug);
  if (!name) notFound();
  const items = articles.filter((article) => article.category === name);
  return (
    <>
      <div className="shell crumbs-bar">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/blog" }, { label: name }]} />
      </div>
      <section className="category-hero shell">
        <p className="eyebrow">
          <span /> TOPIC
        </p>
        <h1>{name}</h1>
        <p>Expert guidance, frameworks, and practical perspectives from Serptrix.</p>
      </section>
      <section className="blog-library-section shell">
        <ArticleLibrary items={items} />
      </section>
    </>
  );
}
