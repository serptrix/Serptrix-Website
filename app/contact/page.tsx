import ContactPage from "@/app/components/contact/contact-page";
import { StructuredData } from "@/app/components/structured-data";
import { siteConfig } from "@/content/site-config";
import { serviceBySlug } from "@/content/service-catalog";

export const metadata = {
  title: "Contact",
  description:
    "Contact Serptrix for design, development, AI and digital marketing. Book a Strategy Call or send a short project inquiry.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Serptrix",
    description:
      "Book a Strategy Call or send a short project inquiry. A person reads every message.",
    url: "/contact",
  },
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const preselectedService = service
    ? serviceBySlug.get(service)?.service?.name ||
      serviceBySlug.get(service)?.pillar?.name ||
      service
    : undefined;

  const contactPoint: Record<string, unknown>[] = [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.contact.email,
      availableLanguage: "English",
    },
  ];

  if (siteConfig.contact.phone) {
    contactPoint.push({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.contact.phone,
      availableLanguage: "English",
    });
  }

  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ContactPage",
              "@id": "https://serptrix.com/contact#webpage",
              url: "https://serptrix.com/contact",
              name: "Contact Serptrix",
              description: metadata.description,
              isPartOf: { "@id": "https://serptrix.com/#organization" },
            },
            {
              "@type": "Organization",
              "@id": "https://serptrix.com/#organization",
              name: "Serptrix",
              url: "https://serptrix.com",
              email: siteConfig.contact.email,
              contactPoint,
            },
          ],
        }}
      />
      <ContactPage preselectedService={preselectedService} />
    </>
  );
}
