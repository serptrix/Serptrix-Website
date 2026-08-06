import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { divisions, serviceBySlug, services } from "@/content/site-data";
import { DivisionTemplate, ServiceTemplate } from "@/app/components/service-templates";
type Props={params:Promise<{slug:string}>};
export async function generateStaticParams(){return [...Object.keys(divisions),...services.map(s=>s.slug)].map(slug=>({slug}))}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;if(slug in divisions){const d=divisions[slug as keyof typeof divisions];return {title:d.name,description:d.summary,alternates:{canonical:`/services/${slug}`}}}const s=serviceBySlug(slug);if(!s)return{};return {title:s.name,description:s.summary,alternates:{canonical:`/services/${slug}`},openGraph:{title:`${s.name} — Serptrix`,description:s.summary}}}
export default async function ServiceRoute({params}:Props){const {slug}=await params;if(slug in divisions)return <DivisionTemplate slug={slug as keyof typeof divisions}/>;const service=serviceBySlug(slug);if(!service)notFound();return <ServiceTemplate service={service}/>}
