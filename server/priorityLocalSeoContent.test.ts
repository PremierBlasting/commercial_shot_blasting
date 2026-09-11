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

  it("holds source-backed commercial context and relevant specialist links for Birmingham, Liverpool, Northampton, and Leicester", () => {
    expect(priorityTownCommercialContent.birmingham.paragraphs.join(" ")).toContain("advanced engineering and future mobility");
    expect(priorityTownCommercialContent.liverpool.paragraphs.join(" ")).toContain("advanced manufacturing, logistics, clean energy, and innovation");
    expect(priorityTownCommercialContent.northampton.paragraphs.join(" ")).toContain("advanced logistics as a regional sector");
    expect(priorityTownCommercialContent.leicester.paragraphs.join(" ")).toContain("business investment areas, commercial space");
    expect(priorityTownCommercialContent.birmingham.links.map((link) => link.href)).toContain("/commercial-shot-blasting-sandblasting");
    expect(priorityTownCommercialContent.liverpool.links.map((link) => link.href)).toContain("/container-restoration-storage-steelwork");
    expect(priorityTownCommercialContent.northampton.links.map((link) => link.href)).toContain("/mobile-on-site-shot-blasting");
    expect(priorityTownCommercialContent.leicester.links.map((link) => link.href)).toContain("/factory-cladding-restoration");
  });

  it("holds source-backed ranking-page context and specialist links for Chesterfield, Sheffield, Bradford, and Derby", () => {
    expect(priorityTownCommercialContent.chesterfield.paragraphs.join(" ")).toContain("Markham Vale");
    expect(priorityTownCommercialContent.sheffield.paragraphs.join(" ")).toContain("Advanced Manufacturing Innovation District");
    expect(priorityTownCommercialContent.bradford.paragraphs.join(" ")).toContain("Invest in Bradford");
    expect(priorityTownCommercialContent.derby.paragraphs.join(" ")).toContain("Infinity Park Derby");
    expect(priorityTownCommercialContent.chesterfield.links.map((link) => link.href)).toContain("/mobile-on-site-shot-blasting");
    expect(priorityTownCommercialContent.sheffield.links.map((link) => link.href)).toContain("/intumescent-paint-for-steel");
    expect(priorityTownCommercialContent.bradford.links.map((link) => link.href)).toContain("/factory-cladding-restoration");
    expect(priorityTownCommercialContent.derby.links.map((link) => link.href)).toContain("/services/structural-steel-frames");
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

  it("mirrors the next four source-backed local refreshes in crawler-visible content", async () => {
    const [chesterfield, sheffield, bradford, derby] = await Promise.all([
      injectMetaTags(baseHtml, "/service-areas/chesterfield"),
      injectMetaTags(baseHtml, "/service-areas/sheffield"),
      injectMetaTags(baseHtml, "/service-areas/bradford"),
      injectMetaTags(baseHtml, "/service-areas/derby"),
    ]);

    expect(chesterfield).toContain("Planning surface preparation around Chesterfield’s industrial and logistics sites");
    expect(sheffield).toContain("Planning commercial steelwork preparation around Sheffield’s manufacturing cluster");
    expect(bradford).toContain("Planning industrial surface preparation across Bradford’s commercial premises");
    expect(derby).toContain("Planning surface preparation around Derby’s advanced-manufacturing setting");
    expect(chesterfield).toContain("/mobile-on-site-shot-blasting");
    expect(sheffield).toContain("/intumescent-paint-for-steel");
  });

  it("mirrors the current four source-backed local refreshes in crawler-visible content", async () => {
    const [birmingham, liverpool, northampton, leicester] = await Promise.all([
      injectMetaTags(baseHtml, "/service-areas/birmingham"),
      injectMetaTags(baseHtml, "/service-areas/liverpool"),
      injectMetaTags(baseHtml, "/service-areas/northampton"),
      injectMetaTags(baseHtml, "/service-areas/leicester"),
    ]);

    expect(birmingham).toContain("Planning commercial sandblasting around Birmingham’s advanced-engineering economy");
    expect(liverpool).toContain("Planning commercial sand blasting around Liverpool City Region’s logistics and manufacturing setting");
    expect(northampton).toContain("Planning commercial sandblasting around Northampton’s logistics setting");
    expect(leicester).toContain("Planning commercial sandblasting across Leicester’s business and commercial-space setting");
    expect(birmingham).toContain("Sandblasting Birmingham | Commercial Shot Blasting & Surface Preparation");
    expect(liverpool).toContain("Sand Blasting Liverpool | Commercial Shot Blasting");
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

  it("renders the verified priority context on the dedicated Chesterfield, Sheffield, and Derby pages", () => {
    const projectRoot = resolve(import.meta.dirname, "..");
    const chesterfield = readFileSync(resolve(projectRoot, "client/src/pages/ChesterfieldServiceArea.tsx"), "utf8");
    const sheffield = readFileSync(resolve(projectRoot, "client/src/pages/SheffieldServiceArea.tsx"), "utf8");
    const derby = readFileSync(resolve(projectRoot, "client/src/pages/DerbyServiceArea.tsx"), "utf8");

    expect(chesterfield).toContain('<PriorityLocalCommercialContext locationSlug="chesterfield" />');
    expect(sheffield).toContain('<PriorityLocalCommercialContext locationSlug="sheffield" />');
    expect(derby).toContain('<PriorityLocalCommercialContext locationSlug="derby" />');
  });

  it("uses the shared evidence-led location route for the current town refresh batch", () => {
    const projectRoot = resolve(import.meta.dirname, "..");
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const prefetch = readFileSync(resolve(projectRoot, "client/src/hooks/usePrefetch.ts"), "utf8");

    expect(app).not.toContain("const BirminghamServiceArea");
    expect(app).not.toContain("const LiverpoolServiceArea");
    expect(app).not.toContain("const NorthamptonServiceArea");
    expect(app).not.toContain("const LeicesterServiceArea");
    expect(app).toContain('path="/service-areas/:slug"');
    expect(prefetch).not.toContain("BirminghamServiceArea");
    expect(prefetch).not.toContain("LiverpoolServiceArea");
    expect(prefetch).not.toContain("NorthamptonServiceArea");
    expect(prefetch).not.toContain("LeicesterServiceArea");
  });
});
