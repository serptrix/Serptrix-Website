import Link from "next/link";
import { servicePillars } from "@/content/service-pillars";

type MenuService = { name: string; href: string };
type MenuGroup = { name: string; href: string; services: MenuService[] };
type MenuColumn = { name: string; href: string; groups: MenuGroup[] };

export function serviceMenuColumns(): MenuColumn[] {
  return servicePillars.map((pillar) => ({
    name: pillar.name,
    href: `/services/${pillar.slug}`,
    groups: pillar.categories.map((category) => ({
      name: category.name,
      href: `/services/${pillar.slug}/${category.slug}`,
      services: category.services.map((service) => ({
        name: service.name,
        href: `/services/${pillar.slug}/${category.slug}/${service.slug}`,
      })),
    })),
  }));
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function columnHtml(column: MenuColumn) {
  const groups = column.groups
    .map((group) => {
      const services = group.services
        .map((service) => `<a href="${service.href}">${escapeHtml(service.name)}</a>`)
        .join("");
      return `<div class="mega-group"><a class="mega-cat" href="${group.href}">${escapeHtml(group.name)}</a>${services}</div>`;
    })
    .join("");
  return `<div class="mega-col"><a class="mega-pillar" href="${column.href}">${escapeHtml(column.name)}</a>${groups}</div>`;
}

export function servicesMegaDesktopHtml(current = false) {
  const currentAttr = current ? ' aria-current="page"' : "";
  const columns = serviceMenuColumns().map(columnHtml).join("");
  return `<div class="mega"><a href="/services"${currentAttr}>Services</a><div class="mega-panel" role="navigation" aria-label="All services">${columns}</div></div>`;
}

export function servicesMegaMobileHtml() {
  const columns = serviceMenuColumns().map(columnHtml).join("");
  return `<details class="mega-acc"><summary>Services</summary><div class="mega-mobile-list">${columns}</div></details>`;
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

export function ServicesMegaMenu({ current = false }: { current?: boolean }) {
  return (
    <div className="mega">
      <Link href="/services" aria-current={current ? "page" : undefined}>
        Services
      </Link>
      <div className="mega-panel" role="navigation" aria-label="All services">
        {serviceMenuColumns().map((column) => (
          <div className="mega-col" key={column.href}>
            <Link className="mega-pillar" href={column.href}>
              {column.name}
            </Link>
            {column.groups.map((group) => (
              <div className="mega-group" key={group.href}>
                <Link className="mega-cat" href={group.href}>
                  {group.name}
                </Link>
                {group.services.map((service) => (
                  <Link key={service.href} href={service.href}>
                    {service.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ServicesMegaMobile() {
  return (
    <details className="mega-acc">
      <summary>Services</summary>
      <div className="mega-mobile-list">
        {serviceMenuColumns().map((column) => (
          <div className="mega-col" key={column.href}>
            <Link className="mega-pillar" href={column.href}>
              {column.name}
            </Link>
            {column.groups.map((group) => (
              <div className="mega-group" key={group.href}>
                <Link className="mega-cat" href={group.href}>
                  {group.name}
                </Link>
                {group.services.map((service) => (
                  <Link key={service.href} href={service.href}>
                    {service.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </details>
  );
}
