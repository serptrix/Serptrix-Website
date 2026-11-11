import Link from "next/link";
import { siteConfig } from "@/content/site-config";
import { RedesignHeader } from "@/app/components/redesign-header";

const Logo = ({ href = "/" }: { href?: string }) => (
  <Link href={href} className="g" style={{ display: "flex", alignItems: "center", gap: 10, font: "700 24px var(--font-schibsted), Schibsted Grotesk, sans-serif" }}>
    <svg width="32" height="32" viewBox="0 0 34 34" aria-hidden="true">
      <rect width="15" height="15" rx="4" fill="#FBBC03" />
      <rect x="19" width="15" height="15" rx="4" fill="#fff" />
      <rect y="19" width="15" height="15" rx="4" fill="#fff" />
      <rect x="19" y="19" width="15" height="15" rx="4" fill="#FBBC03" />
    </svg>{" "}
    Serptrix
  </Link>
);

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path d="M3 9h11M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export function DetailHeader() {
  return <RedesignHeader current="services" />;
}

export function DetailFooter() {
  const phone = siteConfig.contact.phone;
  const phoneDisplay = phone.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "+1 $1 $2 $3");
  return (
    <footer className="ftw dk">
      <div className="ftp">
        <div className="ftg">
          <div className="fb">
            <Logo />
            <p style={{ marginTop: 14, maxWidth: 300, opacity: 0.85 }}>
              Design, development, AI and digital marketing, working together as one team.
            </p>
          </div>
          <div className="fl" role="navigation" aria-label="Quick links">
            <h3>Quick links</h3>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/services">Services</Link>
              </li>
              <li>
                <Link href="/blog">Insights</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="fl" role="navigation" aria-label="Services">
            <h3>Services</h3>
            <ul>
              <li>
                <Link href="/services#design">Design</Link>
              </li>
              <li>
                <Link href="/services#development">Development</Link>
              </li>
              <li>
                <Link href="/services#ai">AI</Link>
              </li>
              <li>
                <Link href="/services#marketing">Digital Marketing</Link>
              </li>
              <li>
                <Link href="/services#shopify">Shopify</Link>
              </li>
            </ul>
          </div>
          <div className="fl" role="navigation" aria-label="Legal">
            <h3>Legal</h3>
            <ul>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/cookies">Cookie Policy</Link>
              </li>
            </ul>
          </div>
          <div className="fl fc4">
            <h3>Contact</h3>
            <ul>
              <li>
                <span className="fs">Email</span>
                <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
              </li>
              <li>
                <span className="fs">Phone</span>
                <a href={`tel:${phone.replace(/\s/g, "")}`}>{phoneDisplay}</a>
              </li>
            </ul>
            <div className="soc">
              <a href={siteConfig.social.linkedin} aria-label="Serptrix on LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.5 9h3v10h-3zM6 4.5a1.8 1.8 0 110 3.6 1.8 1.8 0 010-3.6zM10 9h2.9v1.4c.5-.9 1.6-1.6 3.1-1.6 3 0 3.5 2 3.5 4.5V19h-3v-5c0-1.2 0-2.6-1.7-2.6S13 12.800 13 14v5h-3z" fill="currentColor" />
                </svg>
              </a>
              <a href={siteConfig.social.instagram} aria-label="Serptrix on Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17" cy="7" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a href={siteConfig.social.facebook} aria-label="Serptrix on Facebook" target="_blank" rel="noopener noreferrer">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.5 20v-7h2.4l.4-3h-2.8V8.300c0-.9.3-1.400 1.500-1.400h1.400V4.200C16.200 4.100 15.300 4 14.400 4 12.400 4 11 5.200 11 7.500V10H8.500v3H11v7z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="wm" aria-hidden="true">
          Serptrix
        </div>
        <div className="fbar">
          <p>© Serptrix. All rights reserved.</p>
          <a href="#main" className="b sm bo">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}

export { Arrow };
