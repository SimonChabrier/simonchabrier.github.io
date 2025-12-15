# 🎨 Styling & CSS

## Vue d'ensemble

J'utilise **Tailwind CSS** avec une approche utility-first combinée à des **CSS variables** pour les thèmes dynamiques.

---

## Configuration Tailwind

**Fichier** : `tailwind.config.mjs`

```javascript
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class", // Utilise la classe .dark sur <html>
  theme: {
    extend: {
      colors: {
        skin: {
          fill: "rgb(var(--color-fill))",
          base: "rgb(var(--color-text-base))",
          inverted: "rgb(var(--color-fill-inverted))",
          muted: "rgb(var(--muted))",
          hue: "rgb(var(--color))",
          contact: "rgb(var(--skin-contact))",
          contactInverted: "rgb(var(--skin-contact-inverted))",
          "button-accent": "rgb(var(--skin-button-accent))",
          "button-muted": "rgb(var(--skin-button-muted))",
        }
      }
    }
  },
  plugins: []
}
```

---

## Classes Custom Principales

### Couleurs Adaptatives (skin-*)

```html
<!-- Fond et texte de base -->
<div class="bg-skin-fill text-skin-base">
  Contenu adaptatif light/dark
</div>

<!-- Couleur primaire -->
<button class="bg-skin-hue text-skin-inverted">
  Bouton primaire
</button>

<!-- Texte secondaire -->
<p class="text-skin-muted">
  Informations secondaires
</p>

<!-- Contacts -->
<a class="text-skin-contact hover:text-skin-contact/80">
  Lien de contact
</a>

<!-- Boutons -->
<button class="bg-skin-button-accent hover:bg-skin-button-muted">
  Bouton secondaire
</button>
```

### Opacité

Tailwind permet d'ajouter de l'opacité avec `/` :

```html
<div class="bg-skin-fill/80">80% opacité</div>
<div class="bg-skin-hue/50">50% opacité</div>
<div class="text-skin-base/60">60% opacité</div>
```

---

## Mode Impression

### Classes `.no-print`

```css
/* Intégré dans Tailwind config */
@media print {
  .no-print {
    display: none !important;
  }
}
```

**Utilisation** :
```html
<!-- Masqué à l'impression -->
<footer class="no-print">
  <button>Imprimer</button>
</footer>

<!-- Ou avec les classes Tailwind natives -->
<div class="print:hidden">
  Masqué à l'impression
</div>
```

### Adaptations Print

```html
<!-- Layout différent en impression -->
<div class="grid grid-cols-2 print:grid-cols-1">
  <!-- 2 colonnes → 1 colonne en print -->
</div>

<!-- Simplification des styles -->
<div class="bg-skin-hue p-4 print:bg-transparent print:p-0">
  <!-- Supprime fond et padding en print -->
</div>

<!-- Marges réduites -->
<section class="mb-8 print:mb-2">
  <!-- Espacement réduit en print -->
</section>
```

---

## Exemples de Patterns

### Card/Section

```html
<section class="bg-skin-fill border border-skin-muted rounded-lg p-6 shadow-sm">
  <h2 class="text-2xl font-bold text-skin-base mb-4">
    Titre de Section
  </h2>
  <p class="text-skin-muted">
    Contenu de la section
  </p>
</section>
```

### Bouton Primaire

```html
<button class="
  bg-skin-hue
  hover:bg-skin-hue/80
  text-skin-inverted
  font-medium
  px-4 py-2
  rounded-md
  transition-colors
">
  Cliquez ici
</button>
```

### Lien avec Icône

```html
<a href="#" class="
  inline-flex
  items-center
  gap-2
  text-skin-contact
  hover:text-skin-contact/80
  transition-colors
">
  <svg class="size-5">...</svg>
  <span>Texte du lien</span>
</a>
```

### Badge de Compétence

```html
<span class="
  inline-flex
  items-center
  gap-1
  bg-skin-button-accent
  px-2 py-0.5
  rounded-md
  text-xs
  text-skin-base
  print:border-none
  print:bg-transparent
">
  React
</span>
```

---

## Responsive Design

### Breakpoints Tailwind

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Exemples

```html
<!-- Stack mobile, grid desktop -->
<div class="flex flex-col md:grid md:grid-cols-2 gap-4">
  <div>Colonne 1</div>
  <div>Colonne 2</div>
</div>

<!-- Taille de texte responsive -->
<h1 class="text-2xl md:text-4xl lg:text-5xl">
  Titre responsive
</h1>

<!-- Padding responsive -->
<div class="p-4 md:p-6 lg:p-8">
  Padding adaptatif
</div>

<!-- Masquer sur mobile -->
<div class="hidden md:block">
  Visible uniquement sur desktop
</div>
```

---

## Animations & Transitions

### Transitions

```html
<!-- Transition de couleur -->
<button class="bg-skin-hue hover:bg-skin-hue/80 transition-colors">
  Hover me
</button>

<!-- Transition complète -->
<div class="opacity-0 hover:opacity-100 transition-all duration-300">
  Apparaît au survol
</div>

<!-- Transform -->
<div class="transform hover:scale-105 transition-transform">
  Grossit au survol
</div>
```

### Animations Custom

**Fichier** : `src/components/sections/Hero.astro`

```css
<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  footer {
    animation: linear 0.3s fadeIn;
    animation-timeline: --revealing;
    animation-range: entry 100% cover 10%;
  }
</style>
```

---

## Alpine.js & Tailwind

### x-cloak

Masque les éléments jusqu'à ce qu'Alpine.js soit chargé :

```html
<style>
  [x-cloak] {
    display: none !important;
  }
</style>

<div x-show="open" x-cloak>
  <!-- Masqué jusqu'à Alpine.js ready -->
</div>
```

### Directives Alpine

```html
<!-- Show/Hide -->
<div x-show="expanded" x-collapse>
  Contenu expandable
</div>

<!-- Binding de classe -->
<div :class="open ? 'bg-skin-hue' : 'bg-skin-muted'">
  Classe dynamique
</div>

<!-- Text binding -->
<span x-text="open ? 'Fermer' : 'Ouvrir'"></span>
```

---

## CSS Global Custom

### Layout.astro

```css
<style is:global>
  /* Scroll smooth -->
  html {
    scroll-behavior: smooth;
  }

  /* Sélection de texte -->
  ::selection {
    background-color: rgb(var(--color));
    color: white;
  }

  /* Focus visible -->
  :focus-visible {
    outline: 2px solid rgb(var(--color));
    outline-offset: 2px;
  }
</style>
```

---

## HotKeyPad Custom Styles

**Fichier** : `src/components/KeyboardManager.astro`

```css
<style>
  #hotkeypad {
    --hotkeypad-bg-kbd: rgb(var(--muted));
    --hotkeypad-bg-backdrop: rgb(var(--color-fill));
    --hotkeypad-bg-container: rgb(var(--color-fill));
    --hotkeypad-bg-item-hover: rgba(var(--color-text), 20%);
    --hotkeypad-border-container: rgb(var(--muted));
    --hotkeypad-fg-muted: rgb(var(--muted));
  }

  @media (prefers-color-scheme: dark) {
    #hotkeypad {
      --hotkeypad-bg-item-hover: rgba(var(--color), 10%);
      --hotkeypad-fg-muted: rgb(var(--color-text-base));
    }
  }
</style>
```

---

## Bonnes Pratiques

### ✅ Utiliser les classes skin-* pour les couleurs

```html
<!-- ✅ Bon -->
<div class="bg-skin-fill text-skin-base">

<!-- ❌ Mauvais -->
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
```

### ✅ Préférer Tailwind aux styles custom

```html
<!-- ✅ Bon -->
<div class="flex items-center gap-2 p-4">

<!-- ❌ Mauvais -->
<div style="display: flex; align-items: center; gap: 0.5rem; padding: 1rem;">
```

### ✅ Grouper les classes logiquement

```html
<!-- ✅ Bon : Layout → Spacing → Colors → States -->
<button class="
  flex items-center gap-2
  px-4 py-2 rounded-md
  bg-skin-hue text-skin-inverted
  hover:bg-skin-hue/80 transition-colors
">

<!-- ❌ Mauvais : Classes mélangées -->
<button class="bg-skin-hue flex px-4 hover:bg-skin-hue/80 items-center py-2">
```

### ✅ Utiliser @apply avec parcimonie

Je **n'utilise presque jamais** `@apply` car je préfère les classes Tailwind directement dans le HTML.

**Exception acceptable** :
```css
.tooltip {
  @apply absolute left-1/2 top-full -translate-x-1/2;
  @apply mt-1 rounded bg-white p-2 shadow;
}
```

---

[← Système de Thèmes](07-themes.md) | [Retour à l'index](README.md) | [Composants →](09-composants.md)
