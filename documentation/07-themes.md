# 🎨 Système de Thèmes

## Vue d'ensemble

Mon portfolio supporte 3 modes de thème :
- **System** - Suit les préférences système (prefers-color-scheme)
- **Light** - Mode clair
- **Dark** - Mode sombre

Le système utilise des **CSS variables** dynamiques et une **classe `.dark`** sur `<html>`.

---

## Architecture

### CSS Variables

**Fichier** : `public/themes/themes.css`

```css
:root {
  /* Light Mode (par défaut) */
  --color-fill: 255, 255, 255;           /* Blanc */
  --color-fill-inverted: 30, 41, 59;     /* Texte inversé */
  --color-text-base: 30, 41, 59;         /* Texte principal */
  --muted: 148, 163, 184;                /* Texte secondaire */
  --color: 79, 70, 229;                  /* Couleur primaire (indigo) */

  --skin-contact: 79, 70, 229;           /* Icônes de contact */
  --skin-contact-inverted: 255, 255, 255;
  --skin-button-accent: 226, 232, 240;   /* Boutons */
  --skin-button-muted: 241, 245, 249;
}

.dark {
  /* Dark Mode */
  --color-fill: 17, 24, 39;              /* Gris foncé */
  --color-fill-inverted: 226, 232, 240;  /* Texte inversé */
  --color-text-base: 226, 232, 240;      /* Texte clair */
  --muted: 148, 163, 184;                /* Texte secondaire */
  --color: 129, 140, 248;                /* Accent lumineux */

  --skin-contact: 129, 140, 248;
  --skin-contact-inverted: 17, 24, 39;
  --skin-button-accent: 31, 41, 55;
  --skin-button-muted: 55, 65, 81;
}
```

**Format RGB sans `rgb()`** : J'utilise des valeurs RGB séparées (ex: `255, 255, 255`) pour pouvoir ajouter de l'opacité avec Tailwind :

```html
<!-- bg-skin-fill avec opacité -->
<div class="bg-skin-fill/80">  <!-- 80% d'opacité -->
```

---

## Intégration avec Tailwind

### Configuration

**Fichier** : `tailwind.config.mjs`

```javascript
export default {
  theme: {
    extend: {
      colors: {
        skin: {
          // Couleurs de base
          fill: "rgb(var(--color-fill))",
          base: "rgb(var(--color-text-base))",
          inverted: "rgb(var(--color-fill-inverted))",
          muted: "rgb(var(--muted))",

          // Couleur d'accent
          hue: "rgb(var(--color))",

          // Contacts
          contact: "rgb(var(--skin-contact))",
          contactInverted: "rgb(var(--skin-contact-inverted))",

          // Boutons
          "button-accent": "rgb(var(--skin-button-accent))",
          "button-muted": "rgb(var(--skin-button-muted))",
        }
      }
    }
  }
}
```

### Utilisation dans les Composants

```html
<!-- Fond adaptatif light/dark -->
<div class="bg-skin-fill text-skin-base">
  Contenu qui s'adapte automatiquement
</div>

<!-- Bouton avec couleur primaire -->
<button class="bg-skin-hue hover:bg-skin-hue/80 text-skin-inverted">
  Cliquez ici
</button>

<!-- Texte secondaire -->
<p class="text-skin-muted">
  Informations secondaires
</p>

<!-- Avec opacité -->
<div class="bg-skin-button-accent/50">
  Fond semi-transparent
</div>
```

---

## Gestion du Thème (theme.ts)

### Type Theme

```typescript
export type Theme = "system" | "light" | "dark";
```

### Fonctions Exportées

#### `getSystemTheme()`

Détecte le thème système via `prefers-color-scheme` :

```typescript
export function getSystemTheme(): "dark" | "light" {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}
```

**Utilisation** :
```typescript
const systemTheme = getSystemTheme();
// → "dark" ou "light" selon les préférences OS
```

---

#### `getStoredTheme()`

Récupère le thème stocké dans localStorage :

```typescript
export function getStoredTheme(): Theme | null {
  const stored = localStorage.getItem("theme");
  if (stored && ["system", "light", "dark"].includes(stored)) {
    return stored as Theme;
  }
  return null;
}
```

**Utilisation** :
```typescript
const stored = getStoredTheme();
if (stored) {
  // L'utilisateur a déjà choisi un thème
  console.log(`Thème stocké: ${stored}`);
} else {
  // 1ère visite
  console.log("Aucun thème stocké");
}
```

---

#### `updateTheme(value)`

Applique un thème et le sauvegarde :

```typescript
export function updateTheme(value: Theme): void {
  localStorage.setItem("theme", value);

  const html = document.documentElement;

  if (value === "system") {
    const systemTheme = getSystemTheme();
    html.classList.toggle("dark", systemTheme === "dark");
  } else {
    html.classList.toggle("dark", value === "dark");
  }
}
```

**Ce qui se passe** :
1. Sauvegarde dans localStorage
2. Récupère l'élément `<html>`
3. Ajoute ou retire la classe `.dark` selon le thème

**Exemple** :
```typescript
updateTheme("dark");
// → <html class="dark">
// → localStorage["theme"] = "dark"

updateTheme("light");
// → <html> (pas de classe)
// → localStorage["theme"] = "light"

updateTheme("system");
// → Vérifie prefers-color-scheme
// → Applique dark ou light en conséquence
```

---

#### `initializeTheme(selectElement)`

Initialise le thème au chargement de la page :

```typescript
export function initializeTheme(selectElement: HTMLSelectElement): void {
  const stored = getStoredTheme();

  if (stored) {
    selectElement.value = stored;
    updateTheme(stored);
  } else {
    selectElement.value = "system";
    updateTheme("system");
  }
}
```

**Workflow** :
```
Page Load
    ↓
Check localStorage["theme"]
    ↓
┌─────────────┬──────────────┐
│ Existe      │ N'existe pas │
└─────────────┴──────────────┘
    ↓                ↓
Utilise la      Utilise "system"
valeur stockée      par défaut
    ↓                ↓
updateTheme()   updateTheme()
```

---

#### `setupPrintHandlers(selectElement)`

Configure les handlers pour l'impression :

```typescript
export function setupPrintHandlers(selectElement: HTMLSelectElement): void {
  let previousTheme: Theme | null = null;

  window.addEventListener("beforeprint", () => {
    previousTheme = selectElement.value as Theme;
    updateTheme("light");  // Force light mode pour l'impression
  });

  window.addEventListener("afterprint", () => {
    if (previousTheme) {
      updateTheme(previousTheme);  // Restore le thème précédent
    }
  });
}
```

**Raison** : Le mode dark n'est pas optimal pour l'impression (gaspillage d'encre).

**Workflow** :
```
User appuie sur Cmd+P
        ↓
beforeprint event
        ↓
Sauvegarde le thème actuel
        ↓
Force light mode
        ↓
Impression avec fond blanc
        ↓
afterprint event
        ↓
Restore le thème original
```

---

## Composants de Sélection

### ThemeSwitch.astro

```astro
---
import { t } from "@/utils/i18n";

const { locale } = Astro.props;

const labelText = t("common:theme.label", { lng: locale });
const systemText = t("common:theme.system", { lng: locale });
const lightText = t("common:theme.light", { lng: locale });
const darkText = t("common:theme.dark", { lng: locale });
---

<div>
  <label for="themeSwitch">{labelText}</label>
  <select id="themeSwitch">
    <option value="system">{systemText}</option>
    <option value="light">{lightText}</option>
    <option value="dark">{darkText}</option>
  </select>
</div>

<script>
  import { initializeTheme, updateTheme } from "@/utils/theme";
  import type { Theme } from "@/utils/theme";

  const select = document.getElementById("themeSwitch") as HTMLSelectElement;

  if (select) {
    // Initialise au chargement
    initializeTheme(select);

    // Écoute les changements
    select.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLSelectElement;
      updateTheme(target.value as Theme);
    });
  }
</script>
```

### Hero.astro (aussi responsable du thème)

```astro
<script>
  import {
    initializeTheme,
    updateTheme,
    setupPrintHandlers
  } from "@/utils/theme";
  import type { Theme } from "@/utils/theme";

  const select = document.getElementById("themeSwitch") as HTMLSelectElement;

  if (select) {
    initializeTheme(select);
    setupPrintHandlers(select);

    select.addEventListener("change", (event: Event) => {
      updateTheme((event.target as HTMLSelectElement).value as Theme);
    });
  }
</script>
```

**Note** : Le script est dupliqué dans Hero et ThemeSwitch pour s'assurer que le thème fonctionne même si un des composants n'est pas rendu.

---

## Cas d'Usage

### 1. Première Visite

```
User visite le site (1ère fois)
        ↓
localStorage["theme"] n'existe pas
        ↓
initializeTheme() utilise "system"
        ↓
getSystemTheme() vérifie prefers-color-scheme
        ↓
Si OS en dark mode → Applique .dark
Si OS en light mode → Pas de classe
```

### 2. Changement Manuel

```
User change le select à "dark"
        ↓
Event "change"
        ↓
updateTheme("dark")
        ↓
localStorage["theme"] = "dark"
        ↓
<html class="dark">
        ↓
CSS variables du .dark s'appliquent
```

### 3. Visite Suivante

```
User revient sur le site
        ↓
localStorage["theme"] = "dark" (existe)
        ↓
initializeTheme() utilise la valeur stockée
        ↓
updateTheme("dark")
        ↓
<html class="dark">
        ↓
Thème restauré automatiquement
```

### 4. Mode System avec Changement OS

```
User a choisi "system"
        ↓
OS passe en dark mode
        ↓
prefers-color-scheme: dark
        ↓
Page rechargée ou système écoute le changement
        ↓
getSystemTheme() retourne "dark"
        ↓
<html class="dark">
```

**Note** : Actuellement, le changement OS en temps réel n'est pas géré. Il faut recharger la page.

---

## Ajout d'un Nouveau Thème Custom

### 1. Définir les CSS Variables

```css
/* public/themes/themes.css */
.my-custom-theme {
  --color-fill: 240, 240, 255;        /* Fond bleuté */
  --color-text-base: 20, 20, 40;      /* Texte bleu foncé */
  --color: 100, 100, 255;             /* Accent bleu */
  /* ... autres variables */
}
```

### 2. Mettre à Jour le Type

```typescript
// src/utils/theme.ts
export type Theme = "system" | "light" | "dark" | "my-custom";
```

### 3. Mettre à Jour updateTheme

```typescript
export function updateTheme(value: Theme): void {
  localStorage.setItem("theme", value);
  const html = document.documentElement;

  // Retire toutes les classes de thème
  html.classList.remove("dark", "my-custom-theme");

  if (value === "system") {
    const systemTheme = getSystemTheme();
    html.classList.toggle("dark", systemTheme === "dark");
  } else if (value === "dark") {
    html.classList.add("dark");
  } else if (value === "my-custom") {
    html.classList.add("my-custom-theme");
  }
  // "light" = pas de classe
}
```

### 4. Ajouter dans ThemeSwitch

```astro
<select id="themeSwitch">
  <option value="system">System</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="my-custom">My Custom</option>
</select>
```

### 5. Ajouter les Traductions

```json
// public/locales/fr/common.json
{
  "theme": {
    "label": "Thème",
    "system": "Système",
    "light": "Clair",
    "dark": "Sombre",
    "myCustom": "Mon Thème"
  }
}
```

---

## Debugging

### Vérifier le Thème Actuel

```javascript
// Dans la console du navigateur
localStorage.getItem("theme")
// → "light" | "dark" | "system" | null

document.documentElement.className
// → "" (light) | "dark" (dark)
```

### Forcer un Thème

```javascript
// Dans la console
import { updateTheme } from "@/utils/theme";
updateTheme("dark");  // Force dark mode
```

### Tester prefers-color-scheme

```javascript
window.matchMedia("(prefers-color-scheme: dark)").matches
// → true (OS en dark) | false (OS en light)
```

---

## Bonnes Pratiques

### ✅ Toujours utiliser les classes skin-*

```html
<!-- ✅ Bon : S'adapte automatiquement -->
<div class="bg-skin-fill text-skin-base">

<!-- ❌ Mauvais : Couleurs hardcodées -->
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
```

### ✅ Tester les deux modes

Avant de déployer, je vérifie que tous les composants sont lisibles en light ET dark mode.

### ✅ Utiliser des couleurs sémantiques

```css
/* ✅ Bon : Noms sémantiques */
--color-fill: ...;        /* Fond */
--color-text-base: ...;   /* Texte */

/* ❌ Mauvais : Noms de couleurs */
--white: ...;
--black: ...;
```

---

[← Circulation des Données](06-circulation-donnees.md) | [Retour à l'index](README.md) | [Styling & CSS →](08-styling.md)
