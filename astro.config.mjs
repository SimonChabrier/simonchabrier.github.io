import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

/**
 * Configuration Astro
 *
 * Intégrations actives :
 * - Tailwind CSS pour le styling
 * - Système i18n custom (voir src/utils/i18n.ts)
 */

// https://astro.build/config
export default defineConfig({
  site: "https://simonchabrier.github.io", // URL principale du site
  base: "/", // Racine du repository
  trailingSlash: "always", // Toutes les URLs se terminent par un slash

  // Intégration : Tailwind CSS
  integrations: [
    tailwind(),
  ],

  // Configuration i18n Astro native (pour le routing)
  // Conservée pour assurer la compatibilité avec la structure actuelle
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
