import fs from "fs";
import path from "path";

const src = "D:/Serptrix/_incoming/Services · Desktop-html/Services.dc.html";
const html = fs.readFileSync(src, "utf8");

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error("no style");
let css = styleMatch[1];
css = css.replace(/(^|})\s*body\{/g, "$1.srx-services-root{");

/** Prefix selectors with scope; leave @keyframes untouched; recurse into @media/@supports. */
function scopeCss(input, scope) {
  let out = "";
  let i = 0;
  const len = input.length;

  while (i < len) {
    while (i < len && /\s/.test(input[i])) {
      out += input[i];
      i++;
    }
    if (i >= len) break;

    if (input[i] === "@") {
      const atMatch = input.slice(i).match(/^@[a-zA-Z-]+/);
      const atName = atMatch?.[0]?.toLowerCase() ?? "";
      if (atName === "@keyframes" || atName === "@-webkit-keyframes" || atName === "@font-face") {
        const start = i;
        const brace = input.indexOf("{", i);
        let depth = 0;
        let j = brace;
        for (; j < len; j++) {
          if (input[j] === "{") depth++;
          else if (input[j] === "}") {
            depth--;
            if (depth === 0) {
              j++;
              break;
            }
          }
        }
        out += input.slice(start, j);
        i = j;
        continue;
      }

      if (atName === "@media" || atName === "@supports" || atName === "@container") {
        const brace = input.indexOf("{", i);
        out += input.slice(i, brace + 1);
        i = brace + 1;
        let depth = 1;
        let j = i;
        for (; j < len; j++) {
          if (input[j] === "{") depth++;
          else if (input[j] === "}") {
            depth--;
            if (depth === 0) break;
          }
        }
        out += scopeCss(input.slice(i, j), scope);
        out += "}";
        i = j + 1;
        continue;
      }
    }

    const brace = input.indexOf("{", i);
    if (brace === -1) {
      out += input.slice(i);
      break;
    }
    const selectors = input.slice(i, brace).trim();
    let depth = 0;
    let j = brace;
    for (; j < len; j++) {
      if (input[j] === "{") depth++;
      else if (input[j] === "}") {
        depth--;
        if (depth === 0) {
          j++;
          break;
        }
      }
    }
    const body = input.slice(brace, j);
    if (selectors) {
      const scoped = selectors
        .split(",")
        .map((s) => {
          s = s.trim();
          if (!s) return s;
          if (s.startsWith(scope)) return s;
          if (s === ":root") return scope;
          if (s.startsWith(":root")) return scope + s.slice(5);
          if (s.startsWith("@")) return s;
          return `${scope} ${s}`;
        })
        .join(",");
      out += scoped + body;
    }
    i = j;
  }
  return out;
}

css = scopeCss(css, ".srx-services-root");

css = css
  .replaceAll("Instrument Sans,Arial,sans-serif", "var(--font-instrument),Instrument Sans,Arial,sans-serif")
  .replaceAll(
    '"Schibsted Grotesk",Instrument Sans,Arial,sans-serif',
    "var(--font-schibsted),Schibsted Grotesk,var(--font-instrument),Arial,sans-serif",
  )
  .replaceAll(
    '"Schibsted Grotesk",Instrument Sans,sans-serif',
    "var(--font-schibsted),Schibsted Grotesk,var(--font-instrument),sans-serif",
  )
  .replaceAll("Schibsted Grotesk,sans-serif", "var(--font-schibsted),Schibsted Grotesk,sans-serif")
  .replaceAll(
    "font:600 16px Instrument Sans,Arial,sans-serif",
    "font:600 16px var(--font-instrument),Instrument Sans,Arial,sans-serif",
  )
  .replaceAll(
    "font:16px Instrument Sans,Arial,sans-serif",
    "font:16px var(--font-instrument),Instrument Sans,Arial,sans-serif",
  )
  .replaceAll(
    "font:600 15px Instrument Sans,sans-serif",
    "font:600 15px var(--font-instrument),Instrument Sans,sans-serif",
  )
  .replaceAll(
    "font:600 12px Instrument Sans,sans-serif",
    "font:600 12px var(--font-instrument),Instrument Sans,sans-serif",
  );

const xdcStart = html.indexOf("<x-dc>");
const xdcEnd = html.lastIndexOf("</x-dc>");
let inner = html.slice(xdcStart + 6, xdcEnd);
inner = inner.replace(/<helmet>[\s\S]*?<\/helmet>/, "");
inner = inner.replace(/\sref="\{\{ setRoot \}\}"/, "");

const linkMap = {
  "index.html": "/",
  "about.html": "/about",
  "services.html": "/services",
  "blog.html": "/blog",
  "contact.html": "/contact",
  "privacy-policy.html": "/privacy",
  "terms-of-service.html": "/terms",
  "cookie-policy.html": "/cookies",
  "services.html#design": "/services#design",
  "services.html#development": "/services#development",
  "services.html#ai": "/services#ai",
  "services.html#marketing": "/services#marketing",
  "services.html#shopify": "/services#shopify",
  "services-design.html": "/services/design",
  "services-development.html": "/services/development",
  "services-ai.html": "/services/ai",
  "services-seo.html": "/services/digital-marketing",
  "index.html#work": "/#work",
};
for (const [from, to] of Object.entries(linkMap)) {
  inner = inner.split(`href="${from}"`).join(`href="${to}"`);
}

// Strategy / contact CTAs (keep in-page #design etc.)
inner = inner.replaceAll('href="#contact"', 'href="/contact#calendly-booking"');
inner = inner.replaceAll('href="#insights"', 'href="/blog"');
inner = inner.replaceAll('href="#"', 'href="/"');
inner = inner.replace('<a href="/" class="b sm bo">Back to top</a>', '<a href="#main" class="b sm bo">Back to top</a>');
// Book Strategy Call buttons that still point at root after bare-hash rewrite
inner = inner.replaceAll(
  'href="/" class="b by"',
  'href="/contact#calendly-booking" class="b by"',
);
inner = inner.replaceAll(
  'href="/" class="b by sm',
  'href="/contact#calendly-booking" class="b by sm',
);

const scriptMatch = html.match(/<script type="text\/x-dc"[\s\S]*?>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error("no script");
const motionFn = scriptMatch[1].match(/function motion\(R\)\{[\s\S]*?\n\}/);

const outDir = "D:/Serptrix/app/components/services-overview";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "services.css"), css);
fs.writeFileSync(
  path.join(outDir, "services-markup.ts"),
  `export const servicesMarkup = ${JSON.stringify(inner.trim())} as const;\n`,
);

if (motionFn) {
  fs.writeFileSync(
    path.join(outDir, "services-motion.ts"),
    `// Ported verbatim from the incoming Services design export.\n// @ts-nocheck\nexport function motion(R: HTMLElement | null) ${motionFn[0].slice("function motion(R)".length)}\n`,
  );
} else {
  fs.writeFileSync(
    path.join(outDir, "services-motion.ts"),
    `// @ts-nocheck\nexport function motion(_R: HTMLElement | null) {}\n`,
  );
}

const bad = css.includes(".srx-services-root @");
console.log(
  JSON.stringify({
    css: css.length,
    html: inner.trim().length,
    badAtRulePrefix: bad,
    hasMotion: Boolean(motionFn),
    sample: css.slice(0, 120),
  }),
);
