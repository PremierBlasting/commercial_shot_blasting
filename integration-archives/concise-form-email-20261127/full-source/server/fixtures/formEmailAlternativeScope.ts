import { createHash } from "node:crypto";

const originalHash = "21b8bd4e83f53e91fd88d0378baeeaf7e8a7d4683e9e86520883c7b9574ce960";
const hash = (source: string) => createHash("sha256").update(source).digest("hex");

// Reverse only the owner's 27 November form change for older historical guards.
// The historical expected hashes are not replaced or regenerated.
const deltas: Array<[string, string]> = [
  ['import { AlertCircle, ArrowRight, CheckCircle, FileText, Loader2, Mail, Upload, X } from "lucide-react";', 'import { AlertCircle, ArrowRight, CheckCircle, FileText, Loader2, Upload, X } from "lucide-react";'],
  ['import { ENQUIRY_ATTACHMENT_ACCEPT, selectEnquiryAttachments, formatAttachmentSize } from "@shared/enquiryAttachments";', 'import { ENQUIRY_ATTACHMENT_ACCEPT, MAX_ENQUIRY_FILES, selectEnquiryAttachments, formatAttachmentSize } from "@shared/enquiryAttachments";'],
  [
    '            <p className={`text-sm font-semibold ${headingColor}`}>Add photos, videos or drawings <span className={`font-normal ${subColor}`}>(optional)</span></p>\n',
    '            <p className={`text-sm font-semibold ${headingColor}`}>Add photos, videos or drawings <span className={`font-normal ${subColor}`}>(optional)</span></p>\n' +
    '            <p className={`mt-0.5 text-xs leading-relaxed ${subColor}`}>Up to {MAX_ENQUIRY_FILES} files: photos/PDFs 100 MB each, videos 250 MB each, 500 MB total.</p>\n' +
    '            <p className={`mt-0.5 text-xs leading-relaxed ${subColor}`}>JPG, PNG, HEIC/iPhone photos, WebP, GIF, TIFF, camera RAW, MP4, MOV and more. Originals are kept.</p>\n',
  ],
  [
    '      <a href="mailto:info@commercialshotblasting.co.uk" className={`flex w-full flex-wrap items-center justify-center gap-1.5 rounded text-xs font-medium underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#7ec8e3] ${isDark ? "text-[#7ec8e3] hover:text-white" : "text-[#2C5F7F] hover:text-[#1a3a52]"}`}>\n' +
    '        <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />\n' +
    '        <span>Email us</span><span className="break-all">info@commercialshotblasting.co.uk</span>\n' +
    '      </a>\n',
    '',
  ],
];

export function restoreBeforeFormEmailAlternative(source: string): string {
  if (hash(source) === originalHash) return source;
  let restored = source;
  for (const [approved, original] of deltas) {
    if (restored.split(approved).length !== 2) throw new Error("Form change is not the exact approved email alternative");
    restored = restored.replace(approved, original);
  }
  if (hash(restored) !== originalHash) throw new Error("Unrelated form source change detected");
  return restored;
}
