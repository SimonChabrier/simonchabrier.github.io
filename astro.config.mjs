import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://simonchabrier.github.io/', // url du site
  base: 'simonchabrier.github.io', // nom du repo
  trailingSlash:'always', // pour les liens relatifs
  integrations: [tailwind()],
});
