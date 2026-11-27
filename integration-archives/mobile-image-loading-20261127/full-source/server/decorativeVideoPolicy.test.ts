import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { canLoadDecorativeVideo, type MediaConnection } from "../client/src/lib/decorativeVideoPolicy";
import { useDecorativeVideo } from "../client/src/hooks/useDecorativeVideo";

// Only this hook's three primitives are simulated: commit the ref before running
// the captured effect, retain state across renders, and explicitly run cleanup.
// These are Node unit tests, not DOM, React lifecycle, or video playback tests.
const hooks = vi.hoisted(() => ({
  ref: { current: null as HTMLElement | null },
  state: false,
  initialized: false,
  effect: undefined as (() => void | (() => void)) | undefined,
  setState: vi.fn(),
}));

vi.mock("react", () => ({
  useRef: () => hooks.ref,
  useState: (initial: boolean) => {
    if (!hooks.initialized) {
      hooks.state = initial;
      hooks.initialized = true;
    }
    return [hooks.state, hooks.setState];
  },
  useEffect: (effect: () => void | (() => void), dependencies: unknown[]) => {
    expect(dependencies).toEqual([]);
    hooks.effect ??= effect;
  },
}));

class ListenerTarget {
  listeners = new Map<string, Set<() => void>>();
  addEventListener = vi.fn((type: string, listener: () => void, _options?: unknown) => {
    const listeners = this.listeners.get(type) ?? new Set<() => void>();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  });
  removeEventListener = vi.fn((type: string, listener: () => void) => {
    this.listeners.get(type)?.delete(listener);
  });
  emit(type: string) {
    for (const listener of [...(this.listeners.get(type) ?? [])]) listener();
  }
  get listenerCount() {
    return [...this.listeners.values()].reduce((count, listeners) => count + listeners.size, 0);
  }
}

class ObserverStub {
  static instances: ObserverStub[] = [];
  observe = vi.fn();
  disconnect = vi.fn();
  constructor(readonly callback: (entries: { isIntersecting: boolean }[]) => void) {
    ObserverStub.instances.push(this);
  }
  emit(isIntersecting: boolean) {
    this.callback([{ isIntersecting }]);
  }
}

const blockedConnections: { label: string; connection: MediaConnection }[] = [
  { label: "saveData", connection: { saveData: true } },
  { label: "saveData on an otherwise fast connection", connection: { saveData: true, effectiveType: "4g", downlink: 10 } },
  { label: "slow-2g", connection: { effectiveType: "slow-2g" } },
  { label: "2g", connection: { effectiveType: "2g" } },
  { label: "3g even with a fast reported downlink", connection: { effectiveType: "3g", downlink: 10 } },
  { label: "positive downlink below the threshold", connection: { downlink: 0.1 } },
  { label: "1 Mbps downlink", connection: { downlink: 1 } },
  { label: "the inclusive 1.6 Mbps boundary", connection: { effectiveType: "4g", downlink: 1.6 } },
];
const allowedConnections: { label: string; connection: MediaConnection | undefined }[] = [
  { label: "no Network Information API", connection: undefined },
  { label: "unknown connection fields", connection: {} },
  { label: "normal 4g connection", connection: { saveData: false, effectiveType: "4g", downlink: 10 } },
  { label: "unknown effective type", connection: { effectiveType: "unknown" } },
  { label: "downlink just above 1.6 Mbps", connection: { downlink: 1.6001 } },
  { label: "zero (unknown) downlink", connection: { downlink: 0 } },
  { label: "negative (unusable) downlink", connection: { downlink: -1 } },
  { label: "NaN (unusable) downlink", connection: { downlink: Number.NaN } },
];

describe("canLoadDecorativeVideo", () => {
  it.each(blockedConnections)("rejects $label", ({ connection }) => {
    expect(canLoadDecorativeVideo(connection)).toBe(false);
  });
  it.each(allowedConnections)("allows $label", ({ connection }) => {
    expect(canLoadDecorativeVideo(connection)).toBe(true);
  });
});

type ConnectionStub = ListenerTarget & MediaConnection;
let connection: ConnectionStub;
let motion: ListenerTarget & { matches: boolean };
let doc: ListenerTarget & { visibilityState: string };
let browser: ListenerTarget & {
  innerHeight: number;
  matchMedia: ReturnType<typeof vi.fn>;
  setTimeout: ReturnType<typeof vi.fn>;
  clearTimeout: ReturnType<typeof vi.fn>;
};
let bounds: { top: number; bottom: number };
let hero: HTMLElement;
let cleanup: (() => void) | undefined;
let network: ReturnType<typeof vi.fn>;

function mount(attachHero = true) {
  const initial = useDecorativeVideo();
  expect(initial.shouldLoadHeroVideo).toBe(false);
  expect(initial.heroMediaRef.current).toBeNull();
  // React attaches a DOM ref during commit, before this passive effect.
  initial.heroMediaRef.current = attachHero ? hero : null;
  expect(hooks.effect).toBeTypeOf("function");
  const dispose = hooks.effect!();
  expect(dispose).toBeTypeOf("function");
  cleanup = dispose as () => void;
  return initial;
}

function shouldLoad() {
  // Read the hook's updated state on a simulated rerender; [] keeps the effect.
  return useDecorativeVideo().shouldLoadHeroVideo;
}

function dispose() {
  cleanup?.();
  cleanup = undefined;
}

const gates = ["visibility", "motion", "connection", "viewport"] as const;
type Gate = (typeof gates)[number];
function block(gate: Gate) {
  switch (gate) {
    case "visibility": doc.visibilityState = "hidden"; doc.emit("visibilitychange"); break;
    case "motion": motion.matches = true; motion.emit("change"); break;
    case "connection": connection.saveData = true; connection.emit("change"); break;
    case "viewport": ObserverStub.instances[0].emit(false); break;
  }
}
function unblock(gate: Gate) {
  switch (gate) {
    case "visibility": doc.visibilityState = "visible"; doc.emit("visibilitychange"); break;
    case "motion": motion.matches = false; motion.emit("change"); break;
    case "connection": connection.saveData = false; connection.emit("change"); break;
    case "viewport": ObserverStub.instances[0].emit(true); break;
  }
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
  hooks.ref.current = null;
  hooks.state = false;
  hooks.initialized = false;
  hooks.effect = undefined;
  hooks.setState.mockImplementation((next: boolean | ((previous: boolean) => boolean)) => {
    hooks.state = typeof next === "function" ? next(hooks.state) : next;
  });
  cleanup = undefined;
  ObserverStub.instances = [];
  connection = Object.assign(new ListenerTarget(), { saveData: false, effectiveType: "4g", downlink: 10 });
  motion = Object.assign(new ListenerTarget(), { matches: false });
  doc = Object.assign(new ListenerTarget(), { visibilityState: "visible" });
  browser = Object.assign(new ListenerTarget(), {
    innerHeight: 800,
    matchMedia: vi.fn(() => motion),
    setTimeout: vi.fn((callback: () => void, delay: number) => globalThis.setTimeout(callback, delay)),
    clearTimeout: vi.fn((timer: ReturnType<typeof setTimeout> | undefined) => globalThis.clearTimeout(timer)),
  });
  bounds = { top: 0, bottom: 400 };
  hero = { getBoundingClientRect: vi.fn(() => bounds) } as unknown as HTMLElement;
  network = vi.fn(() => { throw new Error("Live network is forbidden in these unit tests"); });
  vi.stubGlobal("fetch", network);
  vi.stubGlobal("window", browser);
  vi.stubGlobal("document", doc);
  vi.stubGlobal("navigator", { connection });
  vi.stubGlobal("IntersectionObserver", ObserverStub);
});

afterEach(() => {
  try {
    dispose();
    expect(vi.getTimerCount()).toBe(0);
    expect(network).not.toHaveBeenCalled();
  } finally {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  }
});

describe("useDecorativeVideo eligibility and poster-first delay", () => {
  it("keeps the first render poster-only and enables exactly at 1200ms, without duplicate timers", () => {
    const initial = mount();
    expect(initial.shouldLoadHeroVideo).toBe(false);
    expect(shouldLoad()).toBe(false);
    expect(browser.matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
    expect(browser.setTimeout).toHaveBeenCalledWith(expect.any(Function), 1200);
    doc.emit("visibilitychange");
    motion.emit("change");
    connection.emit("change");
    ObserverStub.instances[0].emit(true);
    expect(browser.setTimeout).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(1199);
    expect(shouldLoad()).toBe(false);
    vi.advanceTimersByTime(1);
    expect(shouldLoad()).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
    expect(ObserverStub.instances[0].observe).toHaveBeenCalledWith(hero);
    expect(browser.addEventListener).not.toHaveBeenCalled();
  });

  it.each(blockedConnections)("never requests mounting initially on $label", ({ connection: policy }) => {
    Object.assign(connection, policy);
    mount();
    vi.advanceTimersByTime(5000);
    expect(shouldLoad()).toBe(false);
    expect(hooks.setState).not.toHaveBeenCalledWith(true);
    expect(browser.setTimeout).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });

  it.each(allowedConnections)("retains delayed playback with $label", ({ connection: policy }) => {
    vi.stubGlobal("navigator", { connection: policy });
    mount();
    expect(shouldLoad()).toBe(false);
    vi.advanceTimersByTime(1200);
    expect(shouldLoad()).toBe(true);
  });

  it.each(["visibility", "motion", "viewport"] as const)("does not mount initially when blocked by %s, then starts a fresh delay", gate => {
    if (gate === "visibility") doc.visibilityState = "hidden";
    if (gate === "motion") motion.matches = true;
    if (gate === "viewport") bounds = { top: 900, bottom: 1100 };
    mount();
    vi.advanceTimersByTime(5000);
    expect(shouldLoad()).toBe(false);
    expect(hooks.setState).not.toHaveBeenCalledWith(true);
    expect(browser.setTimeout).not.toHaveBeenCalled();
    unblock(gate);
    expect(shouldLoad()).toBe(false);
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(1199);
    expect(shouldLoad()).toBe(false);
    vi.advanceTimersByTime(1);
    expect(shouldLoad()).toBe(true);
  });

  it.each([
    { label: "fully above the viewport", top: -200, bottom: -1 },
    { label: "touching the viewport's top boundary", top: -200, bottom: 0 },
    { label: "touching the viewport's bottom boundary", top: 800, bottom: 1000 },
  ])("keeps an initially offscreen hero poster-only: $label", ({ top, bottom }) => {
    bounds = { top, bottom };
    mount();
    vi.advanceTimersByTime(5000);
    expect(shouldLoad()).toBe(false);
    expect(browser.setTimeout).not.toHaveBeenCalled();
  });
});

describe("useDecorativeVideo reacts to eligibility changes", () => {
  it.each(gates)("hides on %s changes and re-enables immediately after the initial delay has elapsed", gate => {
    mount();
    vi.advanceTimersByTime(1200);
    expect(shouldLoad()).toBe(true);
    block(gate);
    expect(shouldLoad()).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(2000);
    expect(shouldLoad()).toBe(false);
    unblock(gate);
    expect(shouldLoad()).toBe(true);
    expect(browser.setTimeout).toHaveBeenCalledTimes(1);
  });

  it.each(gates)("cancels an incomplete delay on %s changes and restarts the full 1200ms", gate => {
    mount();
    vi.advanceTimersByTime(700);
    block(gate);
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(1000);
    expect(shouldLoad()).toBe(false);
    expect(hooks.setState).not.toHaveBeenCalledWith(true);
    unblock(gate);
    expect(browser.setTimeout).toHaveBeenCalledTimes(2);
    vi.advanceTimersByTime(1199);
    expect(shouldLoad()).toBe(false);
    vi.advanceTimersByTime(1);
    expect(shouldLoad()).toBe(true);
  });

  it.each(blockedConnections)("hides an enabled video after a connection change to $label", ({ connection: policy }) => {
    mount();
    vi.advanceTimersByTime(1200);
    expect(shouldLoad()).toBe(true);
    Object.assign(connection, policy);
    connection.emit("change");
    expect(shouldLoad()).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
    Object.assign(connection, { saveData: false, effectiveType: "4g", downlink: 10 });
    connection.emit("change");
    expect(shouldLoad()).toBe(true);
  });

  it("requires every gate to be eligible before re-enabling", () => {
    mount();
    vi.advanceTimersByTime(1200);
    block("visibility");
    block("motion");
    block("connection");
    block("viewport");
    for (const gate of ["visibility", "motion", "connection"] as const) {
      unblock(gate);
      expect(shouldLoad()).toBe(false);
    }
    unblock("viewport");
    expect(shouldLoad()).toBe(true);
  });

  it("treats an observer notification without entries as offscreen", () => {
    mount();
    ObserverStub.instances[0].callback([]);
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(1200);
    expect(shouldLoad()).toBe(false);
    ObserverStub.instances[0].emit(true);
    vi.advanceTimersByTime(1200);
    expect(shouldLoad()).toBe(true);
  });
});

describe("useDecorativeVideo viewport fallback and cleanup", () => {
  it("uses passive scroll and resize checks when IntersectionObserver is absent", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    bounds = { top: 800, bottom: 1000 };
    mount();
    expect(ObserverStub.instances).toHaveLength(0);
    expect(browser.addEventListener).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
    expect(browser.addEventListener).toHaveBeenCalledWith("resize", expect.any(Function));
    expect(browser.addEventListener.mock.calls[0][1]).toBe(browser.addEventListener.mock.calls[1][1]);
    vi.advanceTimersByTime(5000);
    expect(shouldLoad()).toBe(false);
    expect(browser.setTimeout).not.toHaveBeenCalled();
    bounds = { top: 799, bottom: 1000 };
    browser.emit("scroll");
    vi.advanceTimersByTime(1199);
    expect(shouldLoad()).toBe(false);
    vi.advanceTimersByTime(1);
    expect(shouldLoad()).toBe(true);
    bounds = { top: -200, bottom: 0 };
    browser.emit("scroll");
    expect(shouldLoad()).toBe(false);
    bounds = { top: 600, bottom: 900 };
    browser.innerHeight = 600;
    browser.emit("resize");
    expect(shouldLoad()).toBe(false);
    browser.innerHeight = 800;
    browser.emit("resize");
    expect(shouldLoad()).toBe(true);
  });

  it("uses the fallback safely when no hero ref is attached", () => {
    mount(false);
    expect(ObserverStub.instances).toHaveLength(0);
    expect(browser.listenerCount).toBe(2);
    vi.advanceTimersByTime(1200);
    expect(shouldLoad()).toBe(true);
  });

  it("clears the pending timer, disconnects the observer, and removes every registered listener", () => {
    mount();
    const observer = ObserverStub.instances[0];
    const timerCallback = browser.setTimeout.mock.calls[0][0] as () => void;
    const timerId = browser.setTimeout.mock.results[0].value;
    const update = doc.addEventListener.mock.calls[0][1];
    expect(doc.addEventListener).toHaveBeenCalledWith("visibilitychange", update);
    expect(motion.addEventListener).toHaveBeenCalledWith("change", update);
    expect(connection.addEventListener).toHaveBeenCalledWith("change", update);
    expect(doc.listenerCount).toBe(1);
    expect(motion.listenerCount).toBe(1);
    expect(connection.listenerCount).toBe(1);
    vi.advanceTimersByTime(600);
    dispose();
    expect(browser.clearTimeout).toHaveBeenCalledWith(timerId);
    expect(vi.getTimerCount()).toBe(0);
    expect(observer.disconnect).toHaveBeenCalledTimes(1);
    expect(doc.removeEventListener).toHaveBeenCalledWith("visibilitychange", update);
    expect(motion.removeEventListener).toHaveBeenCalledWith("change", update);
    expect(connection.removeEventListener).toHaveBeenCalledWith("change", update);
    expect(browser.removeEventListener).toHaveBeenCalledWith("scroll", expect.any(Function));
    expect(browser.removeEventListener).toHaveBeenCalledWith("resize", expect.any(Function));
    for (const target of [browser, doc, motion, connection]) expect(target.listenerCount).toBe(0);
    const stateCalls = hooks.setState.mock.calls.length;
    // Even stale/queued callbacks must not update state or restart work.
    timerCallback();
    update();
    observer.emit(true);
    doc.emit("visibilitychange");
    motion.emit("change");
    connection.emit("change");
    vi.advanceTimersByTime(5000);
    expect(hooks.setState).toHaveBeenCalledTimes(stateCalls);
    expect(shouldLoad()).toBe(false);
    expect(browser.setTimeout).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("removes fallback scroll/resize listeners with the same callbacks and cancels their timer", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    mount();
    const added = [...browser.addEventListener.mock.calls];
    dispose();
    for (const [type, listener] of added) {
      expect(browser.removeEventListener).toHaveBeenCalledWith(type, listener);
    }
    for (const target of [browser, doc, motion, connection]) expect(target.listenerCount).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
    const stateCalls = hooks.setState.mock.calls.length;
    browser.emit("scroll");
    browser.emit("resize");
    added[0][1]();
    vi.advanceTimersByTime(5000);
    expect(hooks.setState).toHaveBeenCalledTimes(stateCalls);
    expect(browser.setTimeout).toHaveBeenCalledTimes(1);
  });
});
