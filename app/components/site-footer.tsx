import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/content/site-config";

export function Footer() {
  return (
    <footer className="site3-footer">
      <div className="site3-shell site3-footer-top">
        <div className="site3-footer-brand">
          <Link href="/" aria-label="Serptrix home"><Image src="/serptrix_footer.svg" alt="" width={837} height={798} /></Link>
          <p>Marketing, digital products, AI, automation, and strategy—connected around the problem your business needs to solve.</p>
        </div>
        <nav aria-label="Footer services">
          <b>Services</b>
          <Link href="/services/design">Design</Link>
          <Link href="/services/development">Development</Link>
          <Link href="/services/ai">AI</Link>
          <Link href="/services/digital-marketing">Digital marketing</Link>
          <Link href="/services">All services</Link>
        </nav>
        <nav aria-label="Footer company">
          <b>Company</b>
          <Link href="/about">About</Link>
          <Link href="/case-studies">Work</Link>
          <Link href="/blog">Insights</Link>
          <Link href="/contact#project-inquiry">Project inquiry</Link>
        </nav>
        <div className="site3-footer-contact">
          <b>Contact</b>
          <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
          {siteConfig.contact.phone ? <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}>{siteConfig.contact.phone}</a> : null}
          <Link href="/contact#calendly-booking">Book a strategy call <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="site3-shell site3-footer-bottom">
        <span>© {new Date().getFullYear()} Serptrix. All rights reserved.</span>
        <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/cookies">Cookies</Link></div>
      </div>
    </footer>
  );
}
