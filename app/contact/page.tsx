import { ContactExperience } from "../components/contact/contact-experience";
import { StructuredData } from "../components/structured-data";
import { siteConfig } from "@/content/site-config";
import { serviceBySlug } from "@/content/service-catalog";

export const metadata = {
  title: "Contact Serptrix | Digital Marketing, Development & AI",
  description:
    "Contact Serptrix for digital marketing, web development, SaaS, ecommerce, AI automation and digital strategy. Submit a project inquiry or book a strategy call.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Serptrix | Digital Marketing, Development & AI",
    description:
      "Tell Serptrix what you are building, improving, or scaling. Submit a project inquiry or book a strategy call.",
    url: "/contact",
  },
};

export default async function Contact({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const preselectedService = service ? serviceBySlug.get(service)?.service?.name : undefined;
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
      <ContactExperience preselectedService={preselectedService} />
    </>
  );
}
