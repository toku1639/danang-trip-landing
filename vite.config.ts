import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** GitHub Pages プロジェクトサイト: https://toku1639.github.io/danang-trip-landing/ */
const repoBase = "/danang-trip-landing/";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? repoBase : "/",
  server: {
    port: 8080,
    strictPort: false,
    open: false,
  },
  preview: {
    port: 8080,
    strictPort: false,
  },
}));
