/**
 * Système de traduction i18n personnalisé
 *
 * Système léger de gestion des traductions pour le portfolio bilingue (FR/EN).
 * Charge les fichiers JSON de traduction depuis public/locales/ et fournit
 * une fonction `t()` pour récupérer les strings traduites avec support de l'interpolation.
 *
 * Usage:
 * ```ts
 * import { t } from "@/utils/i18n";
 *
 * const title = t("sections:about.title", { lng: "fr" });
 * // => "À propos"
 * ```
 */

// Import statiques de tous les fichiers de traduction
import commonEn from "../../public/locales/en/common.json";
import commonFr from "../../public/locales/fr/common.json";
import componentsEn from "../../public/locales/en/components.json";
import componentsFr from "../../public/locales/fr/components.json";
import sectionsEn from "../../public/locales/en/sections.json";
import sectionsFr from "../../public/locales/fr/sections.json";

export type Locale = "en" | "fr";
type Namespace = "common" | "components" | "sections";

/**
 * Registre de toutes les traductions
 * Structuré par locale puis par namespace
 */
const translations = {
  en: {
    common: commonEn,
    components: componentsEn,
    sections: sectionsEn,
  },
  fr: {
    common: commonFr,
    components: componentsFr,
    sections: sectionsFr,
  },
} as const;

/**
 * Fonction de traduction principale
 *
 * Récupère une string traduite depuis les fichiers JSON.
 * Supporte la notation par points (ex: "hero.showProfile") et l'interpolation de variables
 * (ex: "{{name}}").
 *
 * @param key - Clé de traduction au format "namespace:path.to.key"
 * @param options - Options incluant la locale (lng) et les variables d'interpolation
 * @returns String traduite avec variables interpolées
 *
 * @example
 * ```ts
 * // Traduction simple
 * const title = t("sections:about.title", { lng: "fr" });
 * // => "À propos"
 *
 * // Traduction avec interpolation
 * const msg = t("sections:hero.phoneTitle", {
 *   lng: "en",
 *   name: "John",
 *   phone: "123-456"
 * });
 * // => "Contact John at 123-456"
 * ```
 */
export function t(
  key: string,
  options: { lng: Locale; [key: string]: any } = { lng: "en" }
): string {
  const { lng, ...variables } = options;

  // Parser la clé (format: "namespace:path.to.key")
  const [namespace, ...pathParts] = key.split(":");
  const path = pathParts.join(":");

  // Si le format est invalide, retourner la clé
  if (!path || !namespace) {
    console.warn(`Format de clé i18n invalide: ${key}`);
    return key;
  }

  // Vérifier que la locale est valide
  if (!translations[lng]) {
    console.warn(`Locale invalide: ${lng}`);
    return key;
  }

  // Vérifier que le namespace est valide
  const nsTranslations = translations[lng][namespace as Namespace];
  if (!nsTranslations) {
    console.warn(`Namespace invalide: ${namespace}`);
    return key;
  }

  // Naviguer dans l'objet avec le path (ex: "hero.showProfile")
  const keys = path.split(".");
  let result: any = nsTranslations;

  for (const k of keys) {
    if (result && typeof result === "object" && k in result) {
      result = result[k];
    } else {
      console.warn(`Clé de traduction introuvable: ${key}`);
      return key;
    }
  }

  // Si le résultat n'est pas une string, retourner la clé
  if (typeof result !== "string") {
    console.warn(`La traduction n'est pas une string: ${key}`);
    return key;
  }

  // Interpoler les variables (ex: "Hello {{name}}" avec { name: "John" })
  let translatedString = result;
  for (const [varName, varValue] of Object.entries(variables)) {
    // Chercher les placeholders comme {{varName}} ou {{ varName }}
    const placeholder = new RegExp(`{{\\s*${varName}\\s*}}`, "g");
    translatedString = translatedString.replace(placeholder, String(varValue));
  }

  return translatedString;
}
