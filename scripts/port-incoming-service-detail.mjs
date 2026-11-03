import fs from "fs";
import path from "path";

const src = "D:/Serptrix/_incoming/SEO Services · Desktop-html/SEO.dc.html";
const html = fs.readFileSync(src, "utf8");
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error("no style");
let css = styleMatch[1];
css = css.replace(/(^|})\s*body\{/g, "$1.srx-svc-detail{");

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
        out += input.slice(i, j);
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

css = scopeCss(css, ".srx-svc-detail");
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
  .replaceAll("Schibsted Grotesk,sans-serif", "var(--font-schibsted),Schibsted Grotesk,sans-serif");

const outDir = "D:/Serptrix/app/components/service-detail";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "service-detail.css"), css);
console.log(JSON.stringify({ css: css.length, badAt: css.includes(".srx-svc-detail @") }));
