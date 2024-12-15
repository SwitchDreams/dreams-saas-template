/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import ViteRails from "vite-plugin-rails";

export default defineConfig({
  build: { sourcemap: false },
  plugins: [ViteRails(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.js"],
    testMatch: ["./app/frontend/**/*.test.jsx"],
    globals: true,
  },
});
