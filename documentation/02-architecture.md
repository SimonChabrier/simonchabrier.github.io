# 📁 Architecture des Fichiers

## Structure Complète du Projet

```
/
├── public/                      # Assets statiques servis tels quels
│   ├── locales/                # Fichiers de traduction JSON
│   │   ├── en/
│   │   │   ├── common.json     # Traductions communes (theme, locale, keyboard)
│   │   │   ├── components.json # Traductions des composants
│   │   │   └── sections.json   # Traductions des sections
│   │   └── fr/                 # Même structure pour le français
│   ├── themes/
│   │   └── themes.css          # Définition des CSS variables pour les thèmes
│   ├── tracking.json           # Configuration Matomo (non versionné)
│   ├── avatar_254.webp         # Photo de profil 256x256
│   └── avatar_128.webp         # Photo de profil 128x128
│
├── src/
│   ├── components/             # Composants Astro réutilisables
│   │   ├── sections/           # Sections principales du CV
│   │   │   ├── About.astro     # Section "À propos"
│   │   │   ├── Hero.astro      # Hero avec photo et contacts
│   │   │   ├── Experience.astro # Expériences professionnelles
│   │   │   ├── Projects.astro  # Exemples de projets
│   │   │   ├── Skills.astro    # Compétences techniques
│   │   │   ├── Education.astro # Formation et certificats
│   │   │   └── Tail.astro      # Footer avec profil GitHub
│   │   ├── Dialog.astro        # Modale mentions légales
│   │   ├── Section.astro       # Wrapper de section avec titre
│   │   ├── ThemeSwitch.astro   # Sélecteur de thème
│   │   ├── LocaleSwitch.astro  # Sélecteur de langue
│   │   └── KeyboardManager.astro # Gestion palette de commandes
│   │
│   ├── icons/                  # Icônes SVG (23 fichiers)
│   │   ├── html.astro, css.astro, javascript.astro, ...
│   │   ├── GitHub.astro, LinkedIn.astro, Phone.astro, Mail.astro
│   │   ├── FlagFr.astro, FlagEn.astro
│   │   └── themeSwitch.astro, WorldMap.astro, Arrow.astro
│   │
│   ├── layouts/
│   │   └── Layout.astro        # Layout principal avec <head>, SEO, etc.
│   │
│   ├── pages/                  # Routes du site
│   │   ├── index.astro         # Redirection vers /fr/ ou /en/
│   │   ├── fr/
│   │   │   └── index.astro     # Page française
│   │   └── en/
│   │       └── index.astro     # Page anglaise
│   │
│   ├── utils/                  # Fonctions utilitaires
│   │   ├── i18n.ts             # Système de traduction custom
│   │   ├── theme.ts            # Gestion des thèmes
│   │   ├── locale.ts           # Gestion du changement de langue
│   │   └── tracking.ts         # Chargement Matomo
│   │
│   ├── constants/
│   │   └── social-icons-svg.ts # Icônes SVG en format string
│   │
│   ├── types.d.ts              # Types TypeScript custom
│   ├── cv.d.ts                 # Types pour le format JSON Resume
│   ├── global.d.ts             # Déclarations globales Alpine.js
│   └── env.d.ts                # Types d'environnement Astro
│
├── documentation/              # Documentation technique modulaire
│   ├── README.md               # Index général
│   ├── 01-stack-technique.md
│   ├── 02-architecture.md
│   └── ...
│
├── cv-fr.json                  # Données du CV en français
├── cv-en.json                  # Données du CV en anglais
├── mentions-fr.json            # Mentions légales FR
├── mentions-en.json            # Mentions légales EN
│
├── astro.config.mjs            # Configuration Astro
├── tailwind.config.mjs         # Configuration Tailwind
├── tsconfig.json               # Configuration TypeScript
└── package.json                # Dépendances et scripts
```

---

## Détails des Répertoires

### `/public/`
**Assets statiques copiés tels quels dans `/dist/` au build**

#### Pourquoi `public/` et pas `src/` ?
- Les fichiers dans `public/` sont servis tels quels sans transformation
- Les traductions JSON doivent être fetchées dynamiquement (format original)
- Les thèmes CSS sont chargés de manière asynchrone
- Les images sont référencées directement par URL

**Contenu** :
- `locales/` - Traductions i18n (6 fichiers JSON)
- `themes/themes.css` - CSS variables pour light/dark mode
- `avatar_*.webp` - Photos de profil optimisées
- `tracking.json` - Config Matomo (non versionné, ajouté en `.gitignore`)

---

### `/src/components/`
**Composants Astro réutilisables**

#### `/src/components/sections/`
Les sections principales du CV, dans l'ordre d'affichage :

1. **Hero.astro** - En-tête avec photo, nom, contacts
2. **About.astro** - Section "À propos" avec résumé
3. **Experience.astro** - Expériences professionnelles avec expand/collapse
4. **Projects.astro** - Projets remarquables
5. **Skills.astro** - Compétences techniques avec tooltips
6. **Education.astro** - Formation et certifications
7. **Tail.astro** - Footer avec lien GitHub

**Convention** : Chaque section reçoit `locale` et les données du CV correspondantes.

#### Composants utilitaires
- **Section.astro** - Wrapper générique pour sections avec titre h2
- **Dialog.astro** - Modale mentions légales (Alpine.js)
- **ThemeSwitch.astro** - Select pour choisir light/dark/system
- **LocaleSwitch.astro** - Select pour choisir FR/EN
- **KeyboardManager.astro** - Palette de commandes (HotKeyPad)

---

### `/src/icons/`
**Composants SVG Astro (23 fichiers)**

**Technologies** :
- html.astro, css.astro, javascript.astro, typescript.astro, react.astro, vue.astro, nodejs.astro, php.astro, symfony.astro, mysql.astro, docker.astro, figma.astro, vscode.astro

**Social/Contact** :
- GitHub.astro, LinkedIn.astro, X.astro, Phone.astro, Mail.astro

**UI** :
- FlagFr.astro, FlagEn.astro, themeSwitch.astro, WorldMap.astro, Arrow.astro

**Usage** :
```astro
---
import Html from "@/icons/html.astro";
---
<Html /> <!-- Injecte le SVG inline -->
```

**Note** : Pour HotKeyPad, j'utilise `/src/constants/social-icons-svg.ts` car HotKeyPad nécessite des strings HTML, pas des composants.

---

### `/src/layouts/`
**Layout principal du site**

**Layout.astro** - Wrapper de toutes les pages :
- `<head>` avec SEO (title, meta, Open Graph, Twitter Cards)
- Import des thèmes CSS
- Script Matomo
- `<slot />` pour le contenu de la page

**Props** :
```typescript
interface Props {
  title: string;      // "Simon Chabrier - Développeur Full Stack"
  image: string;      // Chemin vers avatar
  summary: string;    // Meta description
  theme: string;      // Thème par défaut
  locale: "fr" | "en";
}
```

---

### `/src/pages/`
**Routes du site (système de routing Astro)**

#### `/src/pages/index.astro`
**Page racine qui redirige vers `/fr/` ou `/en/`**

Logique de redirection :
1. Vérifie `localStorage.getItem("locale")`
2. Si existe → Redirige vers `/[locale]/`
3. Sinon → Détecte langue navigateur (`navigator.language`)
4. Fallback → `/fr/`

#### `/src/pages/fr/index.astro` et `/src/pages/en/index.astro`
**Pages principales (identiques, sauf locale et imports)**

**Structure** :
```astro
---
import * as cv from "@cv-fr"; // ou @cv-en
import * as legal from "@mentions-fr"; // ou @mentions-en
import Layout from "@/layouts/Layout.astro";
import Hero from "@/components/sections/Hero.astro";
// ... autres imports

const { basics, work, education, skills, projects } = cv;
---

<Layout title={basics.name} locale="fr" ...>
  <main>
    <Hero basics={basics} locale="fr" />
    <About about={basics.summary} locale="fr" />
    <Experience work={work} locale="fr" />
    <!-- ... autres sections -->
  </main>
</Layout>
```

---

### `/src/utils/`
**Fonctions utilitaires TypeScript**

- **i18n.ts** - Système de traduction custom (fonction `t()`)
- **theme.ts** - Gestion des thèmes (initializeTheme, updateTheme, etc.)
- **locale.ts** - Changement de langue (switchLocale, getStoredLocale)
- **tracking.ts** - Chargement Matomo analytics

Voir [Utilitaires](10-utilitaires.md) pour la documentation complète.

---

### `/src/constants/`
**Constantes partagées**

**social-icons-svg.ts** - Icônes SVG en format string :
```typescript
export const SOCIAL_ICONS_SVG = {
  GitHub: `<svg ...>...</svg>`,
  LinkedIn: `<svg ...>...</svg>`,
  X: `<svg ...>...</svg>`
} as const;
```

**Raison** : HotKeyPad nécessite des strings HTML, pas des composants Astro.

---

### Types TypeScript

#### `src/cv.d.ts`
Types pour le format JSON Resume :
```typescript
export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  profiles: Profiles[];
  location: Location;
}

export interface Work {
  name: string;
  position: string;
  startDate: string;
  endDate: string | null;
  summary: string | string[];
  responsibilities?: string[];
  achievements?: string[];
  skills?: string[];
  // ...
}

// ... autres types
```

#### `src/global.d.ts`
Déclarations Alpine.js pour TypeScript :
```typescript
declare global {
  interface Window {
    Alpine: import('alpinejs').Alpine;
  }
}
```

#### `src/env.d.ts`
Types environnement Astro (généré automatiquement).

---

## Fichiers à la Racine

### Données

- **cv-fr.json** / **cv-en.json** - Données du CV au format JSON Resume
- **mentions-fr.json** / **mentions-en.json** - Mentions légales

### Configuration

- **astro.config.mjs** - Config Astro (site, base, i18n, integrations)
- **tailwind.config.mjs** - Config Tailwind (couleurs custom, plugins)
- **tsconfig.json** - Config TypeScript (path aliases, moduleResolution)
- **package.json** - Dépendances et scripts npm

---

## Conventions de Nommage

### Fichiers
- **Composants** : PascalCase (`Hero.astro`, `ThemeSwitch.astro`)
- **Utilitaires** : camelCase (`i18n.ts`, `theme.ts`)
- **Icônes** : PascalCase (`GitHub.astro`, `html.astro`)
- **Types** : `.d.ts` extension

### Imports
J'utilise les path aliases pour des imports propres :
```typescript
import { t } from "@/utils/i18n";           // au lieu de ../../utils/i18n
import * as cv from "@cv-fr";               // au lieu de ../../cv-fr.json
import Hero from "@/components/sections/Hero.astro";
```

---

## Outputs (après build)

Après `pnpm build`, le répertoire `/dist/` contient :

```
dist/
├── _astro/              # Assets optimisés (CSS, JS avec hash)
├── en/
│   └── index.html       # Page anglaise compilée
├── fr/
│   └── index.html       # Page française compilée
├── index.html           # Redirection
├── locales/             # Traductions copiées
├── themes/              # CSS copiés
├── avatar_*.webp        # Images copiées
└── ...
```

---

[← Stack Technique](01-stack-technique.md) | [Retour à l'index](README.md) | [Configuration TypeScript →](03-typescript-config.md)
