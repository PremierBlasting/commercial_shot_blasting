import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = (relativePath: string) => readFileSync(resolve(root, relativePath), "utf8");

describe("universal Get In Touch enquiry flow", () => {
  const leadForm = read("client/src/components/LeadForm.tsx");
  const surveyFlow = read("client/src/components/SurveyBookingFlow.tsx");
  const compactCapture = read("client/src/components/CompactSurveyCapture.tsx");
  const locationPage = read("client/src/components/LocationPage.tsx");
  const quotePopup = read("client/src/components/QuotePopup.tsx");
  const capabilityDownload = read("client/src/components/CapabilityStatementDownload.tsx");
  const intumescentForm = read("client/src/components/IntumescentQuoteForm.tsx");
  const lincoln = read("client/src/pages/LincolnServiceArea.tsx");

  it("keeps only the essential contact fields plus a required message", () => {
    expect(leadForm).toContain(">Get In Touch<");
    expect(leadForm).toContain("Your name");
    expect(leadForm).toContain("Email address");
    expect(leadForm).toContain("Phone number");
    expect(leadForm).toContain("Your message");
    expect(leadForm).toContain("Tell us what you need help with... Such as: request a site visit.");
    expect(leadForm).not.toContain("Select a service");
    expect(leadForm).not.toContain("Preferred Site Visit Date");
    expect(leadForm).not.toContain("What needs blasting?");
  });

  it("supports optional multiple photos/videos/drawings through the shared expanded policy", () => {
    expect(leadForm).toContain("multiple");
    expect(leadForm).toContain("selectEnquiryAttachments");
    expect(leadForm).toContain("accept={ENQUIRY_ATTACHMENT_ACCEPT}");
    const attachments = read("shared/enquiryAttachments.ts");
    expect(attachments).toContain("MAX_ENQUIRY_FILES = 20");
    expect(attachments).toContain("MAX_PHOTO_BYTES = 100 * MIB");
    expect(attachments).toContain("MAX_VIDEO_BYTES = 250 * MIB");
    expect(attachments).toContain("MAX_ENQUIRY_TOTAL_BYTES = 500 * MIB");
    expect(attachments).toContain("heic");
  });

  it("preserves existing CSB attribution and delivery fields", () => {
    expect(leadForm).toContain("formatUTMForSubmission");
    expect(leadForm).toContain("trpc.contact.submit.useMutation");
    expect(leadForm).toContain("trpc.contact.beginMediaUpload.useMutation");
    expect(leadForm).toContain("marketingConsent");
  });

  it("routes every previously specialised public form through the universal component", () => {
    for (const component of [surveyFlow, compactCapture, quotePopup, capabilityDownload, intumescentForm]) {
      expect(component).toContain("Get In Touch");
    }
    expect(surveyFlow).toContain("<LeadForm");
    expect(locationPage).toContain("<InlineEnquiryPanel");
    expect(locationPage).toContain('from "@/components/InlineEnquiry"');
    expect(capabilityDownload).toContain("<LeadForm");
    expect(intumescentForm).toContain("<LeadForm");
    expect(locationPage).not.toContain("handleInlineFormSubmit");
    expect(lincoln).not.toContain("const ContactForm");
  });
});
