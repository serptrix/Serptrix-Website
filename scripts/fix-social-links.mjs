import fs from "fs";

const links = {
  linkedin: "https://www.linkedin.com/in/serptrixofficial/",
  instagram: "https://www.instagram.com/serptrix",
  facebook: "https://www.facebook.com/serptrixofficial",
};

const files = [
  ["app/components/home/home-markup.ts", "homeMarkup"],
  ["app/components/about/about-markup.ts", "aboutMarkup"],
  ["app/components/services-overview/services-markup.ts", "servicesMarkup"],
];

for (const [file, name] of files) {
  const src = fs.readFileSync(file, "utf8");
  let html = JSON.parse(src.match(new RegExp(`export const ${name} = (.*) as const;`, "s"))[1]);

  html = html
    .replace(
      /<a href="[^"]*" aria-label="Serptrix on LinkedIn">/,
      `<a href="${links.linkedin}" aria-label="Serptrix on LinkedIn" target="_blank" rel="noopener noreferrer">`,
    )
    .replace(
      /<a href="[^"]*" aria-label="Serptrix on Instagram">/,
      `<a href="${links.instagram}" aria-label="Serptrix on Instagram" target="_blank" rel="noopener noreferrer">`,
    )
    .replace(
      /<a href="[^"]*" aria-label="Serptrix on Facebook">/,
      `<a href="${links.facebook}" aria-label="Serptrix on Facebook" target="_blank" rel="noopener noreferrer">`,
    )
    // No verified X URL yet — remove the placeholder icon
    .replace(/<a href="[^"]*" aria-label="Serptrix on X">[\s\S]*?<\/a>/, "");

  fs.writeFileSync(file, `export const ${name} = ${JSON.stringify(html)} as const;\n`);
  console.log(file, {
    linkedin: html.includes(links.linkedin),
    instagram: html.includes(links.instagram),
    facebook: html.includes(links.facebook),
    xGone: !html.includes("Serptrix on X"),
  });
}
