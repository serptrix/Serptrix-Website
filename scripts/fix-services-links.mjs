import fs from "fs";

const path = "app/components/services-overview/services-markup.ts";
let html = JSON.parse(fs.readFileSync(path, "utf8").match(/export const servicesMarkup = (.*) as const;/s)[1]);
html = html.replace(
  'href="/contact#calendly-booking" class="b bo">Send a project inquiry</a>',
  'href="/contact#project-inquiry" class="b bo">Send a project inquiry</a>',
);
fs.writeFileSync(path, `export const servicesMarkup = ${JSON.stringify(html)} as const;\n`);
console.log({
  inquiry: html.includes("contact#project-inquiry"),
  bareHash: html.includes('href="#"'),
  backToTop: html.includes('href="#main" class="b sm bo">Back to top'),
});
