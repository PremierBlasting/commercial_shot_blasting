import { useState } from "react";
import { Check, Share2 } from "lucide-react";

interface ProjectShareButtonProps {
  projectId: string;
  projectTitle: string;
}

export function ProjectShareButton({ projectId, projectTitle }: ProjectShareButtonProps) {
  const [feedback, setFeedback] = useState("");

  const shareProject = async () => {
    const url = `${window.location.origin}${window.location.pathname}#project-${projectId}`;
    const shareData = { title: `${projectTitle} | Commercial Shot Blasting`, text: `View this documented Commercial Shot Blasting project: ${projectTitle}`, url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setFeedback("Shared");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setFeedback("Link copied");
      } else {
        setFeedback("Copy this page URL from your browser");
      }
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") setFeedback("Could not share this project");
    }
    window.setTimeout(() => setFeedback(""), 2400);
  };

  return (
    <span className="relative inline-flex">
      <button type="button" onClick={shareProject} className="inline-flex items-center gap-1 text-xs font-semibold text-[#2C5F7F] underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#2C5F7F]/30">
        {feedback === "Shared" || feedback === "Link copied" ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />} Share this project
      </button>
      {feedback && <span role="status" className="absolute left-0 top-full z-10 mt-1 w-max rounded bg-slate-800 px-2 py-1 text-[11px] text-white">{feedback}</span>}
    </span>
  );
}
