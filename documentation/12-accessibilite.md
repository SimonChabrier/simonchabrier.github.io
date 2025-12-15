# ♿ Accessibilité

## Conformité WCAG 2.1 Niveau AA

Mon portfolio respecte les standards WCAG 2.1 AA.

---

## Structure HTML Sémantique

```html
<main>
  <section>
    <h2>Titre de Section</h2>
    <article>...</article>
  </section>
</main>

<footer>...</footer>
```

**Hiérarchie des headings** :
- H1 : Nom (une seule fois)
- H2 : Titres de sections
- H3 : Sous-titres (postes, projets)
- H4 : Détails (responsabilités, réalisations)

---

## ARIA Labels

### Liens Externes

```html
<a
  href={url}
  aria-label={`Voir le profil de ${name} sur ${network}`}
  target="_blank"
  rel="noopener noreferrer"
>
  {network}
</a>
```

### Boutons

```html
<button
  @click="expanded = !expanded"
  aria-label="Afficher plus de détails"
  aria-expanded="false"
  :aria-expanded="expanded.toString()"
>
  <span x-text="expanded ? 'Voir moins' : 'Voir plus'"></span>
</button>
```

---

## SVG Accessibles

```html
<svg aria-labelledby="github-title" role="img">
  <title id="github-title">GitHub</title>
  <path d="..." />
</svg>
```

**Éléments obligatoires** :
- `aria-labelledby` → Référence le titre
- `role="img"` → Indique que c'est une image
- `<title>` avec ID unique → Nom accessible

---

## Navigation Clavier

### Palette de Commandes

- **Cmd+K** : Ouvre la palette
- **Tab** : Navigue entre les commandes
- **Enter** : Execute la commande
- **Escape** : Ferme la palette

### Focus Visible

```css
:focus-visible {
  outline: 2px solid rgb(var(--color));
  outline-offset: 2px;
}
```

**Toutes les zones interactives** ont un état focus visible.

---

## Corrections Appliquées

### Problème 1 : Listes Mal Structurées

**❌ Avant (invalide)** :
```html
<ul>
  <div x-data="{ open: false }">
    <li>Item</li>
  </div>
</ul>
```

**✅ Après (valide)** :
```html
<ul>
  <li x-data="{ open: false }">
    Item
    <div x-show="open">Tooltip</div>
  </li>
</ul>
```

### Problème 2 : Items Sans `<li>`

**❌ Avant** :
```html
<ul>
  {items.map(item => item)}
</ul>
```

**✅ Après** :
```html
<ul>
  {items.map(item => <li>{item}</li>)}
</ul>
```

---

## Alpine.js & Accessibilité

### x-cloak

```css
[x-cloak] {
  display: none !important;
}
```

Masque les éléments jusqu'à ce qu'Alpine.js soit chargé (évite le flash de contenu non stylé).

### Focus Trap

```html
<div x-show="open" x-trap.noscroll="open">
  <!-- Modal avec focus piégé -->
</div>
```

---

## HotKeyPad - Correction Accessibilité

### Problème

Les headers h4 de HotKeyPad n'avaient pas d'attribut `aria-label`.

### Solution

```typescript
document.querySelectorAll('[data-container] h4').forEach((header) => {
  if (header.textContent === 'Actions') {
    header.setAttribute('aria-label', header.textContent);
  } else if (header.textContent === 'Social') {
    header.setAttribute('aria-label', 'Social');
  }
});
```

---

## Contraste des Couleurs

### Light Mode

- Texte principal : `rgb(30, 41, 59)` sur `rgb(255, 255, 255)`
- **Ratio** : 13.5:1 ✅ (AAA)

### Dark Mode

- Texte principal : `rgb(226, 232, 240)` sur `rgb(17, 24, 39)`
- **Ratio** : 12.8:1 ✅ (AAA)

---

## Tests Accessibilité

### Outils

- **axe DevTools** (extension Chrome/Firefox)
- **WAVE** (extension)
- **Lighthouse** (Chrome DevTools)

### Commande

```bash
pnpm astro check
# Vérifie aussi les problèmes d'accessibilité de base
```

---

[← SEO & Meta Tags](11-seo.md) | [Retour à l'index](README.md) | [Sécurité →](13-securite.md)
