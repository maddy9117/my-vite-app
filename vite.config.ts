import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import tailwindcss from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  base: "/my-vite-app/",
  plugins: [react()],
  css: {
    postcss: "./postcss.config.cjs",
  },
});
