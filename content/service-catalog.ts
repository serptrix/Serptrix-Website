import { servicePageCopy } from "./page-copy/index";
import { servicePillars, type ServiceCategory, type ServiceDefinition, type ServicePillar } from "./service-pillars";
export type { PillarSlug, ServiceDefinition, ServiceCategory, ServicePillar } from "./service-pillars";
export { servicePillars };

export type CatalogEntry={kind:"pillar"|"category"|"service";pillar:ServicePillar;category?:ServiceCategory;service?:ServiceDefinition;href:string;segments:string[]};
export const catalogEntries:CatalogEntry[]=servicePillars.flatMap(p=>[{kind:"pillar" as const,pillar:p,href:`/services/${p.slug}`,segments:[p.slug]},...p.categories.flatMap(c=>[{kind:"category" as const,pillar:p,category:c,href:`/services/${p.slug}/${c.slug}`,segments:[p.slug,c.slug]},...c.services.map(service=>({kind:"service" as const,pillar:p,category:c,service,href:`/services/${p.slug}/${c.slug}/${service.slug}`,segments:[p.slug,c.slug,service.slug]}))])]);
export const serviceEntries=catalogEntries.filter(e=>e.kind==="service");
export const categoryEntries=catalogEntries.filter(e=>e.kind==="category");
export const catalogByPath=new Map(catalogEntries.map(e=>[e.segments.join("/"),e]));
export const serviceBySlug=new Map(serviceEntries.map(e=>[e.service!.slug,e]));
export const getCatalogEntry=(segments:string[])=>catalogByPath.get(segments.join("/"));
export const getServiceHref=(serviceSlug:string)=>serviceBySlug.get(serviceSlug)?.href??"/services";
const fallbackTitle=(e:CatalogEntry)=>e.kind==="pillar"?`${e.pillar.name} Services`:e.kind==="category"?(e.category!.slug==="seo"?"SEO Strategy and Specialist Services":`${e.category!.name} Services`):e.service!.name;
const fallbackDescription=(e:CatalogEntry)=>e.kind==="pillar"?`${e.pillar.description} Explore specialist ${e.pillar.name.toLowerCase()} services from Serptrix.`:e.kind==="category"?`${e.category!.description} Compare options and discuss a focused engagement with Serptrix.`:`${e.service!.outcome} Explore scope, use cases, delivery, and next steps with Serptrix.`;
export const getEntryTitle=(e:CatalogEntry)=>servicePageCopy[e.href]?.metaTitle??fallbackTitle(e);
export const getEntryDescription=(e:CatalogEntry)=>servicePageCopy[e.href]?.metaDescription??fallbackDescription(e);
export const inquiryHref=(service?:ServiceDefinition)=>service?`/contact?service=${encodeURIComponent(service.slug)}#project-inquiry`:"/contact#project-inquiry";
