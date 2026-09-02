import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
  /** Fraction of the element that must be visible before triggering. Default: 0.1 */
  threshold?: number;
  /** Margin around the root. Default: "0px 0px -60px 0px" (triggers slightly before element enters view) */
  rootMargin?: string;
  /** Only trigger once. Default: true */
  triggerOnce?: boolean;
}

/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations.
 *
 * Usage:
 *   const { ref, isVisible } = useScrollReveal();
 *   <div ref={ref} className={isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}>
 */
export function useScrollReveal<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = "0px 0px -60px 0px",
  triggerOnce = true,
}: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(el);
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * ScrollReveal — wrapper component for scroll-triggered fade-in + slide-up.
 *
 * Usage:
 *   import { ScrollReveal } from "@/hooks/useScrollReveal";
 *   <ScrollReveal delay={100}>
 *     <Card>...</Card>
 *   </ScrollReveal>
 */
export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the transition starts (for staggered children). Default: 0 */
  delay?: number;
  /** Tailwind duration class. Default: "duration-700" */
  duration?: string;
  /** Y offset to slide from. Default: "translate-y-8" */
  from?: string;
  threshold?: number;
  rootMargin?: string;
}
