import Link from "next/link";
import { ServicesMegaMenu, ServicesMegaMobile } from "@/app/components/services-mega-menu";

type NavKey = "services" | "work" | "about" | "insights" | "contact" | "home";

const links: { key: NavKey; href: string; label: string }[] = [
  { key: "work", href: "/#work", label: "Work" },
  { key: "about", href: "/about", label: "About" },
  { key: "insights", href: "/blog", label: "Insights" },
];

export function RedesignHeader({
  current,
  ctaHref = "/contact#calendly-booking",
}: {
  current?: NavKey;
  ctaHref?: string;
}) {
  return (
    <header className="hd">
      <Link
        href="/"
        className="g"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          font: "700 24px var(--font-schibsted), Schibsted Grotesk, sans-serif",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 34 34" aria-hidden="true">
          <rect width="15" height="15" rx="4" fill="#FBBC03" />
          <rect x="19" width="15" height="15" rx="4" fill="#fff" />
          <rect y="19" width="15" height="15" rx="4" fill="#fff" />
          <rect x="19" y="19" width="15" height="15" rx="4" fill="#FBBC03" />
        </svg>{" "}
        Serptrix
      </Link>
      <nav className="nv" aria-label="Main">
        <ServicesMegaMenu current={current === "services"} />
        {links.map((link) => (
          <Link key={link.key} href={link.href} aria-current={current === link.key ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link href={ctaHref} className="b by sm dsk">
        Book a Strategy Call
      </Link>
      <details className="mm" style={{ border: 0 }}>
        <summary>Menu</summary>
        <div className="mm-panel">
          <ServicesMegaMobile />
          {links.map((link) => (
            <Link key={link.key} href={link.href} aria-current={current === link.key ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
          <Link href={ctaHref}>Book a Strategy Call</Link>
          {current === "contact" ? null : <Link href="/contact">Contact</Link>}
        </div>
      </details>
    </header>
  );
}
