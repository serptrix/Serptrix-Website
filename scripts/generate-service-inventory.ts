import { writeFileSync } from "node:fs";
import { catalogEntries, getEntryDescription, getEntryTitle, serviceEntries } from "../content/service-catalog";

const lines = [
  "# Service architecture and metadata inventory",
  "",
  "Generated from `content/service-catalog.ts`. The catalog is the maintained source for routes, navigation, breadcrumbs, sitemap entries, metadata, search, and inquiry preselection.",
  "",
  `- Pillars: ${catalogEntries.filter((entry) => entry.kind === "pillar").length}`,
  `- Categories: ${catalogEntries.filter((entry) => entry.kind === "category").length}`,
  `- Individual services: ${serviceEntries.length}`,
  `- Total indexable service routes: ${catalogEntries.length + 1} (including the directory)`,
  "",
  "## Route and content matrix",
  "",
  "| Pillar | Category | Service | URL | Search / customer intent | Parent | Primary CTA | Related services | Evidence dependency |",
  "|---|---|---|---|---|---|---|---|---|",
  ...serviceEntries.map((entry) => {
    const service = entry.service!;
    const related = service.related.length ? service.related.join(", ") : "Contextual category siblings";
    return `| ${entry.pillar.name} | ${entry.category!.name} | ${service.name} | \`${entry.href}\` | ${service.intent} | \`/services/${entry.pillar.slug}/${entry.category!.slug}\` | Send a project inquiry (preselected) | ${related} | No client proof claimed; publish only verified case studies, testimonials, platform credentials, and integrations. |`;
  }),
  "",
  "## Metadata inventory",
  "",
  "| Type | URL | Meta title | Meta description | Canonical |",
  "|---|---|---|---|---|",
  "| Directory | `/services` | Design, Development, AI & Marketing Services \| Serptrix | Explore Serptrix design, development, AI, and digital marketing services. Compare focused options and find the right starting point for your business. | `/services` |",
  ...catalogEntries.map((entry) => `| ${entry.kind} | \`${entry.href}\` | ${getEntryTitle(entry).replaceAll("|", "\\|")} | ${getEntryDescription(entry).replaceAll("|", "\\|")} | \`${entry.href}\` |`),
  "",
  "## Legacy redirects",
  "",
  "The former flat URLs are handled as framework-level permanent redirects in `app/services/[...slug]/page.tsx`. Internal links use the canonical hierarchy.",
];

writeFileSync("SERVICE_ARCHITECTURE.md", `${lines.join("\n")}\n`, "utf8");
