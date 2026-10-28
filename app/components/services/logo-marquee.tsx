import Image from "next/image";
import Link from "next/link";
import type { ApprovedLogo } from "@/content/approved-logos";

export function LogoMarquee({ items, label = "Selected relationships and platforms" }: { items: ApprovedLogo[]; label?: string }) {
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <section className="agency-marquee" aria-label={label}>
      <p>{label}</p>
      <div className="agency-marquee-window">
        <div className="agency-marquee-track">
          {loop.map((item, index) => {
            const content = <><Image src={item.image} alt="" width={148} height={44} /><span>{item.name}<small>{item.relationship}</small></span></>;
            return item.destination ? <Link key={`${item.name}-${index}`} href={item.destination} aria-hidden={index >= items.length} tabIndex={index >= items.length ? -1 : undefined}>{content}</Link> : <div key={`${item.name}-${index}`} aria-hidden={index >= items.length}>{content}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
