import Link from "next/link";
import { publicServiceMenu, type PublicServiceColumn } from "@/content/public-services";

const menuIntro = "Choose a category, then a specialist service — or open the full overview.";
const menuPrompt = "Not sure where to start? Tell us the outcome you need.";
const menuCta = { href: "/contact#calendly-booking", label: "Book a Strategy Call" };

export function serviceMenuColumns(): PublicServiceColumn[] {
  return publicServiceMenu;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function columnHtml(column: PublicServiceColumn) {
  const links = column.links
    .map((link) => `<a href="${link.href}">${escapeHtml(link.name)}</a>`)
    .join("");
  return `<div class="mega-col"><a class="mega-pillar" href="${column.href}"><span>${column.index}</span>${escapeHtml(column.name)}</a><p>${escapeHtml(column.description)}</p><div class="mega-links">${links}</div></div>`;
}

function panelHtml() {
  const columns = serviceMenuColumns().map(columnHtml).join("");
  return `<div class="mega-head"><div><p class="mega-kicker">Services</p><p class="mega-lede">${escapeHtml(menuIntro)}</p></div><a class="mega-all" href="/services">View all services <span aria-hidden="true">→</span></a></div><div class="mega-grid">${columns}</div><div class="mega-foot"><p>${escapeHtml(menuPrompt)}</p><a class="mega-cta" href="${menuCta.href}">${menuCta.label} <span aria-hidden="true">→</span></a></div>`;
}

export function servicesMegaDesktopHtml(current = false) {
  const currentAttr = current ? ' aria-current="page"' : "";
  return `<div class="mega"><a href="/services"${currentAttr}>Services</a><div class="mega-panel" role="navigation" aria-label="All services">${panelHtml()}</div></div>`;
}

function mobileColumnHtml(column: PublicServiceColumn) {
  const links = column.links
    .map((link) => `<a href="${link.href}">${escapeHtml(link.name)}</a>`)
    .join("");
  return `<details class="mega-acc"><summary><span>${column.index}</span>${escapeHtml(column.name)}</summary><div class="mega-mobile-list"><p>${escapeHtml(column.description)}</p>${links}</div></details>`;
}

export function servicesMegaMobileHtml() {
  return `<div class="mega-mobile">${serviceMenuColumns().map(mobileColumnHtml).join("")}</div>`;
}

export function injectServicesMegaMenu(html: string) {
  const current = /<nav class="nv" aria-label="Main"><a href="\/services" aria-current="page">/.test(html);
  const token = "<!--services-mega-->";
  const withToken = html.replace(
    /(<nav class="nv" aria-label="Main">)<a href="\/services"(?: aria-current="page")?>Services<\/a>/,
    `$1${token}`,
  );
  const withMobile = withToken.replace(
    /<a href="\/services"(?: aria-current="page")?>Services<\/a>/,
    servicesMegaMobileHtml(),
  );
  return withMobile.replace(token, servicesMegaDesktopHtml(current));
}

function MenuColumns() {
  return serviceMenuColumns().map((column) => (
    <div className="mega-col" key={column.href}>
      <Link className="mega-pillar" href={column.href}>
        <span>{column.index}</span>
        {column.name}
      </Link>
      <p>{column.description}</p>
      <div className="mega-links">
        {column.links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  ));
}

function MenuFrame() {
  return (
    <>
      <div className="mega-head">
        <div>
          <p className="mega-kicker">Services</p>
          <p className="mega-lede">{menuIntro}</p>
        </div>
        <Link className="mega-all" href="/services">
          View all services <span aria-hidden="true">→</span>
        </Link>
      </div>
      <div className="mega-grid">
        <MenuColumns />
      </div>
      <div className="mega-foot">
        <p>{menuPrompt}</p>
        <Link className="mega-cta" href={menuCta.href}>
          {menuCta.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}

export function ServicesMegaMenu({ current = false }: { current?: boolean }) {
  return (
    <div className="mega">
      <Link href="/services" aria-current={current ? "page" : undefined}>
        Services
      </Link>
      <div className="mega-panel" role="navigation" aria-label="All services">
        <MenuFrame />
      </div>
    </div>
  );
}

export function ServicesMegaMobile() {
  return (
    <div className="mega-mobile">
      {serviceMenuColumns().map((column) => (
        <details className="mega-acc" key={column.href}>
          <summary>
            <span>{column.index}</span>
            {column.name}
          </summary>
          <div className="mega-mobile-list">
            <p>{column.description}</p>
            {column.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.name}
              </Link>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
