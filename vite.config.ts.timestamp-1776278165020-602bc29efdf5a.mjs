// vite.config.ts
import { jsxLocPlugin } from "file:///C:/Users/Szymi/Desktop/nowa%20strona/node_modules/.pnpm/@builder.io+vite-plugin-jsx_beeabc560eb58ad0d1679c13e618bdd0/node_modules/@builder.io/vite-plugin-jsx-loc/dist/index.js";
import tailwindcss from "file:///C:/Users/Szymi/Desktop/nowa%20strona/node_modules/.pnpm/@tailwindcss+vite@4.1.14_vi_e7bd5e13e8204c79679a5c1eac35dc42/node_modules/@tailwindcss/vite/dist/index.mjs";
import react from "file:///C:/Users/Szymi/Desktop/nowa%20strona/node_modules/.pnpm/@vitejs+plugin-react@5.0.4__abdf2c4f4f4a064757ba4599915e4484/node_modules/@vitejs/plugin-react/dist/index.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "file:///C:/Users/Szymi/Desktop/nowa%20strona/node_modules/.pnpm/vite@5.4.20_@types+node@24.7.0_lightningcss@1.30.1/node_modules/vite/dist/node/index.js";
import { vitePluginManusRuntime } from "file:///C:/Users/Szymi/Desktop/nowa%20strona/node_modules/.pnpm/vite-plugin-manus-runtime@0.0.57/node_modules/vite-plugin-manus-runtime/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/Szymi/Desktop/nowa%20strona/nowa%20strona/vite.config.ts";
var PROJECT_ROOT = fileURLToPath(new URL(".", __vite_injected_original_import_meta_url));
var LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
var MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
var TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);
function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}
function trimLogFile(logPath, maxSize) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }
    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines = [];
    let keptBytes = 0;
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}
`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }
    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
  }
}
function writeToLogFile(source, entries) {
  if (entries.length === 0) return;
  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);
  const lines = entries.map((entry) => {
    const ts = (/* @__PURE__ */ new Date()).toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });
  fs.appendFileSync(logPath, `${lines.join("\n")}
`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}
function vitePluginManusDebugCollector() {
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
              defer: true
            },
            injectTo: "head"
          }
        ]
      };
    },
    configureServer(server) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }
        const handlePayload = (payload) => {
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
        const reqBody = req.body;
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
    }
  };
}
var plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime(), vitePluginManusDebugCollector()];
var vite_config_default = defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "client", "src"),
      "@shared": path.resolve(PROJECT_ROOT, "shared"),
      "@assets": path.resolve(PROJECT_ROOT, "attached_assets")
    }
  },
  envDir: path.resolve(PROJECT_ROOT),
  root: path.resolve(PROJECT_ROOT, "client"),
  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist/public"),
    emptyOutDir: true
  },
  server: {
    port: 3e3,
    strictPort: false,
    // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTenltaVxcXFxEZXNrdG9wXFxcXG5vd2Egc3Ryb25hXFxcXG5vd2Egc3Ryb25hXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTenltaVxcXFxEZXNrdG9wXFxcXG5vd2Egc3Ryb25hXFxcXG5vd2Egc3Ryb25hXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9TenltaS9EZXNrdG9wL25vd2ElMjBzdHJvbmEvbm93YSUyMHN0cm9uYS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGpzeExvY1BsdWdpbiB9IGZyb20gXCJAYnVpbGRlci5pby92aXRlLXBsdWdpbi1qc3gtbG9jXCI7XG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSBcIkB0YWlsd2luZGNzcy92aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgZnMgZnJvbSBcIm5vZGU6ZnNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW4sIHR5cGUgVml0ZURldlNlcnZlciB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyB2aXRlUGx1Z2luTWFudXNSdW50aW1lIH0gZnJvbSBcInZpdGUtcGx1Z2luLW1hbnVzLXJ1bnRpbWVcIjtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIE1hbnVzIERlYnVnIENvbGxlY3RvciAtIFZpdGUgUGx1Z2luXG4vLyBXcml0ZXMgYnJvd3NlciBsb2dzIGRpcmVjdGx5IHRvIGZpbGVzLCB0cmltbWVkIHdoZW4gZXhjZWVkaW5nIHNpemUgbGltaXRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmNvbnN0IFBST0pFQ1RfUk9PVCA9IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi5cIiwgaW1wb3J0Lm1ldGEudXJsKSk7XG5jb25zdCBMT0dfRElSID0gcGF0aC5qb2luKFBST0pFQ1RfUk9PVCwgXCIubWFudXMtbG9nc1wiKTtcbmNvbnN0IE1BWF9MT0dfU0laRV9CWVRFUyA9IDEgKiAxMDI0ICogMTAyNDsgLy8gMU1CIHBlciBsb2cgZmlsZVxuY29uc3QgVFJJTV9UQVJHRVRfQllURVMgPSBNYXRoLmZsb29yKE1BWF9MT0dfU0laRV9CWVRFUyAqIDAuNik7IC8vIFRyaW0gdG8gNjAlIHRvIGF2b2lkIGNvbnN0YW50IHJlLXRyaW1taW5nXG5cbnR5cGUgTG9nU291cmNlID0gXCJicm93c2VyQ29uc29sZVwiIHwgXCJuZXR3b3JrUmVxdWVzdHNcIiB8IFwic2Vzc2lvblJlcGxheVwiO1xuXG5mdW5jdGlvbiBlbnN1cmVMb2dEaXIoKSB7XG4gIGlmICghZnMuZXhpc3RzU3luYyhMT0dfRElSKSkge1xuICAgIGZzLm1rZGlyU3luYyhMT0dfRElSLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cmltTG9nRmlsZShsb2dQYXRoOiBzdHJpbmcsIG1heFNpemU6IG51bWJlcikge1xuICB0cnkge1xuICAgIGlmICghZnMuZXhpc3RzU3luYyhsb2dQYXRoKSB8fCBmcy5zdGF0U3luYyhsb2dQYXRoKS5zaXplIDw9IG1heFNpemUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsaW5lcyA9IGZzLnJlYWRGaWxlU3luYyhsb2dQYXRoLCBcInV0Zi04XCIpLnNwbGl0KFwiXFxuXCIpO1xuICAgIGNvbnN0IGtlcHRMaW5lczogc3RyaW5nW10gPSBbXTtcbiAgICBsZXQga2VwdEJ5dGVzID0gMDtcblxuICAgIC8vIEtlZXAgbmV3ZXN0IGxpbmVzIChmcm9tIGVuZCkgdGhhdCBmaXQgd2l0aGluIDYwJSBvZiBtYXhTaXplXG4gICAgY29uc3QgdGFyZ2V0U2l6ZSA9IFRSSU1fVEFSR0VUX0JZVEVTO1xuICAgIGZvciAobGV0IGkgPSBsaW5lcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgY29uc3QgbGluZUJ5dGVzID0gQnVmZmVyLmJ5dGVMZW5ndGgoYCR7bGluZXNbaV19XFxuYCwgXCJ1dGYtOFwiKTtcbiAgICAgIGlmIChrZXB0Qnl0ZXMgKyBsaW5lQnl0ZXMgPiB0YXJnZXRTaXplKSBicmVhaztcbiAgICAgIGtlcHRMaW5lcy51bnNoaWZ0KGxpbmVzW2ldKTtcbiAgICAgIGtlcHRCeXRlcyArPSBsaW5lQnl0ZXM7XG4gICAgfVxuXG4gICAgZnMud3JpdGVGaWxlU3luYyhsb2dQYXRoLCBrZXB0TGluZXMuam9pbihcIlxcblwiKSwgXCJ1dGYtOFwiKTtcbiAgfSBjYXRjaCB7XG4gICAgLyogaWdub3JlIHRyaW0gZXJyb3JzICovXG4gIH1cbn1cblxuZnVuY3Rpb24gd3JpdGVUb0xvZ0ZpbGUoc291cmNlOiBMb2dTb3VyY2UsIGVudHJpZXM6IHVua25vd25bXSkge1xuICBpZiAoZW50cmllcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICBlbnN1cmVMb2dEaXIoKTtcbiAgY29uc3QgbG9nUGF0aCA9IHBhdGguam9pbihMT0dfRElSLCBgJHtzb3VyY2V9LmxvZ2ApO1xuXG4gIC8vIEZvcm1hdCBlbnRyaWVzIHdpdGggdGltZXN0YW1wc1xuICBjb25zdCBsaW5lcyA9IGVudHJpZXMubWFwKChlbnRyeSkgPT4ge1xuICAgIGNvbnN0IHRzID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuICAgIHJldHVybiBgWyR7dHN9XSAke0pTT04uc3RyaW5naWZ5KGVudHJ5KX1gO1xuICB9KTtcblxuICAvLyBBcHBlbmQgdG8gbG9nIGZpbGVcbiAgZnMuYXBwZW5kRmlsZVN5bmMobG9nUGF0aCwgYCR7bGluZXMuam9pbihcIlxcblwiKX1cXG5gLCBcInV0Zi04XCIpO1xuXG4gIC8vIFRyaW0gaWYgZXhjZWVkcyBtYXggc2l6ZVxuICB0cmltTG9nRmlsZShsb2dQYXRoLCBNQVhfTE9HX1NJWkVfQllURVMpO1xufVxuXG4vKipcbiAqIFZpdGUgcGx1Z2luIHRvIGNvbGxlY3QgYnJvd3NlciBkZWJ1ZyBsb2dzXG4gKiAtIFBPU1QgL19fbWFudXNfXy9sb2dzOiBCcm93c2VyIHNlbmRzIGxvZ3MsIHdyaXR0ZW4gZGlyZWN0bHkgdG8gZmlsZXNcbiAqIC0gRmlsZXM6IGJyb3dzZXJDb25zb2xlLmxvZywgbmV0d29ya1JlcXVlc3RzLmxvZywgc2Vzc2lvblJlcGxheS5sb2dcbiAqIC0gQXV0by10cmltbWVkIHdoZW4gZXhjZWVkaW5nIDFNQiAoa2VlcHMgbmV3ZXN0IGVudHJpZXMpXG4gKi9cbmZ1bmN0aW9uIHZpdGVQbHVnaW5NYW51c0RlYnVnQ29sbGVjdG9yKCk6IFBsdWdpbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJtYW51cy1kZWJ1Zy1jb2xsZWN0b3JcIixcblxuICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBodG1sO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHRtbCxcbiAgICAgICAgdGFnczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRhZzogXCJzY3JpcHRcIixcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHNyYzogXCIvX19tYW51c19fL2RlYnVnLWNvbGxlY3Rvci5qc1wiLFxuICAgICAgICAgICAgICBkZWZlcjogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmplY3RUbzogXCJoZWFkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXI6IFZpdGVEZXZTZXJ2ZXIpIHtcbiAgICAgIC8vIFBPU1QgL19fbWFudXNfXy9sb2dzOiBCcm93c2VyIHNlbmRzIGxvZ3MgKHdyaXR0ZW4gZGlyZWN0bHkgdG8gZmlsZXMpXG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKFwiL19fbWFudXNfXy9sb2dzXCIsIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICBpZiAocmVxLm1ldGhvZCAhPT0gXCJQT1NUXCIpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaGFuZGxlUGF5bG9hZCA9IChwYXlsb2FkOiBhbnkpID0+IHtcbiAgICAgICAgICAvLyBXcml0ZSBsb2dzIGRpcmVjdGx5IHRvIGZpbGVzXG4gICAgICAgICAgaWYgKHBheWxvYWQuY29uc29sZUxvZ3M/Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHdyaXRlVG9Mb2dGaWxlKFwiYnJvd3NlckNvbnNvbGVcIiwgcGF5bG9hZC5jb25zb2xlTG9ncyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXlsb2FkLm5ldHdvcmtSZXF1ZXN0cz8ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgd3JpdGVUb0xvZ0ZpbGUoXCJuZXR3b3JrUmVxdWVzdHNcIiwgcGF5bG9hZC5uZXR3b3JrUmVxdWVzdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGF5bG9hZC5zZXNzaW9uRXZlbnRzPy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB3cml0ZVRvTG9nRmlsZShcInNlc3Npb25SZXBsYXlcIiwgcGF5bG9hZC5zZXNzaW9uRXZlbnRzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KTtcbiAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSB9KSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmVxQm9keSA9IChyZXEgYXMgeyBib2R5PzogdW5rbm93biB9KS5ib2R5O1xuICAgICAgICBpZiAocmVxQm9keSAmJiB0eXBlb2YgcmVxQm9keSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoYW5kbGVQYXlsb2FkKHJlcUJvZHkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDAwLCB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0pO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogU3RyaW5nKGUpIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGJvZHkgPSBcIlwiO1xuICAgICAgICByZXEub24oXCJkYXRhXCIsIChjaHVuaykgPT4ge1xuICAgICAgICAgIGJvZHkgKz0gY2h1bmsudG9TdHJpbmcoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVxLm9uKFwiZW5kXCIsICgpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICAgICAgICBoYW5kbGVQYXlsb2FkKHBheWxvYWQpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDAwLCB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0pO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogU3RyaW5nKGUpIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSxcbiAgfTtcbn1cblxuY29uc3QgcGx1Z2lucyA9IFtyZWFjdCgpLCB0YWlsd2luZGNzcygpLCBqc3hMb2NQbHVnaW4oKSwgdml0ZVBsdWdpbk1hbnVzUnVudGltZSgpLCB2aXRlUGx1Z2luTWFudXNEZWJ1Z0NvbGxlY3RvcigpXTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2lucyxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKFBST0pFQ1RfUk9PVCwgXCJjbGllbnRcIiwgXCJzcmNcIiksXG4gICAgICBcIkBzaGFyZWRcIjogcGF0aC5yZXNvbHZlKFBST0pFQ1RfUk9PVCwgXCJzaGFyZWRcIiksXG4gICAgICBcIkBhc3NldHNcIjogcGF0aC5yZXNvbHZlKFBST0pFQ1RfUk9PVCwgXCJhdHRhY2hlZF9hc3NldHNcIiksXG4gICAgfSxcbiAgfSxcbiAgZW52RGlyOiBwYXRoLnJlc29sdmUoUFJPSkVDVF9ST09UKSxcbiAgcm9vdDogcGF0aC5yZXNvbHZlKFBST0pFQ1RfUk9PVCwgXCJjbGllbnRcIiksXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBwYXRoLnJlc29sdmUoUFJPSkVDVF9ST09ULCBcImRpc3QvcHVibGljXCIpLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLCAvLyBXaWxsIGZpbmQgbmV4dCBhdmFpbGFibGUgcG9ydCBpZiAzMDAwIGlzIGJ1c3lcbiAgICBob3N0OiB0cnVlLFxuICAgIGFsbG93ZWRIb3N0czogW1xuICAgICAgXCIubWFudXNwcmUuY29tcHV0ZXJcIixcbiAgICAgIFwiLm1hbnVzLmNvbXB1dGVyXCIsXG4gICAgICBcIi5tYW51cy1hc2lhLmNvbXB1dGVyXCIsXG4gICAgICBcIi5tYW51c2NvbXB1dGVyLmFpXCIsXG4gICAgICBcIi5tYW51c3ZtLmNvbXB1dGVyXCIsXG4gICAgICBcImxvY2FsaG9zdFwiLFxuICAgICAgXCIxMjcuMC4wLjFcIixcbiAgICBdLFxuICAgIGZzOiB7XG4gICAgICBzdHJpY3Q6IHRydWUsXG4gICAgICBkZW55OiBbXCIqKi8uKlwiXSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRVLFNBQVMsb0JBQW9CO0FBQ3pXLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sV0FBVztBQUNsQixPQUFPLFFBQVE7QUFDZixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsU0FBUyxvQkFBcUQ7QUFDOUQsU0FBUyw4QkFBOEI7QUFQd0ssSUFBTSwyQ0FBMkM7QUFjaFEsSUFBTSxlQUFlLGNBQWMsSUFBSSxJQUFJLEtBQUssd0NBQWUsQ0FBQztBQUNoRSxJQUFNLFVBQVUsS0FBSyxLQUFLLGNBQWMsYUFBYTtBQUNyRCxJQUFNLHFCQUFxQixJQUFJLE9BQU87QUFDdEMsSUFBTSxvQkFBb0IsS0FBSyxNQUFNLHFCQUFxQixHQUFHO0FBSTdELFNBQVMsZUFBZTtBQUN0QixNQUFJLENBQUMsR0FBRyxXQUFXLE9BQU8sR0FBRztBQUMzQixPQUFHLFVBQVUsU0FBUyxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBQUEsRUFDM0M7QUFDRjtBQUVBLFNBQVMsWUFBWSxTQUFpQixTQUFpQjtBQUNyRCxNQUFJO0FBQ0YsUUFBSSxDQUFDLEdBQUcsV0FBVyxPQUFPLEtBQUssR0FBRyxTQUFTLE9BQU8sRUFBRSxRQUFRLFNBQVM7QUFDbkU7QUFBQSxJQUNGO0FBRUEsVUFBTSxRQUFRLEdBQUcsYUFBYSxTQUFTLE9BQU8sRUFBRSxNQUFNLElBQUk7QUFDMUQsVUFBTSxZQUFzQixDQUFDO0FBQzdCLFFBQUksWUFBWTtBQUdoQixV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
