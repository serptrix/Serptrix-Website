import { siteConfig } from "@/content/site-config";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { ConsentManager } from "./components/consent-manager";
import { MotionShell } from "./components/motion-shell";
import { MotionCapabilitiesProvider } from "./components/motion/use-motion-capabilities";
import { Footer } from "./components/site-footer";
import { Header } from "./components/primary-header";
import { StructuredData } from "./components/structured-data";
import "./ui.css";

const display = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
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
      <body className={display.variable}>
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
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionCapabilitiesProvider>
          <Header />
          <MotionShell>
            <div id="main">{children}</div>
          </MotionShell>
          <Footer />
          <ConsentManager />
        </MotionCapabilitiesProvider>
      </body>
    </html>
  );
}
