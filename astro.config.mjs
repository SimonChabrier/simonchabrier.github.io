import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://simonchabrier.github.io", // URL principale du site
  base: "/", // Racine du repository
  trailingSlash: "always", // Toutes les URLs se terminent par un slash
  integrations: [
    tailwind(),
  ],
});
