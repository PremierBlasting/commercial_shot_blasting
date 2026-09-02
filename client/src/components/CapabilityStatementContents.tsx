import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type CapabilityStatementContentsProps = {
  className?: string;
  tone?: "light" | "dark";
};

/**
 * Brief, document-verified context displayed beside every capability-statement
 * download card. The content reflects only the approved booklet's visible sections.
 */
export function CapabilityStatementContents({ className, tone = "light" }: CapabilityStatementContentsProps) {
  const isDark = tone === "dark";

  return (
    <Accordion type="single" collapsible className={cn("w-full", className)}>
      <AccordionItem value="statement-contents" className={cn("border-b-0", isDark ? "border-white/20" : "border-[#2C5F7F]/15")}>
        <AccordionTrigger
          className={cn(
            "min-h-10 rounded-md py-2 text-xs font-semibold no-underline hover:no-underline",
            isDark ? "text-white hover:text-[#f7d98f]" : "text-[#2C5F7F] hover:text-[#1a3d52]"
          )}
        >
          What's inside the statement
        </AccordionTrigger>
        <AccordionContent className={cn("pb-1 text-xs leading-relaxed", isDark ? "text-white/75" : "text-gray-600")}>
          A company overview, health and safety and CHAS Elite information, core services, fleet and equipment, selected project case studies, and contact details.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
