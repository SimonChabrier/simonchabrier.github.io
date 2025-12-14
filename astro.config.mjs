import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
// import astroI18next from "astro-i18next";
import icon from "astro-icon";

/**
 * Configuration Astro
 *
 * Intégrations actives :
 * - Tailwind CSS pour le styling
 * - Système i18n custom (voir src/utils/i18n.ts)
 * - astro-icon pour l'optimisation des icônes SVG
 */

// https://astro.build/config
export default defineConfig({
  site: "https://simonchabrier.github.io", // URL principale du site
  base: "/", // Racine du repository
  trailingSlash: "always", // Toutes les URLs se terminent par un slash

  // Intégrations : Tailwind et icônes
  integrations: [
    tailwind(),
    // astroI18next(), // Désactivé - on utilise un système i18n custom
    icon(), // Optimisation des icônes SVG
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
