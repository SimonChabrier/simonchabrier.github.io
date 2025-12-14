/**
 * Registre centralisé des icônes
 *
 * Fournit des mappings entre les noms de compétences/réseaux sociaux et leurs icônes.
 * Permet d'éviter la duplication du code de mapping dans plusieurs composants.
 */

// Type pour les composants Astro
type AstroComponentFactory = any;

// Import de tous les composants d'icônes utilisés pour les skills
import HTML from "@/icons/html.astro";
import CSS from "@/icons/css.astro";
import JavaScript from "@/icons/javascript.astro";
import TypeScript from "@/icons/type.astro";
import React from "@/icons/react.astro";
import Node from "@/icons/node.astro";
import MySQL from "@/icons/sql.astro";
import Git from "@/icons/git.astro";
import GitHub from "@/icons/GitHub.astro";
import Tailwind from "@/icons/tailwind.astro";
import Next from "@/icons/next.astro";
import Swift from "@/icons/swift.astro";
import SwiftUI from "@/icons/swiftui.astro";
import Kotlin from "@/icons/kotlin.astro";
import Flutter from "@/icons/flutter.astro";
import Figma from "@/icons/Figma.astro";
import Gitlab from "@/icons/Gitlab.astro";

/**
 * Mapping des noms de compétences vers leurs composants d'icônes
 *
 * Utilisé dans le composant Skills pour afficher l'icône correspondant à chaque skill.
 *
 * @example
 * ```astro
 * const Icon = SKILLS_ICONS[skillName];
 * {Icon && <Icon />}
 * ```
 */
export const SKILLS_ICONS: Record<string, AstroComponentFactory> = {
  HTML,
  CSS,
  JavaScript,
  TypeScript,
  React,
  Node,
  MySQL,
  Git,
  GitHub,
  Next,
  Tailwind,
  Swift,
  SwiftUI,
  Kotlin,
  Flutter,
  Figma,
  Gitlab,
};

/**
 * Normalise un nom de compétence pour le lookup dans le registre
 *
 * Certains noms de skills dans le CV ne correspondent pas exactement aux noms
 * des composants d'icônes. Cette fonction effectue les conversions nécessaires.
 *
 * @param skillName - Le nom de la compétence depuis le CV
 * @returns Le nom normalisé pour le lookup dans SKILLS_ICONS
 *
 * @example
 * ```ts
 * normalizeSkillName("Next.js") // => "Next"
 * normalizeSkillName("React")   // => "React"
 * ```
 */
export function normalizeSkillName(skillName: string): string {
  // Mappings spéciaux
  const mappings: Record<string, string> = {
    "Next.js": "Next",
    // Ajouter d'autres mappings ici si nécessaire
  };

  return mappings[skillName] || skillName;
}

/**
 * Icônes SVG inline pour les réseaux sociaux
 *
 * Utilisé dans HotKeyPad car il ne peut pas utiliser de composants Astro.
 * Les SVG sont fournis en tant que strings HTML avec des attributs d'accessibilité.
 *
 * Note: Ces icônes sont identiques à celles des composants Astro, mais sous forme de string.
 */
export const SOCIAL_ICONS_SVG: Record<string, string> = {
  GitHub: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px" aria-labelledby="github-title" role="img">
    <title id="github-title">GitHub</title>
    <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
  </svg>`,

  LinkedIn: `<svg height="16" width="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px" aria-labelledby="linkedin-title" role="img">
    <title id="linkedin-title">LinkedIn</title>
    <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
  </svg>`,

  X: `<svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px" aria-labelledby="x-title" role="img">
    <title id="x-title">X</title>
    <path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
  </svg>`,
};
