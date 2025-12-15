# 📝 Ajouter des Nouvelles Fonctionnalités

Guide step-by-step pour étendre le projet.

---

## 1. Ajouter une Section CV

### Étapes

**1. Ajouter les données dans le CV**

```json
// cv-fr.json et cv-en.json
{
  "basics": {...},
  "work": [...],
  "myNewSection": [
    {
      "title": "Item 1",
      "description": "Description de l'item"
    }
  ]
}
```

**2. Créer les types TypeScript**

```typescript
// src/cv.d.ts
export interface MyNewSection {
  title: string;
  description: string;
}
```

**3. Ajouter les traductions**

```json
// public/locales/fr/sections.json
{
  "myNewSection": {
    "title": "Ma Nouvelle Section"
  }
}

// public/locales/en/sections.json
{
  "myNewSection": {
    "title": "My New Section"
  }
}
```

**4. Créer le composant**

```astro
<!-- src/components/sections/MyNewSection.astro -->
---
import { t } from "@/utils/i18n";
import Section from "../Section.astro";
import type { MyNewSection } from "@cvType";

interface Props {
  data: MyNewSection[];
  locale: Locale;
}

const { data, locale } = Astro.props;
const titleText = t("sections:myNewSection.title", { lng: locale });
---

<Section title={titleText}>
  <ul>
    {data.map(({ title, description }) => (
      <li>
        <h3>{title}</h3>
        <p>{description}</p>
      </li>
    ))}
  </ul>
</Section>
```

**5. Importer dans les pages**

```astro
<!-- src/pages/fr/index.astro -->
---
import * as cv from "@cv-fr";
import MyNewSection from "@/components/sections/MyNewSection.astro";

const { myNewSection } = cv;
---

<Layout ...>
  <main>
    <Hero ... />
    <!-- Autres sections -->
    <MyNewSection data={myNewSection} locale="fr" />
  </main>
</Layout>
```

---

## 2. Ajouter une Traduction

### Workflow

**1. Identifier le namespace**

- `common` : Textes généraux (theme, locale, keyboard)
- `components` : Composants UI
- `sections` : Sections CV

**2. Ajouter dans les 2 langues**

```json
// public/locales/fr/common.json
{
  "myKey": {
    "title": "Mon Titre",
    "description": "Description avec {{variable}}"
  }
}

// public/locales/en/common.json
{
  "myKey": {
    "title": "My Title",
    "description": "Description with {{variable}}"
  }
}
```

**3. Utiliser dans un composant**

```astro
---
const title = t("common:myKey.title", { lng: locale });
const description = t("common:myKey.description", {
  lng: locale,
  variable: "valeur"
});
---

<h2>{title}</h2>
<p>{description}</p>
```

---

## 3. Ajouter une Icône SVG

### Pour un Composant Astro

**1. Créer le fichier**

```astro
<!-- src/icons/MyIcon.astro -->
<svg
  width="16"
  height="16"
  viewBox="0 0 24 24"
  aria-labelledby="myicon-title"
  role="img"
>
  <title id="myicon-title">My Icon</title>
  <path d="..." fill="currentColor" />
</svg>
```

**2. Utiliser**

```astro
---
import MyIcon from "@/icons/MyIcon.astro";
---

<MyIcon />
```

### Pour HotKeyPad (format string)

**1. Ajouter dans les constantes**

```typescript
// src/constants/social-icons-svg.ts
export const SOCIAL_ICONS_SVG = {
  GitHub: `<svg ...>...</svg>`,
  LinkedIn: `<svg ...>...</svg>`,
  MyNewIcon: `<svg width="16" height="16" viewBox="0 0 24 24">
    <title id="myicon-title">My Icon</title>
    <path d="..." fill="currentColor" />
  </svg>`
} as const;
```

**2. Utiliser dans KeyboardManager**

```astro
const icon = SOCIAL_ICONS_SVG[network]; // "MyNewIcon"
```

---

## 4. Ajouter un Nouveau Thème

### Étapes

**1. Définir les CSS variables**

```css
/* public/themes/themes.css */
.my-theme {
  --color-fill: 240, 240, 255;
  --color-text-base: 20, 20, 40;
  --color: 100, 100, 255;
  --muted: 120, 120, 140;
  /* ... autres variables */
}
```

**2. Mettre à jour le type**

```typescript
// src/utils/theme.ts
export type Theme = "system" | "light" | "dark" | "my-theme";
```

**3. Mettre à jour updateTheme**

```typescript
export function updateTheme(value: Theme): void {
  localStorage.setItem("theme", value);
  const html = document.documentElement;

  html.classList.remove("dark", "my-theme");

  if (value === "system") {
    const systemTheme = getSystemTheme();
    html.classList.toggle("dark", systemTheme === "dark");
  } else if (value === "dark") {
    html.classList.add("dark");
  } else if (value === "my-theme") {
    html.classList.add("my-theme");
  }
}
```

**4. Ajouter dans ThemeSwitch**

```astro
<select id="themeSwitch">
  <option value="system">System</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="my-theme">My Theme</option>
</select>
```

**5. Ajouter les traductions**

```json
{
  "theme": {
    "myTheme": "Mon Thème"
  }
}
```

---

## 5. Ajouter une Nouvelle Langue

### Étapes

**1. Créer les fichiers de traduction**

```bash
mkdir public/locales/es
cp public/locales/fr/* public/locales/es/
# Traduire tous les fichiers JSON en espagnol
```

**2. Créer les fichiers CV et mentions légales**

```bash
cp cv-fr.json cv-es.json
cp mentions-fr.json mentions-es.json
# Traduire le contenu en espagnol
```

**3. Mettre à jour le type Locale**

```typescript
// src/types.d.ts
export type Locale = "en" | "fr" | "es";
```

**4. Ajouter dans astro.config.mjs**

```javascript
i18n: {
  defaultLocale: "fr",
  locales: ["fr", "en", "es"],
  routing: {
    prefixDefaultLocale: true
  }
}
```

**5. Créer la page**

```bash
mkdir src/pages/es
cp src/pages/fr/index.astro src/pages/es/index.astro
```

Modifier :
```astro
---
import * as cv from "@cv-es";
import * as legal from "@mentions-es";
---

<Layout locale="es" ...>
  <Hero locale="es" ... />
  <!-- etc. -->
</Layout>
```

**6. Ajouter dans LocaleSwitch**

```astro
<select id="localeSwitch">
  <option value="fr">🇫🇷 Français</option>
  <option value="en">🇬🇧 English</option>
  <option value="es">🇪🇸 Español</option>
</select>
```

**7. Créer le drapeau**

```astro
<!-- src/icons/FlagEs.astro -->
<svg>
  <!-- SVG du drapeau espagnol -->
</svg>
```

---

## 6. Ajouter une Commande HotKeyPad

```astro
<!-- KeyboardManager.astro -->
<script>
  hotkeypad.setCommands([
    {
      id: "print",
      title: "Imprimer",
      icon: "...",
      hotkey: "ctrl+P",
      section: "Actions",
      handler: () => window.print()
    },
    {
      id: "my-command",
      title: "Ma Commande",
      icon: `<svg>...</svg>`,
      hotkey: "ctrl+M",
      section: "Actions",
      handler: () => {
        // Action custom
        alert("Hello!");
      }
    },
    ...data
  ]);
</script>
```

---

[← Build & Déploiement](14-build-deploiement.md) | [Retour à l'index](README.md) | [Debugging →](16-debugging.md)
