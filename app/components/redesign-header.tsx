"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ServicesMegaMenu, ServicesMegaMobile } from "@/app/components/services-mega-menu";

type NavKey = "services" | "work" | "about" | "insights" | "contact" | "home";

const links: { key: NavKey; href: string; label: string }[] = [
  { key: "work", href: "/#work", label: "Work" },
  { key: "about", href: "/about", label: "About" },
  { key: "insights", href: "/blog", label: "Insights" },
];

function currentFromPath(path: string): NavKey | undefined {
  if (path.startsWith("/services")) return "services";
  if (path.startsWith("/about")) return "about";
  if (path.startsWith("/blog") || path.startsWith("/insights")) return "insights";
  if (path.startsWith("/contact")) return "contact";
  if (path.startsWith("/case-studies") || path.startsWith("/work")) return "work";
  if (path === "/") return "home";
  return undefined;
}

export function RedesignHeader({
  current,
  ctaHref = "/contact#calendly-booking",
}: {
  current?: NavKey;
  ctaHref?: string;
}) {
  const path = usePathname() || "/";
  const active = current ?? currentFromPath(path);

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
        <ServicesMegaMenu current={active === "services"} />
        {links.map((link) => (
          <Link key={link.key} href={link.href} aria-current={active === link.key ? "page" : undefined}>
            {link.label}
          </Link>
        ))}
      </nav>
      <Link href={ctaHref} className="b by sm dsk">
        Book a Strategy Call
      </Link>
      <details className="mm">
        <summary>Menu</summary>
        <div className="mm-panel">
          <ServicesMegaMobile />
          {links.map((link) => (
            <Link key={link.key} href={link.href} aria-current={active === link.key ? "page" : undefined}>
              {link.label}
            </Link>
          ))}
          <Link className="mm-cta" href={ctaHref}>
            Book a Strategy Call
          </Link>
        </div>
      </details>
    </header>
  );
}
