/**
 * Utilitaire de gestion des thèmes
 *
 * Fournit des fonctions centralisées pour gérer le thème de l'application (system/light/dark).
 * Gère la persistance dans localStorage, la détection du thème système, et l'application
 * des classes CSS appropriées.
 */

export type Theme = "system" | "light" | "dark";

/**
 * Détecte le thème préféré du système
 *
 * Utilise la media query prefers-color-scheme pour déterminer si l'utilisateur
 * préfère un thème sombre ou clair au niveau système.
 *
 * @returns "dark" si le système utilise le mode sombre, sinon "light"
 */
export function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Récupère le thème stocké dans localStorage
 *
 * @returns Le thème stocké (system/light/dark) ou null si aucun thème n'est stocké
 */
export function getStoredTheme(): Theme | null {
  return localStorage.getItem("theme") as Theme | null;
}

/**
 * Applique le thème au document
 *
 * Met à jour les classes CSS du document HTML et sauvegarde le choix dans localStorage.
 * Si le thème est "system", détecte automatiquement le thème système à appliquer.
 *
 * @param value - Le thème à appliquer (system/light/dark)
 */
export function updateTheme(value: Theme): void {
  // Si "system", utiliser le thème système détecté
  const theme = value === "system" ? getSystemTheme() : value;

  // Retirer toutes les classes de thème existantes
  document.documentElement.classList.remove("light", "dark");

  // Ajouter la nouvelle classe de thème
  document.documentElement.classList.add(theme);

  // Sauvegarder la préférence dans localStorage
  localStorage.setItem("theme", value);
}

/**
 * Initialise le thème au chargement de la page
 *
 * Configure le select element avec le thème stocké ou le thème système,
 * puis applique ce thème au document.
 *
 * @param selectElement - L'élément HTML select du sélecteur de thème
 */
export function initializeTheme(selectElement: HTMLSelectElement): void {
  const storedTheme = getStoredTheme();
  const systemTheme = getSystemTheme();

  // Si un thème est stocké, l'utiliser
  if (storedTheme !== null) {
    selectElement.value = storedTheme;
  } else {
    // Sinon, utiliser le thème système
    selectElement.value = systemTheme;
  }

  // Appliquer le thème
  updateTheme(selectElement.value as Theme);
}

/**
 * Configure les gestionnaires d'événements pour l'impression
 *
 * Lors de l'impression, désactive temporairement le mode sombre pour éviter
 * les problèmes d'impression (fond noir, encre gaspillée). Restaure le thème
 * original après l'impression.
 *
 * @param selectElement - L'élément HTML select du sélecteur de thème
 */
export function setupPrintHandlers(selectElement: HTMLSelectElement): void {
  // Avant l'impression : forcer le mode light
  window.addEventListener("beforeprint", () => {
    document.documentElement.classList.remove("dark");
  });

  // Après l'impression : restaurer le thème si c'était dark
  window.addEventListener("afterprint", () => {
    const systemTheme = getSystemTheme();

    // Si le thème sélectionné est dark, ou system avec système en dark
    if (
      selectElement.value === "dark" ||
      (selectElement.value === "system" && systemTheme === "dark")
    ) {
      document.documentElement.classList.add("dark");
    }
  });
}
