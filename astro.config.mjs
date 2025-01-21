import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import matomo from "@jop-software/astro-matomo";

// https://astro.build/config
export default defineConfig({
  site: "https://simonchabrier.github.io", // URL principale
  base: "/", // Racine du repository
  trailingSlash: "always", // Toutes les URLs se terminent par un slash
  integrations: [
    tailwind(),
    matomo({
      baseUrl: "https://matomo.simschab.cloud/", // URL de ton serveur Matomo
      siteId: 1, // ID du site Matomo (le même pour tous les domaines)
      jsTrackerUrl: "https://matomo.simschab.cloud/matomo.js", // Tracker JS pour tous les domaines
      phpTrackerUrl: "https://matomo.simschab.cloud/matomo.php", // URL du tracker PHP
      trackerDomains: [
        "simschab.cloud",
        "simonchabrier.fr",
        "simonchabrier.com",
      ],
    }),
  ],
});
