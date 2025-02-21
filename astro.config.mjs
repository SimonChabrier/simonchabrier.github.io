import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

// https://astro.build/config
export default defineConfig({
  // site: "https://simonchabrier.github.io", // URL principale
  site: isGitHubPages ? "https://simonchabrier.github.io" : undefined, // URL principale
  base: "/", // Racine du repository
  trailingSlash: "always", // Toutes les URLs se terminent par un slash
  integrations: [
    tailwind(),
  ],
});
