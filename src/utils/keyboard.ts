/**
 * Utilitaire pour la gestion des raccourcis clavier
 *
 * Fournit des fonctions pour interagir avec le système de raccourcis clavier
 * (HotKeyPad) et améliorer l'accessibilité.
 */

/**
 * Déclenche l'ouverture de la palette de commandes
 *
 * Simule la combinaison de touches Ctrl+K pour ouvrir HotKeyPad.
 * Utilisé principalement par le bouton flottant mobile qui ne peut pas
 * utiliser directement les événements clavier.
 */
export function triggerCommandPalette(): void {
  // Créer un événement clavier simulant Ctrl+K
  const event = new KeyboardEvent("keydown", {
    key: "K",
    code: "KeyK",
    keyCode: 75,
    which: 75,
    ctrlKey: true,
    altKey: false,
    shiftKey: false,
    metaKey: false,
  });

  // Dispatcher l'événement sur le document
  document.dispatchEvent(event);
}

/**
 * Corrige les problèmes d'accessibilité dans HotKeyPad
 *
 * Ajoute les attributs aria-label manquants aux éléments h4 qui servent
 * de headers dans la palette de commandes (sections "Actions" et "Social").
 * Améliore l'expérience pour les utilisateurs de lecteurs d'écran.
 */
export function fixHotKeyPadAccessibility(): void {
  // Sélectionner tous les headers h4 dans le container HotKeyPad
  document.querySelectorAll("[data-container] h4").forEach((header) => {
    const text = header.textContent;

    // Ajouter aria-label pour les sections connues
    if (text === "Actions" || text === "Social") {
      header.setAttribute("aria-label", text);
    }
  });
}
