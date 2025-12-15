# 🔧 Utilitaires (src/utils/)

Documentation complète des fonctions utilitaires.

---

## i18n.ts - Système de Traduction

Voir [Système i18n](05-i18n.md) pour la documentation complète.

### Fonction principale : `t()`

```typescript
function t(key: string, options: { lng: Locale; [key: string]: any }): string
```

**Exemple** :
```typescript
t("sections:hero.showProfile", { lng: "fr", name: "Simon" })
// → "Voir le profil de Simon sur"
```

---

## theme.ts - Gestion des Thèmes

### Type

```typescript
export type Theme = "system" | "light" | "dark";
```

### Fonctions

#### `getSystemTheme(): "dark" | "light"`

Détecte le thème système via `prefers-color-scheme`.

```typescript
const systemTheme = getSystemTheme();
// → "dark" (si OS en dark mode)
// → "light" (si OS en light mode)
```

---

#### `getStoredTheme(): Theme | null`

Récupère le thème stocké dans localStorage.

```typescript
const stored = getStoredTheme();
if (stored) {
  console.log(`Thème enregistré: ${stored}`);
} else {
  console.log("Aucun thème enregistré");
}
```

---

#### `updateTheme(value: Theme): void`

Applique un thème et le sauvegarde.

```typescript
updateTheme("dark");
// → <html class="dark">
// → localStorage["theme"] = "dark"

updateTheme("light");
// → <html> (pas de classe)
// → localStorage["theme"] = "light"

updateTheme("system");
// → Détecte prefers-color-scheme
// → Applique dark ou light en conséquence
```

---

#### `initializeTheme(selectElement: HTMLSelectElement): void`

Initialise le thème au chargement.

```typescript
const select = document.getElementById("themeSwitch");
initializeTheme(select);
// → Lit localStorage
// → Applique le thème
// → Met à jour la valeur du select
```

---

#### `setupPrintHandlers(selectElement: HTMLSelectElement): void`

Configure les handlers pour l'impression.

```typescript
setupPrintHandlers(select);
// → Force light mode avant impression
// → Restaure le thème après impression
```

**Workflow** :
```
User appuie sur Cmd+P
    ↓
beforeprint → Force light
    ↓
Impression
    ↓
afterprint → Restaure thème original
```

---

## locale.ts - Gestion de la Langue

### Type

```typescript
export type Locale = "en" | "fr";
```

### Fonctions

#### `getStoredLocale(): Locale | null`

Récupère la langue stockée.

```typescript
const stored = getStoredLocale();
if (stored) {
  console.log(`Langue: ${stored}`);
} else {
  console.log("Aucune langue enregistrée");
}
```

---

#### `switchLocale(targetLocale: Locale): void`

Change de langue (sauvegarde + redirection).

```typescript
switchLocale("en");
// → localStorage["locale"] = "en"
// → window.location.href = "/en/"
```

**Workflow** :
```
switchLocale("en")
    ↓
Sauvegarde dans localStorage
    ↓
Redirection vers /en/
    ↓
Rechargement de la page
    ↓
Toutes les traductions en anglais
```

---

## tracking.ts - Matomo Analytics

### Fonction

#### `loadMatomoTracking(): Promise<void>`

Charge le script Matomo pour le domaine actuel.

```typescript
await loadMatomoTracking();
// → Fetch /public/tracking.json
// → Récupère le script Matomo
// → Injecte dans <head>
```

### Structure tracking.json

```json
{
  "simonchabrier.fr": {
    "script": "<script>/* Matomo tracking code */</script>"
  },
  "simonchabrier.github.io": {
    "script": "<script>/* Matomo tracking code */</script>"
  }
}
```

**⚠️ Note** : `tracking.json` est dans `.gitignore` (non versionné).

### Utilisation

```astro
<!-- Layout.astro -->
<script>
  import { loadMatomoTracking } from "@/utils/tracking";
  loadMatomoTracking();
</script>
```

---

## Utilisation Typique

### Dans un Composant Astro

```astro
---
// Import des utilitaires
import { t } from "@/utils/i18n";
import type { Locale } from "@/utils/locale";
import type { Theme } from "@/utils/theme";

const { locale } = Astro.props;

// Traduction
const title = t("sections:hero.title", { lng: locale });
---

<h1>{title}</h1>

<script>
  // Thème
  import { initializeTheme, updateTheme } from "@/utils/theme";

  const select = document.getElementById("themeSwitch");
  if (select) {
    initializeTheme(select);
    select.addEventListener("change", (e) => {
      updateTheme(e.target.value);
    });
  }
</script>
```

---

## Bonnes Pratiques

### ✅ Toujours importer les types

```typescript
import type { Locale } from "@/utils/locale";
import type { Theme } from "@/utils/theme";
```

### ✅ Utiliser async/await pour i18n

```typescript
const text = await t("sections:hero.title", { lng: "fr" });
```

### ✅ Vérifier l'existence des éléments DOM

```typescript
const select = document.getElementById("themeSwitch");
if (select) {
  initializeTheme(select);
}
```

### ✅ Gérer les erreurs

```typescript
try {
  await loadMatomoTracking();
} catch (error) {
  console.error("Erreur chargement Matomo:", error);
}
```

---

[← Composants](09-composants.md) | [Retour à l'index](README.md) | [SEO & Meta Tags →](11-seo.md)
