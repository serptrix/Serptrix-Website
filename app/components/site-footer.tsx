import Link from "next/link";
import { siteConfig } from "@/content/site-config";

export function Footer() {
  return (
    <footer>
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="logo logo-light" href="/">
            <span className="logo-mark">S</span>
            <span>SERPTRIX</span>
          </Link>
          <p>Serptrix connects marketing, development, AI, and strategy into growth systems for ambitious companies.</p>
          <span>Working globally across time zones.</span>
        </div>
        <div>
          <b>SERVICES</b>
          <Link href="/services/digital-marketing">Digital Marketing</Link>
          <Link href="/services/development">Development</Link>
          <Link href="/services/ai-technology">AI & Technology</Link>
          <Link href="/services">All Services</Link>
        </div>
        <div>
          <b>COMPANY</b>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Insights</Link>
          <Link href="/search">Search</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <b>CONTACT</b>
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          {siteConfig.contact.phone ? (
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>{siteConfig.contact.phone}</a>
          ) : null}
          <span className="social-placeholder">Social channels arriving soon</span>
        </div>
      </div>
      <div className="shell newsletter">
        <div>
          <b>SERPTRIX SIGNAL</b>
          <p>One useful idea on growth, technology, or AI. No noise.</p>
        </div>
        <form action={`mailto:${siteConfig.contact.email}?subject=Serptrix%20Signal%20subscribe`} method="post" encType="text/plain">
          <label className="sr-only" htmlFor="newsletter-email">
            Work email
          </label>
          <input id="newsletter-email" type="email" name="email" required placeholder="Work email address" autoComplete="email" />
          <button type="submit">
            Join the signal <span>↗</span>
          </button>
        </form>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 Serptrix. All rights reserved.</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/cookies">Cookies</Link>
          <span>Strategy / Marketing / Development / AI</span>
        </div>
      </div>
    </footer>
  );
}
