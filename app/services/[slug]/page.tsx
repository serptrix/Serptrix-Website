import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { pageBySlug, servicePageSlugs } from "@/content/service-pages";
import { ServiceExperience } from "@/app/components/services/service-experience";
import { StructuredData } from "@/app/components/structured-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return servicePageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = pageBySlug(slug);
  if (!page) return {};
  const url = `https://serptrix.com/services/${slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${page.metaTitle} — Serptrix`,
      description: page.metaDescription,
      url,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${page.name} — Serptrix` }],
    },
  };
}

export default async function ServiceRoute({ params }: Props) {
  const { slug } = await params;
  const page = pageBySlug(slug);
  if (!page) notFound();
  const url = `https://serptrix.com/services/${slug}`;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://serptrix.com/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://serptrix.com/services" },
    ...(page.parent
      ? [{ "@type": "ListItem", position: 3, name: page.parent.name, item: `https://serptrix.com${page.parent.href}` }]
      : []),
    { "@type": "ListItem", position: page.parent ? 4 : 3, name: page.name, item: url },
  ];
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: page.name,
              description: page.metaDescription,
              url,
              provider: { "@type": "ProfessionalService", "@id": "https://serptrix.com/#service", name: "Serptrix" },
              areaServed: "Worldwide",
            },
            { "@type": "BreadcrumbList", itemListElement: crumbs },
            {
              "@type": "FAQPage",
              mainEntity: page.faqs.map(([question, answer]) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            },
          ],
        }}
      />
      <ServiceExperience page={page} />
    </>
  );
}
