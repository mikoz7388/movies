import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    eslint({ include: ["./src/**/*.ts", "./src/**/*.tsx"] }),
    svgr(),
    react({
      jsxImportSource: "@welldone-software/why-did-you-render", // <-----
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
