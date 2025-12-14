/**
 * Configuration astro-i18next
 *
 * Configure le système de traduction i18next pour le support bilingue (FR/EN)
 * du portfolio. Les fichiers de traduction sont stockés dans public/locales/
 *
 * @type {import('astro-i18next').AstroI18nextConfig}
 */
export default {
  // Locale par défaut (anglais)
  defaultLocale: "en",

  // Locales supportées
  locales: ["en", "fr"],

  // Mapping des routes pour les locales
  // Permet de définir des URLs personnalisées par locale si nécessaire
  routes: {
    fr: {
      // Routes personnalisées pour le français peuvent être ajoutées ici
      // Exemple: "about": "a-propos"
    },
  },

  // Configuration du serveur i18next (pour SSG/SSR)
  i18nextServer: {
    // Mode debug désactivé en production
    debug: false,
  },

  // Plugins serveur i18next (ajoutez-en si nécessaire)
  i18nextServerPlugins: {},

  // Configuration du client i18next (pour le navigateur)
  i18nextClient: {
    // Mode debug désactivé en production
    debug: false,
  },

  // Plugins client i18next (ajoutez-en si nécessaire)
  i18nextClientPlugins: {},
};
