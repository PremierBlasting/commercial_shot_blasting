import { describe, expect, it } from "vitest";
import { getLocationSEO, getServiceSEO } from "../client/src/hooks/useSEO";
import { injectMetaTags } from "./metaTags";

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
</head><body><!--SSR_CONTENT--></body></html>`;

describe("Search Console query click-growth safeguards", () => {
  it("keeps generic local-page metadata aligned with commercial shot blasting and sandblasting intent", () => {
    const seo = getLocationSEO("Wirral", "wirral", "Merseyside");

    expect(seo.title).toContain("Shot Blasting & Sandblasting in Wirral");
    expect(seo.description).toContain("Commercial shot blasting and sandblasting");
    expect(seo.keywords).toContain("sandblasting Wirral");
    expect(seo.canonical).toBe("https://commercialshotblasting.co.uk/service-areas/wirral");
  });

  it("targets commercial rust-removal and metal shot-blasting terminology without promising a local ranking", () => {
    const seo = getServiceSEO("Rust Removal", "Approved surface-preparation description.");

    expect(seo.title).toContain("Commercial Rust Removal & Metal Shot Blasting");
    expect(seo.description).toContain("England and Wales");
    expect(seo.keywords).toContain("metal shot blasting");
    expect(seo.keywords).toContain("rust removal near me");
  });

  it("emits canonical search snippets for commercial, near-me, local, and mobile-blasting opportunities", async () => {
    const [homeHtml, areasHtml, chesterHtml, mobileHtml] = await Promise.all([
      injectMetaTags(baseHtml, "/"),
      injectMetaTags(baseHtml, "/service-areas"),
      injectMetaTags(baseHtml, "/service-areas/chester"),
      injectMetaTags(baseHtml, "/mobile-on-site-shot-blasting"),
    ]);

    expect(homeHtml).toContain("Commercial Shot Blasting &amp; Sandblasting | England &amp; Wales");
    expect(areasHtml).toContain("Shot Blasting Near You | Commercial Mobile Service Areas");
    expect(areasHtml).toContain("England and Wales");
    expect(chesterHtml).toContain("Sandblasting & Shot Blasting Chester | Commercial Surface Preparation");
    expect(mobileHtml).toContain("mobile and on-site shot blasting");
    expect(mobileHtml).toContain("/commercial-shot-blasting-sandblasting");
  });

  it("publishes the commercial sandblasting hub with canonical metadata, structured context, and non-prescriptive planning language", async () => {
    const html = await injectMetaTags(baseHtml, "/commercial-shot-blasting-sandblasting");

    expect(html).toContain('<link rel="canonical" href="https://commercialshotblasting.co.uk/commercial-shot-blasting-sandblasting" />');
    expect(html).toContain("Commercial Shot Blasting & Sandblasting for Metal Surface Preparation");
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain("must be confirmed from the asset, condition, site environment, access, containment needs");
  });

  it("keeps the visible near-me finder aligned with the approved England-and-Wales coverage statement", async () => {
    const { readFileSync } = await import("node:fs");
    const { resolve } = await import("node:path");
    const projectRoot = resolve(import.meta.dirname, "..");
    const areasPage = readFileSync(resolve(projectRoot, "client/src/pages/Areas.tsx"), "utf8");

    expect(areasPage).toContain("Commercial Shot Blasting Near You — England & Wales");
    expect(areasPage).toContain("Find commercial mobile shot blasting and sandblasting across England and Wales.");
    expect(areasPage).not.toContain("Our 12 mobile teams cover 650+ towns and cities across the UK");
  });
});
