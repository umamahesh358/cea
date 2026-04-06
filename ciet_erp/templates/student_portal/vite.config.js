import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    origin: "http://localhost:8080",
    hmr: {
      overlay: false,
    },
  },
  build: {
    manifest: true,
    emptyOutDir: true,
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "./src/main.jsx"),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
