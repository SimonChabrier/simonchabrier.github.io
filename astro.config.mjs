import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://simonchabrier.github.io/', // URL du site
  base: '/', // racine du repository, car il s'agit d'un site personnel
  trailingSlash: 'always', // Pour que toutes les URLs se terminent par un slash
  integrations: [tailwind()],
});
