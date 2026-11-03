import fs from "fs";

const path = "app/components/about/about-markup.ts";
let html = JSON.parse(fs.readFileSync(path, "utf8").match(/export const aboutMarkup = (.*) as const;/s)[1]);
html = html.replaceAll('href="#"', 'href="/"');
html = html.replace('<a href="/" class="b sm bo">Back to top</a>', '<a href="#main" class="b sm bo">Back to top</a>');
fs.writeFileSync(path, `export const aboutMarkup = ${JSON.stringify(html)} as const;\n`);
console.log({
  backToTop: html.includes('href="#main" class="b sm bo">Back to top'),
  bareHash: html.includes('href="#"'),
});
