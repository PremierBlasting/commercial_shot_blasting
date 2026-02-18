import "dotenv/config";
import express, { Request, Response } from "express";
import compression from "compression";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
// Sitemap handler removed - sitemaps now served as static files

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // Redirect HTTP to HTTPS in production
  app.use((req: Request, res: Response, next) => {
    // Check if request is HTTP and not already HTTPS
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    
    // Only redirect in production (when x-forwarded-proto is set by load balancer)
    if (protocol === 'http' && req.headers['x-forwarded-proto']) {
      return res.redirect(301, `https://${host}${req.url}`);
    }
    
    next();
  });
  
  // Add HSTS (HTTP Strict Transport Security) header in production
  app.use((req: Request, res: Response, next) => {
    // Only set HSTS in production (when x-forwarded-proto is set by load balancer)
    if (req.headers['x-forwarded-proto'] === 'https') {
      // max-age=31536000 (1 year), includeSubDomains, preload
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    next();
  });
  
  // Enable Gzip/Brotli compression for all responses
  app.use(compression({
    level: 6, // Balanced compression level
    threshold: 1024, // Only compress responses > 1KB
    filter: (req: Request, res: Response) => {
      // Compress text-based content types
      if (req.headers['x-no-compression']) return false;
      return compression.filter(req, res);
    }
  }));
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Sitemap.xml will be served as a static file from public/ directory
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
