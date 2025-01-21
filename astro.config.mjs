import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import matomo from "@jop-software/astro-matomo";

// https://astro.build/config
export default defineConfig({
  site: "https://simonchabrier.github.io", // URL du site
  base: "/", // Racine du repository
  trailingSlash: "always", // Toutes les URLs se terminent par un slash
  integrations: [
    tailwind(),
    matomo({
      baseUrl: "https://matomo.simschab.cloud/", // URL de ton Matomo
      siteId: 1, // ID du site Matomo
    }),
  ],
});
