import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://simonchabrier.github.io", // URL principale du site
  base: "/", // Racine du repository
  trailingSlash: "always", // Toutes les URLs se terminent par un slash
  integrations: [tailwind()],
  i18n: {
    locales: ["fr", "en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true, // Préfixe les URLs avec la locale par défaut
      trailingSlash: "always", // Toutes les URLs se terminent par un slash
      localePath: "/:locale", // Chemin pour les locales
      localePrefix: true, // Préfixe les URLs avec la locale
    },
  },
});
