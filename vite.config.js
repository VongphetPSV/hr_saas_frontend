// vite.config.js
// Dev app at http://localhost:3000
// Frontend uses VITE_API_BASE_URL=/api in .env.local
// Backend API is proxied to http://localhost:8000

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: { "@": resolve(__dirname, "src") },
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      hmr: {
        protocol: "ws",
        host: "localhost",
        clientPort: 3000,
      },
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: { port: 3000 }
});
