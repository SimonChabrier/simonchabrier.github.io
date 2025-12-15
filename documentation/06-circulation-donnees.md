# 🔄 Circulation des Données

## Vue d'ensemble

Ce document explique comment les données circulent dans mon application, de leur source jusqu'à l'affichage final.

---

## 1. Chargement Initial de la Page

### Flux Complet

```
Utilisateur visite le site
         ↓
/fr/ ou /en/ (ou redirection depuis /)
         ↓
src/pages/[locale]/index.astro
         ↓
Import des données (CV + Mentions légales)
         ↓
Passage aux composants via props
         ↓
Rendu HTML statique (SSG)
         ↓
Envoi au navigateur
```

### Détail Étape par Étape

#### Étape 1 : URL

L'utilisateur visite :
- `https://simonchabrier.fr/` → Redirigé vers `/fr/` ou `/en/`
- `https://simonchabrier.fr/fr/` → Page française
- `https://simonchabrier.fr/en/` → Page anglaise

#### Étape 2 : Page Astro

```astro
---
// src/pages/fr/index.astro
import * as cv from "@cv-fr";
import * as legal from "@mentions-fr";
import Layout from "@/layouts/Layout.astro";
import Hero from "@/components/sections/Hero.astro";
// ... autres imports

const { basics, work, education, skills, projects } = cv;
---
```

**Ce qui se passe** :
- Astro charge les fichiers JSON au moment du build
- Les données sont disponibles immédiatement (pas de fetch)
- TypeScript vérifie les types

#### Étape 3 : Layout

```astro
<Layout
  title={`${basics.name} - ${basics.label}`}
  image={basics.image}
  summary={basics.summary}
  theme="system"
  locale="fr"
>
  <main>
    <!-- Sections ici -->
  </main>
</Layout>
```

**Ce qui se passe** :
- Layout reçoit les props pour les meta tags
- Génère `<head>` avec SEO
- Charge les styles et scripts

#### Étape 4 : Composants Sections

```astro
<Hero basics={basics} locale="fr" />
<About about={basics.summary} locale="fr" />
<Experience work={work} locale="fr" />
<Skills skills={skills} locale="fr" />
```

**Ce qui se passe** :
- Chaque composant reçoit ses données spécifiques
- Le prop `locale` permet de charger les traductions
- Rendu HTML statique

---

## 2. Flux de Traduction (i18n)

### Schéma

```
Composant (Hero.astro)
       ↓
t("sections:hero.showProfile", { lng: "fr", name: "Simon" })
       ↓
src/utils/i18n.ts
       ↓
Charge public/locales/fr/sections.json (avec cache)
       ↓
Navigate dans l'objet: sections.hero.showProfile
       ↓
Récupère: "Voir le profil de {{name}} sur"
       ↓
Interpole {{name}} → "Simon"
       ↓
Retourne: "Voir le profil de Simon sur"
```

### Exemple Concret

```astro
---
// src/components/sections/Hero.astro
import { t } from "@/utils/i18n";

const { basics, locale } = Astro.props;

const showProfileText = t("sections:hero.showProfile", {
  lng: locale,
  name: basics.name
});
// → "Voir le profil de Simon sur" (si locale="fr")
---

<a
  href={basics.profiles[0].url}
  aria-label={`${showProfileText} ${basics.profiles[0].network}`}
>
  {showProfileText} {basics.profiles[0].network}
</a>
```

**Résultat HTML** :
```html
<a href="https://github.com/simonchabrier"
   aria-label="Voir le profil de Simon sur GitHub">
  Voir le profil de Simon sur GitHub
</a>
```

---

## 3. Flux de Thème

### Schéma

```
Page Load
    ↓
Hero.astro / ThemeSwitch.astro
    ↓
initializeTheme(select) [theme.ts]
    ↓
Check localStorage.getItem("theme")
    ↓
┌─────────────────┬─────────────────┐
│ null            │ "light" / "dark" │
│ (1ère visite)   │ (déjà visité)    │
└─────────────────┴─────────────────┘
    ↓                     ↓
getSystemTheme()    Utilise la valeur stockée
    ↓                     ↓
"light" ou "dark"    "light" ou "dark"
    ↓                     ↓
    └────────┬────────────┘
             ↓
Applique classe sur <html>:
- Pas de classe → light
- class="dark" → dark
             ↓
CSS variables de public/themes/themes.css
s'appliquent automatiquement
             ↓
Tailwind utilise ces variables
via classes skin-*
```

### Code Détaillé

#### 1. Initialisation au Chargement

```astro
<!-- Hero.astro -->
<script>
  import { initializeTheme, setupPrintHandlers } from "@/utils/theme";

  const select = document.getElementById("themeSwitch");
  if (select) {
    initializeTheme(select);
    setupPrintHandlers(select);
  }
</script>
```

#### 2. Fonction initializeTheme

```typescript
// src/utils/theme.ts
export function initializeTheme(selectElement: HTMLSelectElement): void {
  const stored = getStoredTheme(); // localStorage.getItem("theme")

  if (stored) {
    // Utilise le thème stocké
    selectElement.value = stored;
    updateTheme(stored);
  } else {
    // 1ère visite : utilise le thème système
    selectElement.value = "system";
    updateTheme("system");
  }
}
```

#### 3. Fonction updateTheme

```typescript
export function updateTheme(value: Theme): void {
  localStorage.setItem("theme", value);

  const html = document.documentElement;

  if (value === "system") {
    const systemTheme = getSystemTheme(); // prefers-color-scheme
    html.classList.toggle("dark", systemTheme === "dark");
  } else {
    html.classList.toggle("dark", value === "dark");
  }
}
```

#### 4. Application des Styles

```css
/* public/themes/themes.css */
:root {
  --color-fill: 255, 255, 255;  /* Blanc */
  --color-text-base: 30, 41, 59;
}

.dark {
  --color-fill: 17, 24, 39;  /* Gris foncé */
  --color-text-base: 226, 232, 240;
}
```

```html
<!-- Tailwind utilise automatiquement la bonne variable -->
<div class="bg-skin-fill text-skin-base">
  <!-- Blanc/noir en light, gris foncé/clair en dark -->
</div>
```

---

## 4. Flux de Changement de Langue

### Schéma

```
User clique sur LocaleSwitch (select)
             ↓
Event "change" sur <select>
             ↓
switchLocale(targetLocale) [locale.ts]
             ↓
localStorage.setItem("locale", targetLocale)
             ↓
window.location.href = `/${targetLocale}/`
             ↓
Rechargement de la page avec nouvelle locale
             ↓
Toutes les traductions sont dans la nouvelle langue
```

### Code Détaillé

#### 1. Composant LocaleSwitch

```astro
<!-- src/components/LocaleSwitch.astro -->
<select id="localeSwitch">
  <option value="fr" selected={locale === "fr"}>🇫🇷 Français</option>
  <option value="en" selected={locale === "en"}>🇬🇧 English</option>
</select>

<script>
  import { switchLocale } from "@/utils/locale";

  const select = document.getElementById("localeSwitch");

  select?.addEventListener("change", function() {
    switchLocale(this.value);
  });
</script>
```

#### 2. Fonction switchLocale

```typescript
// src/utils/locale.ts
export function switchLocale(targetLocale: Locale): void {
  // Sauvegarde la préférence
  localStorage.setItem("locale", targetLocale);

  // Redirige vers la nouvelle URL
  window.location.href = `/${targetLocale}/`;
}
```

#### 3. Page de Redirection

```astro
<!-- src/pages/index.astro -->
---
// Vérifie localStorage pour rediriger automatiquement
---

<script>
  const stored = localStorage.getItem("locale");

  if (stored && ["fr", "en"].includes(stored)) {
    window.location.href = `/${stored}/`;
  } else {
    // Détecte la langue du navigateur
    const browserLang = navigator.language.split("-")[0];
    window.location.href = browserLang === "en" ? "/en/" : "/fr/";
  }
</script>
```

---

## 5. Flux de la Palette de Commandes (HotKeyPad)

### Schéma

```
Page Load
    ↓
KeyboardManager.astro charge
    ↓
Génère profilesInfo avec icônes SVG (string)
    ↓
Stocke dans data-info attribute
    ↓
Script client récupère data-info
    ↓
Parse JSON → Array d'objets Info
    ↓
Crée commands avec handlers
    ↓
hotkeypad.setCommands([...])
    ↓
User appuie sur Cmd+K
    ↓
Palette s'ouvre (HotKeyPad)
    ↓
User clique sur "GitHub"
    ↓
handler() → window.open(url, "_blank")
```

### Code Détaillé

#### 1. Génération des Commandes (côté serveur)

```astro
---
// src/components/KeyboardManager.astro
import { SOCIAL_ICONS_SVG } from "@/constants/social-icons-svg";

const profilesInfo = profiles.map(({ network, url }) => {
  const icon = SOCIAL_ICONS_SVG[network];
  const firstLetter = network[0].toUpperCase();

  return {
    id: network,
    section: "Social",
    title: network,
    url,
    icon,
    hotkey: `ctrl+${firstLetter}`
  };
});
---

<div id="hotkeypad" data-info={JSON.stringify(profilesInfo)}></div>
```

#### 2. Initialisation HotKeyPad (côté client)

```typescript
<script>
  import HotKeyPad from "hotkeypad";

  const hotkeypad = new HotKeyPad({
    placeholder: "Search..."
  });

  // Récupère les données du serveur
  const info = hotkeypad.instance.getAttribute("data-info") ?? "[]";
  const parsedInfo = JSON.parse(info);

  // Transforme en commands avec handlers
  const data = parsedInfo.map(({ url, hotkey, icon, id, title, section }) => {
    return {
      id,
      title,
      icon,
      hotkey,
      section,
      handler: () => {
        window.open(url, "_blank");
      }
    };
  });

  // Configure HotKeyPad
  hotkeypad.setCommands([
    {
      id: "print",
      title: "Imprimer",
      icon: "...",
      hotkey: "ctrl+P",
      section: "Actions",
      handler: () => window.print()
    },
    ...data
  ]);
</script>
```

---

## 6. Flux des Props entre Composants

### Schéma Hiérarchique

```
pages/fr/index.astro
    ├─ basics, work, skills, ...
    │
    ├─→ Layout.astro
    │    ├─ title
    │    ├─ image
    │    ├─ summary
    │    └─ locale
    │
    ├─→ Hero.astro
    │    ├─ basics (complet)
    │    └─ locale
    │
    ├─→ Experience.astro
    │    ├─ work (array)
    │    └─ locale
    │
    ├─→ Skills.astro
    │    ├─ skills (array)
    │    └─ locale
    │
    └─→ KeyboardManager.astro
         ├─ profiles (basics.profiles)
         └─ locale
```

### Flux Type-Safe

```astro
---
// Page
import type { Basics, Work, Skills } from "@cvType";

const basics: Basics = cv.basics;
const work: Work[] = cv.work;
const skills: Skills[] = cv.skills;
---

<Hero basics={basics} locale="fr" />
<!-- TypeScript vérifie que basics est bien de type Basics -->

<Experience work={work} locale="fr" />
<!-- TypeScript vérifie que work est bien de type Work[] -->
```

---

## 7. Flux de Chargement des Assets

### Images

```
cv-fr.json: "image": "./../avatar_254.webp"
             ↓
Import dans pages/fr/index.astro
             ↓
Passage à Layout.astro
             ↓
Nettoyage du chemin:
image.replace(/^(\.\.\/|\.\/)+/, '/')
             ↓
"/avatar_254.webp"
             ↓
URL absolue:
"https://simonchabrier.fr/avatar_254.webp"
             ↓
Utilisé dans:
- <img src={image} />
- <meta property="og:image" content={url} />
```

### CSS Thèmes

```
Layout.astro
    ↓
<link rel="preload" href="/themes/themes.css"
      as="style"
      onload="this.rel='stylesheet';" />
    ↓
Chargement asynchrone (n'bloque pas le rendu)
    ↓
CSS variables disponibles
    ↓
Tailwind les utilise via classes skin-*
```

### Traductions

```
Composant appelle t("sections:hero.title", { lng: "fr" })
             ↓
i18n.ts vérifie le cache
             ↓
Cache miss → import(`/public/locales/fr/sections.json`)
             ↓
Stocke dans translationsCache["fr-sections"]
             ↓
Retourne la valeur
             ↓
Prochains appels utilisent le cache (rapide)
```

---

## Résumé des Flux Principaux

| Flux | Déclencheur | Résultat |
|------|-------------|----------|
| **Chargement initial** | URL visitée | HTML statique généré et envoyé |
| **Traduction** | Appel `t()` | String traduite avec interpolation |
| **Thème** | Changement select | Classe dark ajoutée/retirée sur `<html>` |
| **Langue** | Changement select | Redirection vers `/[locale]/` |
| **Palette** | Cmd+K | Modale s'ouvre, commandes cliquables |
| **Props** | Render composant | Données passées du parent aux enfants |

---

[← Système i18n](05-i18n.md) | [Retour à l'index](README.md) | [Système de Thèmes →](07-themes.md)
