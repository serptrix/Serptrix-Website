import fs from "fs";
import path from "path";

const src = "D:/Serptrix/_incoming/Contact · Desktop-html/Contact.dc.html";
const html = fs.readFileSync(src, "utf8");

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error("no style");
let css = styleMatch[1];
css = css.replace(/(^|})\s*body\{/g, "$1.srx-contact-root{");

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

css = scopeCss(css, ".srx-contact-root");

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
  )
  // Closed mobile menu must stay hidden (design CSS forced display:flex)
  .replace(
    ".srx-contact-root .mm div{position:absolute;right:0;top:52px;background:#fff;color:#09105F;border-radius:20px;padding:12px 20px;display:flex;flex-direction:column;gap:12px;min-width:200px;z-index:5;font-weight:600}",
    ".srx-contact-root .mm-panel,.srx-contact-root .mm>div{display:none;position:absolute;right:0;top:52px;background:#fff;color:#09105F;border-radius:20px;padding:12px 20px;flex-direction:column;gap:12px;min-width:200px;z-index:5;font-weight:600}.srx-contact-root .mm[open] .mm-panel,.srx-contact-root .mm[open]>div{display:flex}",
  );

const outDir = "D:/Serptrix/app/components/contact";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "contact.css"), css);
console.log(JSON.stringify({ css: css.length, sample: css.slice(0, 100) }));
