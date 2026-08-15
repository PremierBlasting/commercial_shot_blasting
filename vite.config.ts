import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

/**
 * Vite plugin to inject <link rel="preload" as="style"> for the main CSS file.
 * This improves First Contentful Paint by hinting the browser to load CSS early.
 * The plugin runs at generateBundle time so it knows the hashed CSS filename.
 */
function vitePluginPreloadMainCss(): Plugin {
  return {
    name: 'preload-main-css',
    apply: 'build',
    generateBundle(_options, bundle) {
      // Find the main CSS file in the bundle
      const cssFile = Object.keys(bundle).find(
        (key) => key.endsWith('.css') && key.startsWith('assets/index')
      );
      if (!cssFile) return;

      // Inject preload link into each HTML file
      for (const key of Object.keys(bundle)) {
        const chunk = bundle[key];
        if (chunk.type === 'asset' && key.endsWith('.html')) {
          const html = chunk.source as string;
          const preloadTag = `<link rel="preload" href="/${cssFile}" as="style" />`;
          if (!html.includes(preloadTag)) {
            chunk.source = html.replace('</head>', `  ${preloadTag}\n  </head>`);
          }
        }
      }
    },
  };
}

/**
 * Vite plugin to generate a county→chunk filename manifest at build time.
 * The server uses this to inject <link rel="modulepreload"> for the correct
 * county chunk when serving location pages, eliminating the dynamic import waterfall.
 */
function vitePluginCountyChunkManifest(): Plugin {
  return {
    name: 'county-chunk-manifest',
    apply: 'build',
    generateBundle(_options, bundle) {
      // Build a map of county slug → hashed chunk filename
      const manifest: Record<string, string> = {};
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk' && fileName.startsWith('assets/loc-')) {
          // Extract county slug from chunk name: assets/loc-{county}-{hash}.js
          const match = fileName.match(/assets\/loc-([a-z-]+)-/);
          if (match) {
            manifest[match[1]] = `/${fileName}`;
          }
        }
      }
      // Emit the manifest as a JSON asset
      this.emitFile({
        type: 'asset',
        fileName: 'county-chunk-manifest.json',
        source: JSON.stringify(manifest),
      });
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector(), vitePluginPreloadMainCss(), vitePluginCountyChunkManifest()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // County-based code-splitting: each locationChunks/*.ts file becomes
          // its own chunk, loaded on demand when a user visits a town in that county.
          // The lightweight locationSlugIndex stays in the main bundle (~24KB).
          if (id.includes('locationChunks/')) {
            const match = id.match(/locationChunks\/([a-z-]+)\.ts/);
            if (match) return `loc-${match[1]}`;
          }
          // countyData used by county hub pages (shared chunk)
          if (id.includes('countyData')) {
            return 'county-data';
          }
          // React core + DOM in one stable vendor chunk (long-term cacheable)
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Radix UI + shadcn components in a separate UI chunk
          if (id.includes('node_modules/@radix-ui/') || id.includes('node_modules/lucide-react')) {
            return 'vendor-ui';
          }
          // tRPC + tanstack query client
          if (id.includes('node_modules/@trpc/') || id.includes('node_modules/@tanstack/')) {
            return 'vendor-trpc';
          }
        },
      },
    },
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
