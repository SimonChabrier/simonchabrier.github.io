import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://simonchabrier.github.io', // URL du site
  base: '/', // racine du repository, car il n'y a pas de sous-dossier pour ce projet il est à la racine
  trailingSlash: 'always', // Pour que toutes les URLs se terminent par un slash
  integrations: [tailwind()],
});
