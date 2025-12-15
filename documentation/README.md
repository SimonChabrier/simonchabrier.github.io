# 📚 Documentation Technique - Portfolio Simon Chabrier

> Documentation personnelle pour comprendre le code et la circulation des informations dans mon portfolio.
> Rédigée pour m'aider à reprendre le projet dans plusieurs jours ou mois.

---

## 🎯 Vue d'ensemble

Mon portfolio est une application web statique **bilingue (FR/EN)** générée avec Astro. Le site présente mon CV de manière interactive avec des fonctionnalités avancées (raccourcis clavier, thèmes, accessibilité).

**URL de production** : https://simonchabrier.fr/

---

## 📖 Table des Matières

### 🛠️ Configuration & Architecture
- [**Stack Technique**](01-stack-technique.md) - Technologies utilisées (Astro, TypeScript, Tailwind, Alpine.js, HotKeyPad)
- [**Architecture des Fichiers**](02-architecture.md) - Structure complète du projet avec explications
- [**Configuration TypeScript**](03-typescript-config.md) - Path aliases et configuration

### 📦 Données & Contenu
- [**Sources de Données**](04-sources-donnees.md) - Format JSON Resume, traductions, mentions légales
- [**Système i18n**](05-i18n.md) - Traductions et internationalisation
- [**Circulation des Données**](06-circulation-donnees.md) - Flux de données entre composants

### 🎨 UI & Styling
- [**Système de Thèmes**](07-themes.md) - CSS variables, light/dark mode, configuration
- [**Styling & CSS**](08-styling.md) - Tailwind configuration, classes custom, mode impression

### 🧩 Composants
- [**Composants Principaux**](09-composants.md) - Hero, Experience, Skills, KeyboardManager, ThemeSwitch, LocaleSwitch
- [**Utilitaires**](10-utilitaires.md) - i18n.ts, theme.ts, locale.ts, tracking.ts

### 🔍 Qualité & Performance
- [**SEO & Meta Tags**](11-seo.md) - Open Graph, Twitter Cards, performance
- [**Accessibilité**](12-accessibilite.md) - WCAG 2.1 AA, corrections appliquées
- [**Sécurité**](13-securite.md) - Bonnes pratiques de sécurité

### 🚀 Déploiement & Maintenance
- [**Build & Déploiement**](14-build-deploiement.md) - Scripts, processus de build, configuration Astro
- [**Ajouter des Fonctionnalités**](15-nouvelles-fonctionnalites.md) - Guide step-by-step pour étendre le projet
- [**Debugging**](16-debugging.md) - Console warnings, vérifications, erreurs fréquentes
- [**Maintenance**](17-maintenance.md) - Checklist, statistiques, ressources

---

## 🚀 Démarrage Rapide

```bash
# Installation
pnpm install

# Développement
pnpm dev

# Build
pnpm build

# Preview
pnpm preview
```

---

## 📊 Statistiques

- **Score** : 9.5/10
- **Build time** : ~3.3s
- **Dépendances** : 9 packages
- **Composants** : 15 composants Astro
- **Traductions** : 6 fichiers JSON (3 par langue)
- **0 erreurs** de build

---

**📅 Dernière mise à jour** : Décembre 2025
**🔖 Version** : 1.0.0
**👤 Auteur** : Simon Chabrier
