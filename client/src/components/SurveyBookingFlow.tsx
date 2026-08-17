import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { formatUTMForSubmission } from "@/lib/utm";
import { saveSitemapPostcodeHandoff } from "@/lib/sitemapPostcodeHandoff";
import { usePostcodeNearbyCoverage } from "@/hooks/usePostcodeNearbyCoverage";
import { recentProjects } from "@/data/recentProjects";
import { BeforeAfterProjectSlider } from "@/components/BeforeAfterProjectSlider";
import { ProjectImageGallery } from "@/components/ProjectImageGallery";
import { validateLeadEmailClient } from "@shared/emailValidation";
import { isValidUKPostcode, normalisePostcode } from "@shared/postcodeUtils";

const SERVICE_OPTIONS = [
  "Structural Steelwork",
  "End-to-End Blasting & Coating",
  "Intumescent Painting",
  "Factory, Cladding & Roofing",
  "Machinery & Equipment",
  "Containers, Tanks & Vessels",
  "Paint & Coating Removal",
  "Floors & Surfaces",
  "Other / Not Sure",
];

const PROJECT_SIZE_OPTIONS = [
  "Small repair or single item",
  "Up to 100 m²",
  "100–500 m²",
  "500–2,000 m²",
  "Over 2,000 m²",
  "Not sure yet",
];

const MAX_FILES = 3;
const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;
type AttachmentContentType = "image/jpeg" | "image/png" | "image/webp" | "application/pdf";
const ACCEPTED_TYPES = new Set<AttachmentContentType>(["image/jpeg", "image/png", "image/webp", "application/pdf"]);

export interface SurveyBookingDefaults {
  serviceType?: string;
  locationName?: string;
}

interface SurveyBookingFlowProps {
  defaults?: SurveyBookingDefaults;
  onSuccess?: () => void;
}

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("We could not read that file. Please try again."));
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.readAsDataURL(file);
  });
}

export function SurveyBookingFlow({ defaults, onSuccess }: SurveyBookingFlowProps) {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState(defaults?.serviceType ?? "");
  const [projectSummary, setProjectSummary] = useState("");
  const [projectSize, setProjectSize] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [siteName, setSiteName] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] = useState("Phone");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showAllNearbyTowns, setShowAllNearbyTowns] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [projectServiceFilter, setProjectServiceFilter] = useState("All examples");
  const inputRef = useRef<HTMLInputElement>(null);
  const nearbyCoverage = usePostcodeNearbyCoverage(postalCode);
  const displayedNearbyTowns = showAllNearbyTowns ? nearbyCoverage.towns : nearbyCoverage.towns.slice(0, 3);
  const nearestCounty = nearbyCoverage.towns[0]?.countySlug;
  const nearbyProjects = nearestCounty
    ? recentProjects.filter((project) => project.countySlugs.includes(nearestCounty)).slice(0, 2)
    : [];
  const nearbyProjectServices = Array.from(new Set(nearbyProjects.map((project) => project.serviceLabel)));
  const activeProjectServiceFilter = projectServiceFilter === "All examples" || nearbyProjectServices.includes(projectServiceFilter)
    ? projectServiceFilter
    : "All examples";
  const filteredNearbyProjects = activeProjectServiceFilter === "All examples"
    ? nearbyProjects
    : nearbyProjects.filter((project) => project.serviceLabel === activeProjectServiceFilter);

  const uploadAttachments = trpc.contact.uploadAttachments.useMutation();
  const submitLead = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      onSuccess?.();
    },
    onError: (err) => setError(err.message || "Something went wrong. Please call us on 07721 375756."),
  });

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setError("");
    const selected = Array.from(incoming);
    const invalid = selected.find((file) => !ACCEPTED_TYPES.has(file.type as AttachmentContentType) || file.size > MAX_FILE_SIZE_BYTES);
    if (invalid) {
      setError("Please upload JPEG, PNG, WebP, or PDF files up to 8 MB each.");
      return;
    }
    setFiles((current) => [...current, ...selected].slice(0, MAX_FILES));
    if (inputRef.current) inputRef.current.value = "";
  };

  const nextStep = () => {
    setError("");
    if (step === 1 && !serviceType) {
      setError("Please select what needs blasting so we can prepare the right survey.");
      return;
    }
    if (step === 2 && !postalCode.trim()) {
      setError("Please enter the site postcode so we can confirm coverage and plan the visit.");
      return;
    }
    if (step === 2) saveSitemapPostcodeHandoff(postalCode);
    setStep((current) => Math.min(3, current + 1));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!firstName.trim() || !phone.trim()) {
      setError("Please enter your first name and phone number.");
      return;
    }
    if (email.trim()) {
      const emailCheck = validateLeadEmailClient(email);
      if (!emailCheck.valid) {
        setEmailError(emailCheck.reason ?? "Please enter a valid email address.");
        return;
      }
    }

    try {
      const uploaded = files.length
        ? await Promise.all(files.map(async (file) => ({
            fileName: file.name,
            // File selection is validated against ACCEPTED_TYPES before this point.
            contentType: file.type as AttachmentContentType,
            fileData: await readFileAsBase64(file),
          }))).then((attachments) => uploadAttachments.mutateAsync({ attachments }))
        : [];

      const messageParts = [
        `Survey type: ${serviceType}`,
        projectSize && `Approximate project size: ${projectSize}`,
        `Site postcode: ${postalCode.trim()}`,
        siteName.trim() && `Site / company name: ${siteName.trim()}`,
        defaults?.locationName && `Location page: ${defaults.locationName}`,
        visitDate && `Preferred survey date: ${visitDate}`,
        `Preferred contact method: ${preferredContactMethod}`,
        projectSummary.trim() && `Project details:\n${projectSummary.trim()}`,
        uploaded.length && `Attachments:\n${uploaded.map((attachment) => `• ${attachment.fileName}: ${attachment.url}`).join("\n")}`,
      ].filter(Boolean);

      const utmData = formatUTMForSubmission();
      await submitLead.mutateAsync({
        name: [firstName.trim(), lastName.trim()].filter(Boolean).join(" "),
        email: email.trim() || `${phone.replace(/\s/g, "")}@sms.placeholder`,
        phone: phone.trim(),
        message: messageParts.join("\n\n"),
        sourcePage: typeof window !== "undefined" ? window.location.href : undefined,
        locationName: defaults?.locationName,
        utmData: Object.keys(utmData).length ? utmData : undefined,
        marketingConsent,
      });
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "We could not send your request. Please call us on 07721 375756.");
    }
  };

  const isBusy = uploadAttachments.isPending || submitLead.isPending;

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-7 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-emerald-600" />
        <h3 className="font-display text-2xl font-bold text-[#1a3a52]">Your free site survey request is in.</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Thanks, {firstName}. We will get back to you promptly to confirm your survey. For urgent work, call <a className="font-semibold text-[#2C5F7F] underline" href="tel:07721375756">07721 375756</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-2" aria-label={`Step ${step} of 3`}>
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex flex-1 items-center gap-2">
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${item <= step ? "bg-[#2C5F7F] text-white" : "bg-slate-100 text-slate-500"}`}>{item}</span>
            <span className={`hidden text-xs font-semibold sm:inline ${item <= step ? "text-[#1a3a52]" : "text-slate-400"}`}>{item === 1 ? "Project" : item === 2 ? "Site" : "Contact"}</span>
            {item < 3 && <span className={`h-px flex-1 ${item < step ? "bg-[#2C5F7F]" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="survey-service" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">What needs blasting? <span className="text-amber-700">*</span></label>
            <select id="survey-service" value={serviceType} onChange={(event) => setServiceType(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20">
              <option value="">Choose a service</option>
              {SERVICE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="survey-summary" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">Tell us briefly about the job <span className="font-normal text-slate-400">(optional)</span></label>
            <textarea id="survey-summary" rows={3} value={projectSummary} onChange={(event) => setProjectSummary(event.target.value)} placeholder="For example: 12 steel beams with surface rust, requiring Sa 2.5 preparation before intumescent coating." className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label htmlFor="survey-postcode" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">Site postcode <span className="text-amber-700">*</span></label>
            <input id="survey-postcode" value={postalCode} onChange={(event) => { setPostalCode(event.target.value); setShowAllNearbyTowns(false); }} placeholder="For example: B1 1AA" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20" />
            {isValidUKPostcode(normalisePostcode(postalCode)) && (
              <a
                href={`/sitemap?postcode=${encodeURIComponent(normalisePostcode(postalCode))}`}
                onClick={() => saveSitemapPostcodeHandoff(postalCode)}
                className="mt-2 inline-flex text-xs font-semibold text-[#2C5F7F] underline underline-offset-2 transition hover:text-[#1a3a52] focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/25"
              >
                View coverage around this postcode on the map
              </a>
            )}
            {nearbyCoverage.status === "loading" && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500" aria-live="polite">
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> Finding nearby service areas…
              </p>
            )}
            {nearbyCoverage.status === "ready" && nearbyCoverage.towns.length > 0 && (
              <div className="mt-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2" aria-live="polite">
                <p className="text-xs font-semibold text-emerald-900">Service coverage near your site</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {displayedNearbyTowns.map((town) => (
                    <a
                      key={town.slug}
                      href={`/service-areas/${town.slug}`}
                      className="rounded-full bg-white px-2 py-1 text-xs font-medium text-[#2C5F7F] shadow-sm transition hover:bg-[#2C5F7F] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30"
                    >
                      {town.name} · {town.countyLabel} · {town.miles.toFixed(1)} mi
                    </a>
                  ))}
                </div>
                {nearbyCoverage.towns.length > 3 && (
                  <button
                    type="button"
                    onClick={() => setShowAllNearbyTowns((current) => !current)}
                    aria-expanded={showAllNearbyTowns}
                    className="mt-2 text-xs font-semibold text-[#2C5F7F] underline underline-offset-2 transition hover:text-[#1a3a52] focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30"
                  >
                    {showAllNearbyTowns ? "Show fewer nearby towns" : `See all nearby towns (${nearbyCoverage.towns.length})`}
                  </button>
                )}
              </div>
            )}
            {nearbyCoverage.status === "ready" && nearbyProjects.length > 0 && (
              <div className="mt-3 rounded-lg border border-sky-100 bg-sky-50 px-3 py-2">
                <p className="text-xs font-semibold text-[#1a3a52]">Relevant recent project examples</p>
                {nearbyProjectServices.length > 1 && (
                  <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Filter project examples by service">
                    {["All examples", ...nearbyProjectServices].map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setProjectServiceFilter(service)}
                        aria-pressed={activeProjectServiceFilter === service}
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30 ${activeProjectServiceFilter === service ? "bg-[#2C5F7F] text-white" : "bg-white text-[#2C5F7F] shadow-sm hover:bg-sky-100"}`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                )}
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {filteredNearbyProjects.map((project) => (
                    <article
                      key={project.id}
                      className="overflow-hidden rounded-md border border-sky-100 bg-white text-xs"
                    >
                      <img
                        src={project.afterImage}
                        alt={`Completed ${project.title} project`}
                        loading="lazy"
                        className="h-24 w-full object-cover"
                      />
                      <span className="block px-2.5 pt-2 font-semibold text-[#2C5F7F]">{project.title}</span>
                      <span className="block px-2.5 pt-0.5 leading-relaxed text-slate-600">Surface preparation outcome: {project.description}</span>
                      <span className="block px-2.5 pt-1 text-[11px] font-medium text-slate-500">{project.date} · {project.serviceLabel}</span>
                      <div className="flex items-center justify-between gap-2 px-2.5 pb-2 pt-1.5">
                        <button
                          type="button"
                          onClick={() => setExpandedProjectId((current) => current === project.id ? null : project.id)}
                          aria-expanded={expandedProjectId === project.id}
                          className="font-semibold text-[#2C5F7F] underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30"
                        >
                          {expandedProjectId === project.id ? "Show less" : "Read project details"}
                        </button>
                        <a href={`/services/${project.serviceSlug}`} className="font-semibold text-[#2C5F7F] underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30">View service</a>
                      </div>
                      {expandedProjectId === project.id && (
                        <div className="border-t border-sky-100 bg-slate-50 px-2.5 py-2.5">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">Documented preparation detail</p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-700">{project.description}</p>
                          {project.beforeImage && project.comparisonCaption && (
                            <BeforeAfterProjectSlider
                              beforeImage={project.beforeImage}
                              afterImage={project.afterImage}
                              title={project.title}
                              caption={project.comparisonCaption}
                            />
                          )}
                          {project.galleryImages && (
                            <ProjectImageGallery title={project.title} images={project.galleryImages} />
                          )}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
            {nearbyCoverage.status === "error" && (
              <p className="mt-2 text-xs text-slate-500">We cover sites across the UK. You can continue with your Site Visit request.</p>
            )}
          </div>
          <div>
            <label htmlFor="survey-site" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">Site or company name <span className="font-normal text-slate-400">(optional)</span></label>
            <input id="survey-site" value={siteName} onChange={(event) => setSiteName(event.target.value)} placeholder="For example: ABC Fabrications, Tyseley" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20" />
          </div>
          <div>
            <label htmlFor="survey-size" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">Approximate project size <span className="font-normal text-slate-400">(optional)</span></label>
            <select id="survey-size" value={projectSize} onChange={(event) => setProjectSize(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20">
              <option value="">Choose a size</option>
              {PROJECT_SIZE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="survey-first-name" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">First name <span className="text-amber-700">*</span></label>
              <input id="survey-first-name" required value={firstName} onChange={(event) => setFirstName(event.target.value)} autoComplete="given-name" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20" />
            </div>
            <div>
              <label htmlFor="survey-last-name" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">Last name</label>
              <input id="survey-last-name" value={lastName} onChange={(event) => setLastName(event.target.value)} autoComplete="family-name" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20" />
            </div>
          </div>
          <div>
            <label htmlFor="survey-phone" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">Phone number <span className="text-amber-700">*</span></label>
            <input id="survey-phone" required value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="For example: 07700 900000" className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20" />
          </div>
          <div>
            <label htmlFor="survey-email" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">Email address <span className="font-normal text-slate-400">(optional)</span></label>
            <input id="survey-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setEmailError(""); }} autoComplete="email" placeholder="For example: john@company.co.uk" className={`w-full rounded-lg border bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:ring-2 ${emailError ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : "border-slate-200 focus:border-[#2C5F7F] focus:ring-[#2C5F7F]/20"}`} />
            {emailError && <p role="alert" className="mt-1 text-xs text-red-600">{emailError}</p>}
          </div>
          <div>
            <span className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">How should we contact you?</span>
            <div className="grid grid-cols-3 gap-2">
              {["Phone", "Email", "WhatsApp"].map((method) => <button key={method} type="button" onClick={() => setPreferredContactMethod(method)} className={`rounded-lg border px-2 py-2 text-xs font-semibold transition ${preferredContactMethod === method ? "border-[#2C5F7F] bg-[#2C5F7F] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-[#2C5F7F]/50"}`}>{method}</button>)}
            </div>
          </div>
          <div>
            <label htmlFor="survey-visit-date" className="mb-1.5 block text-sm font-semibold text-[#1a3a52]">Preferred survey date <span className="font-normal text-slate-400">(optional)</span></label>
            <input id="survey-visit-date" type="date" min={new Date().toISOString().split("T")[0]} value={visitDate} onChange={(event) => setVisitDate(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2C5F7F] focus:ring-2 focus:ring-[#2C5F7F]/20" />
          </div>
          <div className="rounded-xl border border-dashed border-[#2C5F7F]/35 bg-[#f6fafc] p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#1a3a52]">Share photos of the current surface condition <span className="font-normal text-slate-500">(optional)</span></p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">Photos help us assess coatings, corrosion, access, and preparation requirements before a visit. JPEG, PNG, WebP or PDF. Up to {MAX_FILES} files, 8 MB each.</p>
              </div>
              <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-white px-2.5 py-2 text-xs font-semibold text-[#2C5F7F] shadow-sm ring-1 ring-[#2C5F7F]/15 transition hover:bg-[#e9f4f9]"><Upload className="h-3.5 w-3.5" /> Upload photos</button>
            </div>
            <input ref={inputRef} type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => addFiles(event.target.files)} className="sr-only" />
            {files.length > 0 && <ul className="mt-3 space-y-2">{files.map((file, index) => <li key={`${file.name}-${file.lastModified}`} className="flex items-center justify-between gap-2 rounded-md bg-white px-2.5 py-2 text-xs text-slate-600"><span className="flex min-w-0 items-center gap-1.5"><FileText className="h-3.5 w-3.5 shrink-0 text-[#2C5F7F]" /><span className="truncate">{file.name}</span></span><button type="button" onClick={() => setFiles((current) => current.filter((_, currentIndex) => currentIndex !== index))} aria-label={`Remove ${file.name}`} className="rounded p-0.5 text-slate-400 hover:bg-red-50 hover:text-red-600"><X className="h-4 w-4" /></button></li>)}</ul>}
          </div>
          <label className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">
            <input type="checkbox" checked={marketingConsent} onChange={(event) => setMarketingConsent(event.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#2C5F7F]" />
            <span>I agree to receive communications from <strong>Premier Blasting</strong>, of which Commercial Shot Blasting is the commercial surface-preparation arm. This may include relevant service updates by email and WhatsApp. See our <a className="font-semibold text-[#2C5F7F] underline" href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</span>
          </label>
        </div>
      )}

      {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="flex items-center justify-between gap-3 pt-1">
        {step > 1 ? <button type="button" onClick={() => setStep((current) => current - 1)} disabled={isBusy} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-3 text-sm font-semibold text-[#2C5F7F] transition hover:bg-[#e9f4f9]"><ArrowLeft className="h-4 w-4" /> Back</button> : <span />}
        {step < 3 ? <button type="button" onClick={nextStep} className="inline-flex items-center gap-2 rounded-lg bg-[#E8A020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#d4911a] active:scale-[0.98]">Continue <ArrowRight className="h-4 w-4" /></button> : <button type="submit" disabled={isBusy} className="inline-flex items-center gap-2 rounded-lg bg-[#E8A020] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#d4911a] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]">{isBusy ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Request A Site Visit <ArrowRight className="h-4 w-4" /></>}</button>}
      </div>
      <p className="text-center text-xs text-slate-500">Free, no-obligation survey. We will get back to you promptly.</p>
    </form>
  );
}
