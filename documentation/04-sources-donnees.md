# 📦 Sources de Données

## Vue d'ensemble

Mon portfolio utilise 3 types de sources de données :

1. **CV (JSON Resume)** - Données personnelles et professionnelles
2. **Traductions (i18n)** - Textes de l'interface en FR/EN
3. **Mentions légales** - Informations légales du site

---

## 1. CV (Format JSON Resume)

### Fichiers

- `cv-fr.json` - Version française
- `cv-en.json` - Version anglaise

### Standard JSON Resume

J'utilise le format [JSON Resume](https://jsonresume.org/schema/), un standard open source pour structurer les CV.

**Avantages** :
- Format standardisé et reconnu
- Structure claire et extensible
- Facilite l'export vers d'autres formats

---

### Structure Complète

```json
{
  "basics": {
    "name": "Simon Chabrier",
    "label": "Développeur Full Stack",
    "image": "./../avatar_254.webp",
    "imagesmall": "./../avatar_128.webp",
    "email": "contact@simonchabrier.fr",
    "phone": "+33 X XX XX XX XX",
    "url": "https://simonchabrier.fr",
    "summary": "Développeur passionné...",
    "location": {
      "city": "Agen",
      "countryCode": "FR",
      "region": "France"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "simonchabrier",
        "url": "https://linkedin.com/in/simonchabrier"
      },
      {
        "network": "GitHub",
        "username": "simonchabrier",
        "url": "https://github.com/simonchabrier"
      },
      {
        "network": "X",
        "username": "simonchabrier",
        "url": "https://x.com/simonchabrier"
      }
    ]
  },

  "work": [
    {
      "name": "Nom de l'entreprise",
      "position": "Développeur Full Stack",
      "startDate": "2023-01",
      "endDate": "2024-12",
      "summary": [
        "Mission principale 1",
        "Mission principale 2"
      ],
      "responsibilities": [
        "Responsabilité 1",
        "Responsabilité 2"
      ],
      "achievements": [
        "Réalisation importante 1",
        "Réalisation importante 2"
      ],
      "skills": ["React", "TypeScript", "Node.js"],
      "url": "https://entreprise.com",
      "location": "Paris",
      "location_type": "Remote"
    }
  ],

  "education": [
    {
      "institution": "Université",
      "area": "Informatique",
      "studyType": "Master",
      "startDate": "2018-09",
      "endDate": "2020-06",
      "score": "Mention Bien",
      "courses": ["Algorithmes", "Bases de données"]
    }
  ],

  "certificates": [
    {
      "name": "Certification AWS",
      "date": "2023-03",
      "issuer": "Amazon Web Services",
      "url": "https://..."
    }
  ],

  "skills": [
    {
      "name": "React",
      "level": "Expert",
      "keywords": ["Hooks", "Context", "Redux", "Next.js"]
    },
    {
      "name": "TypeScript",
      "level": "Avancé",
      "keywords": ["Types", "Generics", "Utility Types"]
    }
  ],

  "projects": [
    {
      "name": "Nom du projet",
      "description": "Description courte",
      "highlights": [
        "Point fort 1",
        "Point fort 2"
      ],
      "keywords": ["React", "Node.js"],
      "startDate": "2023-01",
      "endDate": "2023-06",
      "url": "https://projet.com",
      "roles": ["Lead Developer"],
      "entity": "Entreprise",
      "type": "Application web"
    }
  ]
}
```

---

### Champs Détaillés

#### `basics` - Informations personnelles

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `name` | string | ✅ | Nom complet |
| `label` | string | ✅ | Titre professionnel |
| `image` | string | ✅ | Chemin photo haute résolution (256x256) |
| `imagesmall` | string | ❌ | Chemin photo basse résolution (128x128) |
| `email` | string | ✅ | Email de contact |
| `phone` | string | ✅ | Téléphone |
| `url` | string | ❌ | Site web personnel |
| `summary` | string | ✅ | Résumé professionnel |
| `location` | object | ✅ | Localisation |
| `profiles` | array | ✅ | Profils sociaux |

**Exemple location** :
```json
{
  "city": "Agen",
  "countryCode": "FR",
  "region": "France"
}
```

**Exemple profiles** :
```json
[
  {
    "network": "GitHub",
    "username": "simonchabrier",
    "url": "https://github.com/simonchabrier"
  }
]
```

**⚠️ Note importante** : Les chemins d'images commencent par `./../` car ils sont relatifs au fichier JSON. Le code nettoie ce préfixe pour générer les URLs absolues.

---

#### `work` - Expériences professionnelles

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `name` | string | ✅ | Nom de l'entreprise |
| `position` | string | ✅ | Poste occupé |
| `startDate` | string | ✅ | Date de début (format: "YYYY-MM") |
| `endDate` | string\|null | ❌ | Date de fin (null si en cours) |
| `summary` | string\|array | ✅ | Missions principales |
| `responsibilities` | array | ❌ | Responsabilités détaillées |
| `achievements` | array | ❌ | Réalisations importantes |
| `skills` | array | ❌ | Technologies utilisées |
| `url` | string | ❌ | Site de l'entreprise |
| `location` | string | ❌ | Ville |
| `location_type` | string | ❌ | "Remote", "Hybrid", "On-site" |

**⚠️ Note** : `summary` peut être soit une string, soit un array. Le composant `Experience.astro` gère les deux cas.

---

#### `skills` - Compétences

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `name` | string | ✅ | Nom de la compétence |
| `level` | string | ✅ | Niveau (Débutant, Intermédiaire, Avancé, Expert) |
| `keywords` | array | ✅ | Mots-clés associés |

**Exemple** :
```json
{
  "name": "React",
  "level": "Expert",
  "keywords": ["Hooks", "Context", "Redux", "Next.js", "Server Components"]
}
```

---

### Utilisation dans le Code

#### Import du CV

```astro
---
// src/pages/fr/index.astro
import * as cv from "@cv-fr";

const { basics, work, education, skills, projects } = cv;
---
```

#### Passage aux Composants

```astro
<Layout
  title={`${basics.name} - ${basics.label}`}
  image={basics.image}
  summary={basics.summary}
  locale="fr"
>
  <main>
    <Hero basics={basics} locale="fr" />
    <About about={basics.summary} locale="fr" />
    <Experience work={work} locale="fr" />
    <Skills skills={skills} locale="fr" />
    <Projects projects={projects} locale="fr" />
    <Education education={education} locale="fr" />
  </main>
</Layout>
```

---

## 2. Traductions (i18n)

### Fichiers

```
public/locales/
├── en/
│   ├── common.json      # Textes communs (theme, locale, keyboard)
│   ├── components.json  # Textes des composants
│   └── sections.json    # Textes des sections
└── fr/
    ├── common.json
    ├── components.json
    └── sections.json
```

### Structure par Namespace

#### `common.json` - Textes généraux

```json
{
  "theme": {
    "label": "Thème",
    "system": "Système",
    "light": "Clair",
    "dark": "Sombre"
  },
  "locale": {
    "label": "Langue",
    "fr": "Français",
    "en": "English"
  },
  "keyboard": {
    "press": "Appuyez sur",
    "openCommands": "pour ouvrir les commandes",
    "print": "Imprimer",
    "search": "Rechercher..."
  }
}
```

#### `components.json` - Composants UI

```json
{
  "dialog": {
    "close": "Fermer",
    "legal": "Mentions légales"
  },
  "experience": {
    "showMore": "Voir plus",
    "showLess": "Voir moins"
  }
}
```

#### `sections.json` - Sections CV

```json
{
  "hero": {
    "showProfile": "Voir le profil de {{name}} sur",
    "phoneTitle": "Contacter {{name}} au {{phone}}",
    "mailTitle": "Envoyer un e-mail à {{name}}"
  },
  "about": {
    "title": "À propos"
  },
  "experience": {
    "title": "Expérience professionnelle",
    "responsibilities": "Responsabilités",
    "achievements": "Réalisations",
    "now": "Actuel"
  },
  "skills": {
    "title": "Compétences",
    "level": "Niveau"
  },
  "projects": {
    "title": "Projets"
  },
  "education": {
    "title": "Formation",
    "certificates": "Certifications"
  }
}
```

### Interpolation de Variables

J'utilise la syntaxe `{{variable}}` pour insérer des données dynamiques :

```json
{
  "hero": {
    "showProfile": "Voir le profil de {{name}} sur"
  }
}
```

**Utilisation** :
```astro
---
import { t } from "@/utils/i18n";

const text = t("sections:hero.showProfile", {
  lng: "fr",
  name: "Simon"
});
// → "Voir le profil de Simon sur"
---
```

Voir [Système i18n](05-i18n.md) pour plus de détails.

---

## 3. Mentions Légales

### Fichiers

- `mentions-fr.json` - Version française
- `mentions-en.json` - Version anglaise

### Structure

```json
{
  "heading": "Mentions légales",
  "sections": [
    {
      "title": "Éditeur du site",
      "sites": {
        "name": "Simon Chabrier",
        "urls": {
          "email": "mailto:contact@simonchabrier.fr",
          "github": "https://github.com/simonchabrier",
          "website": "https://simonchabrier.fr"
        }
      }
    },
    {
      "title": "Hébergement",
      "sites": {
        "name": "GitHub Pages",
        "urls": {
          "website": "https://pages.github.com"
        }
      }
    },
    {
      "title": "Données personnelles",
      "paragraph": "Ce site ne collecte aucune donnée personnelle sans consentement..."
    }
  ]
}
```

### Utilisation

```astro
---
// src/pages/fr/index.astro
import * as legal from "@mentions-fr";
---

<Dialog legalInfo={legal} locale="fr" />
```

Le composant `Dialog.astro` affiche une modale avec le contenu des mentions légales.

---

## Conventions et Bonnes Pratiques

### ✅ Cohérence FR/EN

Je m'assure que les deux fichiers (FR et EN) ont **exactement la même structure** :

```json
// cv-fr.json
{
  "basics": { "name": "..." },
  "work": [...],
  "skills": [...]
}

// cv-en.json (même structure)
{
  "basics": { "name": "..." },
  "work": [...],
  "skills": [...]
}
```

**Raison** : Les composants utilisent les mêmes props, quelle que soit la langue.

### ✅ Validation JSON

Je vérifie que tous les JSON sont valides avant de commit :

```bash
# Vérifier la syntaxe JSON
cat cv-fr.json | jq .
```

### ✅ Chemins d'images relatifs

Dans les CV, j'utilise des chemins relatifs :

```json
{
  "image": "./../avatar_254.webp"
}
```

Le code nettoie ensuite ce chemin pour générer les URLs absolues :

```typescript
const cleanImagePath = image.replace(/^(\.\.\/|\.\/)+/, '/');
// ./../avatar_254.webp → /avatar_254.webp
```

### ✅ Dates au format ISO

Pour les dates, j'utilise le format `YYYY-MM` ou `YYYY-MM-DD` :

```json
{
  "startDate": "2023-01",
  "endDate": "2024-12"
}
```

**Raison** : Facile à parser et à formater en JavaScript.

---

## Modification des Données

### Mettre à jour le CV

1. Éditer `cv-fr.json` et `cv-en.json`
2. Vérifier la syntaxe JSON
3. Rebuild le site : `pnpm build`

### Ajouter une traduction

1. Identifier le namespace (`common`, `components`, `sections`)
2. Ajouter dans FR et EN en même temps
3. Utiliser dans le composant avec `t("namespace:key", { lng })`

### Modifier les mentions légales

1. Éditer `mentions-fr.json` et `mentions-en.json`
2. Rebuild le site

---

[← Configuration TypeScript](03-typescript-config.md) | [Retour à l'index](README.md) | [Système i18n →](05-i18n.md)
