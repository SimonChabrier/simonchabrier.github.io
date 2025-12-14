/**
 * Utilitaire de chargement du tracking analytics (Matomo)
 *
 * Charge le script Matomo de manière asynchrone depuis le fichier tracking.json
 * pour préserver la vie privée et permettre une configuration flexible.
 */

/**
 * Charge et initialise le script de tracking Matomo
 *
 * Charge le fichier tracking.json qui contient les scripts Matomo par domaine,
 * puis injecte le script approprié dans le document si un script existe pour
 * le domaine actuel.
 *
 * Cette approche permet de:
 * - Garder le code de tracking hors du contrôle de version
 * - Configurer différents trackers par domaine
 * - Charger le script de manière asynchrone
 *
 * @example
 * ```ts
 * // Dans Layout.astro
 * <script>
 *   import { loadMatomoTracking } from "@/utils/tracking";
 *   loadMatomoTracking();
 * </script>
 * ```
 */
export async function loadMatomoTracking(): Promise<void> {
  try {
    // Charger le fichier de configuration tracking.json
    const response = await fetch("/tracking.json");
    const trackingData = await response.json();

    // Obtenir le domaine actuel (avec trailing slash)
    const url = window.location.href;
    const domain = new URL(url).origin + "/";

    // Récupérer le script Matomo pour ce domaine
    const trackingScript = trackingData[domain];

    // Si un script existe pour ce domaine, l'injecter
    if (trackingScript) {
      const scriptElement = document.createElement("script");
      scriptElement.type = "text/javascript";
      scriptElement.async = true;
      scriptElement.innerHTML = trackingScript;
      document.head.appendChild(scriptElement);
    }
  } catch (error) {
    console.error("Erreur chargement tracking.json :", error);
  }
}
