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
    expect(download).toContain("trpc.contact.submit.useMutation");
    expect(download).toContain("trpc.contact.uploadAttachments.useMutation");
    expect(download).toContain("Request: Site Visit after Commercial Capability Statement download");
    expect(download).toContain("Download Source: ${placement}");
    expect(download).toContain('name="downloadSource"');
    expect(download).toContain("Project Photo: ${photo.url}");
    expect(download).toContain("Project Summary:\\n${projectSummary.trim()}");
    expect(download).toContain("Request A Site Visit");
    expect(download).toContain("marketingConsent");
    expect(download).toContain('href="/privacy-policy"');
  });

  it("validates optional project photos and gives accessible loading and restrained success feedback", () => {
    const download = readFileSync(resolve(projectRoot, "client/src/components/CapabilityStatementDownload.tsx"), "utf8");

    expect(download).toContain("MAX_PROJECT_PHOTO_BYTES = 8 * 1024 * 1024");
    expect(download).toContain('accept="image/jpeg,image/png,image/webp"');
    expect(download).toContain("Choose a JPG, PNG, or WebP project photo.");
    expect(download).toContain("Project photos must be no larger than 8 MB.");
    expect(download).toContain("LoaderCircle");
    expect(download).toContain('aria-busy={isSubmitting}');
    expect(download).toContain("Sending Site Visit request…");
    expect(download).toContain("motion-safe:animate-[ping_0.45s_ease-out_1]");
    expect(download).toContain("motion-reduce:animate-none");
  });

  it("captures an optional project summary and allows a selected photo to be cleared before submission", () => {
    const download = readFileSync(resolve(projectRoot, "client/src/components/CapabilityStatementDownload.tsx"), "utf8");

    expect(download).toContain("Brief project summary (optional)");
    expect(download).toContain("maxLength={2000}");
    expect(download).toContain("Tell us what needs preparing");
    expect(download).toContain("const removeProjectPhoto");
    expect(download).toContain("projectPhotoInputRef.current.value = \"\"");
    expect(download).toContain("Remove selected photo");
    expect(download).toContain("Remove selected project photo:");
  });

  it("uses a subtle reduced-motion-safe hover treatment and includes the approved About Us placement", () => {
    const download = readFileSync(resolve(projectRoot, "client/src/components/CapabilityStatementDownload.tsx"), "utf8");
    const about = readFileSync(resolve(projectRoot, "client/src/pages/About.tsx"), "utf8");

    expect(download).toContain("hover:-translate-y-0.5");
    expect(download).toContain("hover:shadow-lg");
    expect(download).toContain("motion-reduce:transform-none");
    expect(about).toContain("CapabilityStatementDownload");
    expect(about).toContain("About Us page supplier information card");
    expect(about).toContain("Download capability statement");
  });

  it("selects the compressed statement on mobile while retaining the full-quality statement for wider screens", () => {
    const download = readFileSync(resolve(projectRoot, "client/src/components/CapabilityStatementDownload.tsx"), "utf8");

    expect(download).toContain("MOBILE_CAPABILITY_STATEMENT_URL");
    expect(download).toContain("commercial-capability-statement-amended-mobile-linked-2026-09-14_e64d3758.pdf");
    expect(download).toContain('window.matchMedia("(max-width: 767px)")');
    expect(download).toContain("mobileQuery.matches ? MOBILE_CAPABILITY_STATEMENT_URL : CAPABILITY_STATEMENT_URL");
    expect(download).toContain("href={downloadUrl}");
    expect(download).toContain("CAPABILITY_STATEMENT_LAST_UPDATED");
    expect(download).toContain("Last updated:");
    expect(download).toContain("Preview booklet");
    expect(download).toContain("Commercial Capability Statement PDF preview");
    expect(download).toContain("case studies include links to their live project pages");
    expect(download).toContain('aria-label="Booklet contents"');
    expect(download).toContain("CAPABILITY_STATEMENT_CONTENTS");
    expect(download).toContain("Case Study 1: Doncaster");
    expect(download).toContain("Case Study 2: Wigan");
    expect(download).toContain('src={`${downloadUrl}#page=${previewPage}&view=FitH`}');
    expect(download).toContain("Share this booklet");
    expect(download).toContain("trackCapabilityStatementPreview(placement)");
    expect(download).toContain("trackCapabilityStatementShare(placement");
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
