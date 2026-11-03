import { siteConfig } from "@/content/site-config";
import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Manrope, Schibsted_Grotesk } from "next/font/google";
import { SiteChrome } from "./components/site-chrome";
import { StructuredData } from "./components/structured-data";
import "./ui.css";
import "./agency-pages.css";
import "./services-redesign.css";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#09105F",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://serptrix.com"),
  title: { default: "Serptrix — Digital Growth, Engineered", template: "%s — Serptrix" },
  description:
    "Serptrix connects marketing, development, AI, and strategy into measurable growth systems for ambitious companies.",
  icons: {
    icon: [{ url: "/favicon.svg?v=3", type: "image/svg+xml" }],
    shortcut: "/favicon.svg?v=3",
  },
  openGraph: {
    title: "Serptrix — Digital Growth, Engineered",
    description: "Marketing, development, AI, and strategy—connected.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Serptrix digital growth ecosystem" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serptrix — Digital Growth, Engineered",
    description: "Marketing, development, AI, and strategy—connected.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${instrument.variable} ${schibsted.variable} ${manrope.className}`}>
        <StructuredData
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://serptrix.com/#organization",
                name: "Serptrix",
                url: "https://serptrix.com",
                email: siteConfig.contact.email,
                description: "A digital growth, development, AI, and technology agency.",
              },
              {
                "@type": "ProfessionalService",
                "@id": "https://serptrix.com/#service",
                name: "Serptrix",
                url: "https://serptrix.com",
                areaServed: "Worldwide",
                parentOrganization: { "@id": "https://serptrix.com/#organization" },
              },
            ],
          }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
