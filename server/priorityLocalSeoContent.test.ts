import { describe, expect, it } from "vitest";
import { injectMetaTags } from "./metaTags";
import { priorityCountyCommercialContent, priorityTownCommercialContent } from "../shared/priorityLocalSeoContent";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const baseHtml = `<!doctype html><html><head>
  <title>Commercial Shot Blasting</title>
  <meta name="description" content="Default description" />
  <meta property="og:title" content="Default title" />
  <meta property="og:description" content="Default description" />
  <meta property="og:url" content="https://commercialshotblasting.co.uk/" />
  <meta property="og:image" content="https://commercialshotblasting.co.uk/default.jpg" />
  <meta name="twitter:title" content="Default title" />
  <meta name="twitter:description" content="Default description" />
  <meta name="twitter:url" content="https://commercialshotblasting.co.uk/" />
  <meta name="twitter:image" content="https://commercialshotblasting.co.uk/default.jpg" />
  <link rel="canonical" href="https://commercialshotblasting.co.uk/" />
</head><body><!--SSR_CONTENT--></body></html>`;

describe("priority local commercial context", () => {
  it("holds source-backed commercial context and relevant specialist links for Bristol and Peterborough", () => {
    expect(priorityTownCommercialContent.bristol.paragraphs.join(" ")).toContain("Avonmouth and Severnside Enterprise Area");
    expect(priorityTownCommercialContent.peterborough.paragraphs.join(" ")).toContain("Orton Southgate");
    expect(priorityTownCommercialContent.bristol.links.map((link) => link.href)).toContain("/mobile-on-site-shot-blasting");
    expect(priorityTownCommercialContent.peterborough.links.map((link) => link.href)).toContain("/intumescent-paint-for-steel");
  });

  it("holds source-backed commercial context and relevant specialist links for Derbyshire and Cornwall", () => {
    expect(priorityCountyCommercialContent.derbyshire.paragraphs.join(" ")).toContain("manufacturing as a key local sector");
    expect(priorityCountyCommercialContent.cornwall.paragraphs.join(" ")).toContain("Penzance Harbour");
    expect(priorityCountyCommercialContent.derbyshire.links.map((link) => link.href)).toContain("/intumescent-paint-for-steel");
    expect(priorityCountyCommercialContent.cornwall.links.map((link) => link.href)).toContain("/mobile-on-site-shot-blasting");
  });

  it("mirrors every priority context section and internal link in crawler-visible page content", async () => {
    const [bristol, peterborough, derbyshire, cornwall] = await Promise.all([
      injectMetaTags(baseHtml, "/service-areas/bristol"),
      injectMetaTags(baseHtml, "/service-areas/peterborough"),
      injectMetaTags(baseHtml, "/counties/derbyshire"),
      injectMetaTags(baseHtml, "/counties/cornwall"),
    ]);

    expect(bristol).toContain("Planning surface preparation around Bristol’s industrial and distribution estates");
    expect(bristol).toContain("/mobile-on-site-shot-blasting");
    expect(peterborough).toContain("Planning warehouse and industrial steelwork scopes in Peterborough");
    expect(peterborough).toContain("/intumescent-paint-for-steel");
    expect(derbyshire).toContain("Surface-preparation planning for Derbyshire’s manufacturing economy");
    expect(cornwall).toContain("Planning surface preparation across Cornwall’s commercial sites");
  });

  it("renders the verified priority context on Bristol and Peterborough’s dedicated visible page templates", () => {
    const projectRoot = resolve(import.meta.dirname, "..");
    const bristol = readFileSync(resolve(projectRoot, "client/src/pages/BristolServiceArea.tsx"), "utf8");
    const peterborough = readFileSync(resolve(projectRoot, "client/src/pages/PeterboroughServiceArea.tsx"), "utf8");

    expect(bristol).toContain('<PriorityLocalCommercialContext locationSlug="bristol" />');
    expect(peterborough).toContain('<PriorityLocalCommercialContext locationSlug="peterborough" />');
    expect(bristol).not.toContain("Same-day quotes for Bristol area projects");
    expect(peterborough).not.toContain("Same-day quotes for Peterborough area projects");
  });
});
