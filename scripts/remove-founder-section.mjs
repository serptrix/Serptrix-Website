import fs from "fs";

const path = "app/components/home/home-markup.ts";
const src = fs.readFileSync(path, "utf8");
const match = src.match(/export const homeMarkup = (.*) as const;/s);
if (!match) throw new Error("no markup export");

let html = JSON.parse(match[1]);
const before = html.length;

const re = /<section class="sec pt" id="about">[\s\S]*?<\/section>/;
if (!re.test(html)) {
  const i = html.indexOf("Meet Serptrix");
  console.error(html.slice(Math.max(0, i - 160), i + 500));
  throw new Error("founder section not found");
}

html = html.replace(re, "");
html = html.replaceAll('href="#about"', 'href="#about-why"');

fs.writeFileSync(path, `export const homeMarkup = ${JSON.stringify(html)} as const;\n`);
console.log(
  JSON.stringify({
    before,
    after: html.length,
    stillHasMeet: html.includes("Meet Serptrix"),
    stillHasFounder: html.toLowerCase().includes("founder"),
  }),
);
