import { useEffect, useRef, useState } from "react";
import { canLoadDecorativeVideo, type MediaConnection } from "@/lib/decorativeVideoPolicy";

type Connection = MediaConnection & {
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

/** The still poster remains in the initial server/client tree on every connection. */
export function useDecorativeVideo() {
  const heroMediaRef = useRef<HTMLElement>(null);
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const hero = heroMediaRef.current;
    let inView = true;
    let delayElapsed = false;
    let disposed = false;
    let timer: number | undefined;

    const update = () => {
      if (disposed) return;
      const eligible = inView && document.visibilityState === "visible" && !motion.matches && canLoadDecorativeVideo(connection);
      if (!eligible) {
        window.clearTimeout(timer);
        timer = undefined;
        setShouldLoadHeroVideo(false);
      } else if (delayElapsed) {
        setShouldLoadHeroVideo(true);
      } else if (timer === undefined) {
        timer = window.setTimeout(() => {
          timer = undefined;
          delayElapsed = true;
          update();
        }, 1200);
      }
    };
    const checkViewport = () => {
      if (hero) {
        const box = hero.getBoundingClientRect();
        inView = box.bottom > 0 && box.top < window.innerHeight;
      }
      update();
    };
    let observer: IntersectionObserver | undefined;
    checkViewport();
    if (hero && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(entries => {
        inView = entries[0]?.isIntersecting ?? false;
        update();
      });
      observer.observe(hero);
    } else {
      window.addEventListener("scroll", checkViewport, { passive: true });
      window.addEventListener("resize", checkViewport);
    }
    document.addEventListener("visibilitychange", update);
    motion.addEventListener?.("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      disposed = true;
      window.clearTimeout(timer);
      observer?.disconnect();
      window.removeEventListener("scroll", checkViewport);
      window.removeEventListener("resize", checkViewport);
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener?.("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);

  return { shouldLoadHeroVideo, heroMediaRef };
}
