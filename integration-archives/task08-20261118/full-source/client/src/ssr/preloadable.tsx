import { createElement, lazy, type ComponentType, type ComponentProps } from "react";
import { usePilotRenderContext } from "./PilotRenderContext";

/** Caches module code only; a loaded module never globally activates substitution. */
export function preloadable<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>,
  pilotId: string,
) {
  let resolved: T | undefined;
  let pending: Promise<{ default: T }> | undefined;
  const load = (): Promise<{ default: T }> => {
    if (resolved) return Promise.resolve({ default: resolved });
    if (!pending) {
      pending = Promise.resolve().then(loader).then(module => {
        if (!module.default) throw new Error("Pilot component export is missing");
        resolved = module.default;
        return module;
      }).catch(error => {
        pending = undefined;
        throw error;
      });
    }
    return pending;
  };
  const LazyComponent = lazy(load);
  function Preloadable(props: ComponentProps<T>) {
    const context = usePilotRenderContext();
    if (context.synchronousPilotId === pilotId) {
      if (!resolved) throw new Error("Selected pilot component was not prepared");
      return createElement(resolved, props);
    }
    return createElement(LazyComponent, props);
  }
  Preloadable.preload = (): Promise<void> => load().then(() => {});
  return Preloadable;
}
