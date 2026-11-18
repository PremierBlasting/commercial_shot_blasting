import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// Separate Node artifact: never reuse/empty the client or Express output directory.
// Keep normal dependency externalization unless a loader failure proves otherwise.
export default defineConfig({
  root: projectRoot,
  envDir: projectRoot,
  mode: "production",
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  publicDir: false,
  plugins: [react(), tailwindcss()],
  // Native Node import cannot resolve this package's CommonJS named export.
  // Mirror the narrowly demonstrated compatibility entry in the dev config.
  ssr: { noExternal: ["react-helmet-async"] },
  resolve: {
    alias: {
      "@": path.resolve(projectRoot, "client", "src"),
      "@shared": path.resolve(projectRoot, "shared"),
      "@assets": path.resolve(projectRoot, "attached_assets"),
    },
  },
  build: {
    ssr: path.resolve(projectRoot, "client/src/ssr/entry-server.tsx"),
    outDir: path.resolve(projectRoot, "dist/server-ssr"),
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: "entry-server.js" } },
  },
});
