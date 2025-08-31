// vite.config.ts or vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 3000,
      clientPort: 3000,
    },
    // Add these to fix WebSocket issues
    watch: {
      usePolling: true,
    },
    // Ensure proxy doesn't interfere with WebSocket
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket proxy
      },
    },
  },
});
