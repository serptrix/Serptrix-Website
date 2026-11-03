import fs from "fs";

const files = [
  ["app/components/home/home-markup.ts", "homeMarkup"],
  ["app/components/about/about-markup.ts", "aboutMarkup"],
  ["app/components/services-overview/services-markup.ts", "servicesMarkup"],
];

const email = "info@serptrix.com";
const phoneDisplay = "+1 540 242 1808";
const phoneTel = "+15402421808";

for (const [file, name] of files) {
  const src = fs.readFileSync(file, "utf8");
  let html = JSON.parse(src.match(new RegExp(`export const ${name} = (.*) as const;`, "s"))[1]);
  const before = {
    email: html.includes("[Email address]"),
    phone: html.includes("[Phone number]"),
  };
  html = html
    .replaceAll(
      '<span class="fs">Email</span>[Email address]',
      `<span class="fs">Email</span><a href="mailto:${email}">${email}</a>`,
    )
    .replaceAll(
      '<span class="fs">Phone</span>[Phone number]',
      `<span class="fs">Phone</span><a href="tel:${phoneTel}">${phoneDisplay}</a>`,
    )
    .replaceAll("[Email address]", email)
    .replaceAll("[Phone number]", phoneDisplay);
  fs.writeFileSync(file, `export const ${name} = ${JSON.stringify(html)} as const;\n`);
  console.log(file, {
    ...before,
    emailOk: html.includes(email),
    phoneOk: html.includes(phoneTel) || html.includes(phoneDisplay),
    leftover: html.includes("[Email address]") || html.includes("[Phone number]"),
  });
}
