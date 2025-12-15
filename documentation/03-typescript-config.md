# 🔧 Configuration TypeScript

## tsconfig.json

### Configuration Générale

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "moduleResolution": "bundler",
    "target": "ES2020",
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "paths": {
      "@/*": ["src/*"],
      "@data/*": ["./*"],
      "@cvType": ["src/cv.d.ts"],
      "@cv-fr": ["./cv-fr.json"],
      "@cv-en": ["./cv-en.json"],
      "@mentions-fr": ["./mentions-fr.json"],
      "@mentions-en": ["./mentions-en.json"]
    }
  }
}
```

---

## Path Aliases Expliqués

### `@/*` - Chemins src/

**Mapping** : `@/*` → `src/*`

**Utilisation** :
```typescript
// ❌ Avant (chemins relatifs)
import { t } from "../../utils/i18n";
import Hero from "../../components/sections/Hero.astro";

// ✅ Après (path alias)
import { t } from "@/utils/i18n";
import Hero from "@/components/sections/Hero.astro";
```

**Avantages** :
- Plus lisible
- Indépendant de la profondeur du fichier
- Refactoring plus facile (déplacer un fichier ne casse pas les imports)

---

### `@data/*` - Fichiers racine

**Mapping** : `@data/*` → `./*`

**Utilisation** :
```typescript
// Accès aux fichiers JSON à la racine
import type { Basics } from "@data/cv-fr.json";
```

**Note** : Je n'utilise presque jamais ce alias, je préfère les alias spécifiques ci-dessous.

---

### `@cvType` - Types CV

**Mapping** : `@cvType` → `src/cv.d.ts`

**Utilisation** :
```typescript
import type { Basics, Work, Skills } from "@cvType";

const { basics, work, skills }: {
  basics: Basics,
  work: Work[],
  skills: Skills[]
} = cv;
```

**Contenu de cv.d.ts** :
```typescript
export interface Basics {
  name: string;
  label: string;
  image: string;
  imagesmall: string;
  email: string;
  phone: string;
  url?: string;
  summary: string;
  location: Location;
  profiles: Profiles[];
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
  url?: string;
  location?: string;
  location_type?: string;
}

export interface Skills {
  name: string;
  level: string;
  keywords: string[];
}

// ... autres types
```

---

### `@cv-fr` et `@cv-en` - Import CV

**Mapping** :
- `@cv-fr` → `./cv-fr.json`
- `@cv-en` → `./cv-en.json`

**Utilisation** :
```astro
---
// src/pages/fr/index.astro
import * as cv from "@cv-fr";

const { basics, work, education, skills, projects } = cv;
---

<Hero basics={basics} locale="fr" />
```

**Avantages** :
- Import clean sans `../../`
- Type safety automatique (TypeScript infère la structure du JSON)
- Changement facile entre FR et EN

---

### `@mentions-fr` et `@mentions-en` - Mentions légales

**Mapping** :
- `@mentions-fr` → `./mentions-fr.json`
- `@mentions-en` → `./mentions-en.json`

**Utilisation** :
```astro
---
import * as legal from "@mentions-fr";
---

<Dialog legalInfo={legal} locale="fr" />
```

---

## moduleResolution: "bundler"

### Pourquoi "bundler" ?

**Requis pour Astro 5.x** - Avant j'utilisais `"node"` mais Astro 5 nécessite `"bundler"`.

**Différence** :
- `"node"` - Résolution classique Node.js (cherche dans node_modules)
- `"bundler"` - Résolution moderne pour bundlers (Vite, Webpack, etc.)

**Avantage** :
- Support des imports sans extensions (`.js`, `.ts`, `.astro`)
- Meilleure compatibilité avec Vite

---

## extends: "astro/tsconfigs/strict"

J'hérite de la config stricte d'Astro qui active :

```json
{
  "strict": true,                    // Mode strict TypeScript
  "noImplicitAny": true,             // Interdit les any implicites
  "strictNullChecks": true,          // Vérifie null/undefined
  "strictFunctionTypes": true,       // Vérifie les types de fonctions
  "noUnusedLocals": true,            // Warn si variable non utilisée
  "noUnusedParameters": true,        // Warn si paramètre non utilisé
  "noImplicitReturns": true          // Vérifie les returns
}
```

**Bénéfices** :
- Moins d'erreurs à l'exécution
- Meilleure qualité de code
- Autocomplétion IDE optimale

---

## Types Custom

### src/cv.d.ts

Définit tous les types pour le format JSON Resume.

**Exemple complet** :
```typescript
export interface Basics {
  name: string;
  label: string;
  image: string;
  imagesmall: string;
  email: string;
  phone: string;
  url?: string;
  summary: string;
  location: Location;
  profiles: Profiles[];
}

export interface Location {
  city: string;
  countryCode?: string;
  region: string;
}

export interface Profiles {
  network: string;
  username?: string;
  url: string;
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
  url?: string;
  location?: string;
  location_type?: string;
}

export interface Projects {
  name: string;
  description: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  roles?: string[];
  entity?: string;
  type?: string;
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  startDate?: string;
  endDate?: string;
  score?: string;
  courses?: string[];
}

export interface Certificates {
  name: string;
  date: string;
  issuer: string;
  url?: string;
}

export interface Skills {
  name: string;
  level: string;
  keywords: string[];
}
```

---

### src/global.d.ts

Déclare Alpine.js pour TypeScript :

```typescript
declare global {
  interface Window {
    Alpine: import('alpinejs').Alpine;
  }
}

export {};
```

**Pourquoi** : TypeScript ne connaît pas `window.Alpine` par défaut, cette déclaration évite les erreurs de type.

---

### src/types.d.ts

Types utilitaires custom :

```typescript
export type Locale = "en" | "fr";

export type Theme = "system" | "light" | "dark";
```

---

## Vérification TypeScript

### Commande

```bash
pnpm astro check
```

**Utilité** :
- Vérifie tous les types dans les fichiers .astro et .ts
- Détecte les erreurs avant le build
- Intégré dans `pnpm build`

### Résultat typique

```
Result (47 files):
- 0 errors
- 0 warnings
- 0 hints
```

---

## Bonnes Pratiques

### ✅ Toujours typer les props

```astro
---
interface Props {
  basics: Basics;
  locale: Locale;
}

const { basics, locale } = Astro.props;
---
```

### ✅ Utiliser les path aliases

```typescript
import { t } from "@/utils/i18n";  // ✅
import { t } from "../../utils/i18n";  // ❌
```

### ✅ Importer les types avec `type`

```typescript
import type { Basics, Work } from "@cvType";  // ✅ Import type-only
import { Basics, Work } from "@cvType";  // ❌ Import runtime
```

**Raison** : Les imports type-only sont supprimés au build (pas de code inutile).

### ✅ Éviter `any`

```typescript
const data: any = ...;  // ❌ Perd le type safety

const data: Basics = ...;  // ✅ Type explicite
```

---

## Debugging Types

### Voir le type inféré

```typescript
const data = await fetch(...).then(r => r.json());

// Hover sur "data" dans VSCode pour voir le type inféré
// Ou utiliser une assertion explicite :
const data: Basics = await fetch(...).then(r => r.json());
```

### Erreur fréquente

```
Cannot find module '@cvType'
```

**Solution** : Vérifier que `src/cv.d.ts` existe et que le path alias est bien défini dans `tsconfig.json`.

---

[← Architecture](02-architecture.md) | [Retour à l'index](README.md) | [Sources de Données →](04-sources-donnees.md)
