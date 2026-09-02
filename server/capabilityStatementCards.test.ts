import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "..");

describe("Capability-statement card coverage", () => {
  it("uses a shared accessible disclosure whose contents reflect the approved booklet", () => {
    const contents = readFileSync(resolve(projectRoot, "client/src/components/CapabilityStatementContents.tsx"), "utf8");

    expect(contents).toContain('type="single"');
    expect(contents).toContain("collapsible");
    expect(contents).toContain("What's inside the statement");
    expect(contents).toContain("health and safety and CHAS Elite information");
    expect(contents).toContain("selected project case studies");
  });

  it("provides an accessible thank-you message and a Site Visit link after starting a tracked download", () => {
    const download = readFileSync(resolve(projectRoot, "client/src/components/CapabilityStatementDownload.tsx"), "utf8");

    expect(download).toContain("trackCapabilityStatementDownload(placement)");
    expect(download).toContain("setHasInitiatedDownload(true)");
    expect(download).toContain('role="status"');
    expect(download).toContain('aria-live="polite"');
    expect(download).toContain("Thank you — your download should now begin.");
    expect(download).toContain('href="/site-survey"');
    expect(download).toContain("Request A Site Visit");
  });

  it("places the disclosure beside every current capability-statement card and maps the two new service pages", () => {
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const chasElite = readFileSync(resolve(projectRoot, "client/src/pages/ChasElitePage.tsx"), "utf8");
    const contact = readFileSync(resolve(projectRoot, "client/src/pages/Contact.tsx"), "utf8");
    const serviceDetail = readFileSync(resolve(projectRoot, "client/src/pages/ServiceDetail.tsx"), "utf8");

    expect(home).toContain('<CapabilityStatementContents tone="dark"');
    expect(chasElite).toContain('<CapabilityStatementContents tone="dark"');
    expect(contact).toContain('<CapabilityStatementContents className="mt-2"');
    expect(serviceDetail).toContain('<CapabilityStatementContents className="mt-2"');
    expect(serviceDetail).toContain('"steel-chimney-surface-preparation": "Steel Chimney service page"');
    expect(serviceDetail).toContain('"steel-containers": "Container Restoration service page"');
    expect(serviceDetail).toContain('"agricultural-shot-blasting": "Agricultural Steelwork service page"');
  });
});
