# 🚀 Build & Déploiement

## Scripts NPM

```json
{
  "dev": "astro dev",
  "build": "astro check && astro build --mode production",
  "preview": "astro preview"
}
```

---

## Développement

```bash
pnpm dev
```

**Ce qui se passe** :
- Lance le dev server sur `http://localhost:4321`
- Hot Module Replacement (HMR) activé
- Rechargement automatique au changement

---

## Build

```bash
pnpm build
```

**Étapes** :
1. `astro check` - Vérification TypeScript
2. `astro build --mode production` - Génération statique
3. Output dans `/dist/`

**Durée** : ~3.3s

**Résultat** :
```
dist/
├── _astro/              # Assets optimisés (CSS, JS avec hash)
├── en/index.html        # Page anglaise
├── fr/index.html        # Page française
├── index.html           # Redirection
├── locales/             # Traductions
├── themes/              # CSS
└── avatar_*.webp        # Images
```

---

## Preview

```bash
pnpm preview
```

**Utilité** : Tester le build en local avant déploiement.

---

## Configuration Astro

**Fichier** : `astro.config.mjs`

```javascript
export default defineConfig({
  site: "https://simonchabrier.fr",
  base: "/",
  trailingSlash: "always",  // URLs finissent par /

  integrations: [
    tailwind(),
  ],

  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      prefixDefaultLocale: true  // /fr/ au lieu de /
    }
  }
});
```

---

## Déploiement GitHub Pages

### Configuration

**Repository** : `simonchabrier/simonchabrier.github.io`

**Branch** : `main`

**Workflow** : GitHub Actions automatique

### Process

```
Push sur main
    ↓
GitHub Actions détecte le push
    ↓
Run: pnpm install
    ↓
Run: pnpm build
    ↓
Deploy dist/ vers gh-pages branch
    ↓
Site live sur simonchabrier.github.io
```

---

## Vérifications Pré-Déploiement

### 1. Build réussit

```bash
pnpm build
# ✅ 0 errors
```

### 2. Types corrects

```bash
pnpm astro check
# ✅ 0 errors, 0 warnings
```

### 3. Preview fonctionne

```bash
pnpm preview
# Tester manuellement sur http://localhost:4321
```

### 4. SEO Meta Tags

```bash
grep "og:image" dist/fr/index.html
# ✅ URL absolue correcte
```

---

## Domaine Custom

### DNS Configuration

**Type** : CNAME

**Host** : `@` (ou `www`)

**Value** : `simonchabrier.github.io`

### GitHub Configuration

1. Repository Settings
2. Pages
3. Custom domain: `simonchabrier.fr`
4. Enforce HTTPS: ✅

---

[← Sécurité](13-securite.md) | [Retour à l'index](README.md) | [Nouvelles Fonctionnalités →](15-nouvelles-fonctionnalites.md)
