import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in ms before the transition starts (for staggered children). Default: 0 */
  delay?: number;
  /** CSS transition duration in ms. Default: 600 */
  duration?: number;
  /** Whether to also slide up from below. Default: true */
  slideUp?: boolean;
  threshold?: number;
  rootMargin?: string;
}

/**
 * ScrollReveal — wraps children in a fade-in + optional slide-up animation
 * triggered when the element scrolls into the viewport.
 *
 * Usage:
 *   <ScrollReveal delay={150}>
 *     <Card>...</Card>
 *   </ScrollReveal>
 *
 * For staggered grids, wrap each item with an increasing delay:
 *   {items.map((item, i) => (
 *     <ScrollReveal key={item.id} delay={i * 80}>
 *       <Card>...</Card>
 *     </ScrollReveal>
 *   ))}
 */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 600,
  slideUp = true,
  threshold = 0.08,
  rootMargin = "0px 0px -40px 0px",
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold, rootMargin });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0)"
          : slideUp
          ? "translateY(28px)"
          : "none",
        transition: `opacity ${duration}ms ease ${delay}ms, transform ${duration}ms ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
