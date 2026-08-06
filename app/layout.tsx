import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { ConsentManager } from "./components/consent-manager";
import { MotionShell } from "./components/motion-shell";
import { Footer, Header } from "./components/site-shell";
import { StructuredData } from "./components/structured-data";
import "./globals.css";

const display = Manrope({ variable: "--font-display", subsets: ["latin"] });
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://serptrix.com"),
  title: { default: "Serptrix — Digital Growth, Engineered", template: "%s — Serptrix" },
  description: "Serptrix connects marketing, development, AI, and strategy into measurable growth systems for ambitious companies.",
  openGraph: { title: "Serptrix — Digital Growth, Engineered", description: "Marketing, development, AI, and strategy—connected.", images: [{ url: "/og.png", width: 1659, height: 948, alt: "Serptrix digital growth ecosystem" }] },
  twitter: { card: "summary_large_image", title: "Serptrix — Digital Growth, Engineered", description: "Marketing, development, AI, and strategy—connected.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${body.variable}`}>
    <StructuredData data={{ "@context": "https://schema.org", "@graph": [{ "@type": "Organization", "@id": "https://serptrix.com/#organization", name: "Serptrix", url: "https://serptrix.com", description: "A digital growth, development, AI, and technology agency." }, { "@type": "ProfessionalService", "@id": "https://serptrix.com/#service", name: "Serptrix", url: "https://serptrix.com", areaServed: "Worldwide", parentOrganization: { "@id": "https://serptrix.com/#organization" } }] }} />
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <MotionShell><div id="main">{children}</div></MotionShell>
    <Footer />
    <ConsentManager />
  </body></html>;
}
