/**
 * Utilitaire de gestion de la locale (langue)
 *
 * Fournit des fonctions centralisées pour gérer le changement de langue
 * dans le portfolio bilingue (FR/EN).
 */

export type Locale = "en" | "fr";

/**
 * Récupère la locale stockée dans localStorage
 *
 * @returns La locale stockée ("en" ou "fr") ou null si aucune locale n'est stockée
 */
export function getStoredLocale(): Locale | null {
  return localStorage.getItem("locale") as Locale | null;
}

/**
 * Change la langue et redirige vers la nouvelle URL
 *
 * Sauvegarde la locale dans localStorage puis met à jour l'URL pour refléter
 * la nouvelle langue (/en/ ou /fr/) et redirige l'utilisateur.
 *
 * @param targetLocale - La locale cible ("en" ou "fr")
 *
 * @example
 * ```ts
 * // Changer vers le français
 * switchLocale("fr");
 * // Redirige de /en/page vers /fr/page
 * ```
 */
export function switchLocale(targetLocale: Locale): void {
  // Sauvegarder la préférence dans localStorage
  localStorage.setItem("locale", targetLocale);

  // Construire la nouvelle URL avec la locale cible
  const url = new URL(window.location.href);

  // Remplacer /en/ ou /fr/ dans le path par la nouvelle locale
  // Regex: remplace /en/ ou /fr/ suivi optionnellement d'un slash final
  url.pathname = url.pathname.replace(/\/(fr|en)\/?$/, `/${targetLocale}/`);

  // Rediriger vers la nouvelle URL
  window.location.href = url.toString();
}
