import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Footer, Header } from "./components/site-shell";
import "./globals.css";

const display = Manrope({ variable: "--font-display", subsets: ["latin"] });
const body = DM_Sans({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://serptrix.com"),
  title: { default: "Serptrix — Growth, engineered as one system", template: "%s — Serptrix" },
  description: "Serptrix connects marketing, development, AI, and strategy into measurable growth systems for ambitious companies.",
  openGraph: { title: "Serptrix — Growth, engineered as one system", description: "Marketing, development, AI, and strategy—connected.", images: [{ url: "/og.png", width: 1733, height: 909, alt: "Serptrix growth systems" }] },
  twitter: { card: "summary_large_image", title: "Serptrix — Growth, engineered as one system", description: "Marketing, development, AI, and strategy—connected.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${body.variable}`}><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main">{children}</main><Footer /></body></html>;
}
