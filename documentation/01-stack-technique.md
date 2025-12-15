# 🛠️ Stack Technique

## Framework & Build

### Astro 5.11.0
**Framework SSG (Static Site Generation)**

J'utilise Astro comme framework principal car il génère des sites statiques ultra-performants. Astro compile mon code en HTML pur au moment du build, ce qui garantit des temps de chargement rapides.

**Avantages pour mon projet** :
- 🚀 Performance native (HTML statique)
- 🔄 Support i18n intégré
- 📦 Import de composants islands (Alpine.js)
- 🎨 Intégration Tailwind native

### TypeScript 5.8.3
**Typage strict pour la robustesse**

J'utilise TypeScript en mode strict pour éviter les erreurs à la compilation. Tous mes composants, utils et types sont typés.

**Configuration importante** :
- `moduleResolution: "bundler"` - Requis pour Astro 5.x
- Path aliases configurés (voir [Configuration TypeScript](03-typescript-config.md))

### Vite
**Bundler et dev server (intégré dans Astro)**

Vite est le moteur de build intégré à Astro. Je n'ai pas besoin de le configurer directement, mais il gère :
- Hot Module Replacement (HMR) en dev
- Optimisation des assets
- Code splitting automatique

---

## Styling

### Tailwind CSS 3.4.17
**Utility-first CSS**

J'utilise Tailwind pour tout le styling avec une approche utility-first. Je n'écris presque jamais de CSS custom, seulement des classes Tailwind.

**Configuration custom** :
- Couleurs dynamiques avec CSS variables (voir [Système de Thèmes](07-themes.md))
- Classes `skin-*` pour adaptation light/dark
- Classes `.no-print` pour masquer à l'impression

### CSS Variables
**Système de thèmes (light/dark/system)**

Les thèmes sont gérés par des CSS variables définies dans `public/themes/themes.css`. Tailwind utilise ces variables pour adapter automatiquement les couleurs.

**Exemple** :
```css
:root {
  --color-fill: 255, 255, 255;  /* Blanc en light */
}

.dark {
  --color-fill: 17, 24, 39;     /* Gris foncé en dark */
}
```

### PostCSS + Autoprefixer
**Compatibilité navigateurs**

Intégré automatiquement via Tailwind, je n'ai pas besoin de configuration spéciale.

---

## Interactivité

### Alpine.js 3.14.9
**JavaScript réactif minimal**

J'utilise Alpine.js pour toute l'interactivité côté client car c'est léger (~15kb) et intuitif avec une syntaxe déclarative.

**Cas d'usage dans mon projet** :
- Expand/collapse des expériences professionnelles
- Tooltips au survol des skills
- Copie d'email au clic
- Gestion de l'état local (`x-data`)

**Plugins utilisés** :
- `@alpinejs/collapse` - Animations smooth pour expand/collapse
- `@alpinejs/focus` - Gestion du focus pour l'accessibilité

**Exemple typique** :
```html
<div x-data="{ expanded: false }">
  <button @click="expanded = !expanded">Toggle</button>
  <div x-show="expanded" x-collapse>Contenu</div>
</div>
```

### HotKeyPad 1.0.2
**Palette de commandes (Cmd+K)**

Librairie pour créer une palette de commandes à la VS Code. J'utilise HotKeyPad pour :
- Ouvrir la palette avec Cmd+K
- Imprimer avec Ctrl+P
- Accès rapide aux profils sociaux (Ctrl+G pour GitHub, etc.)

**Particularité** : HotKeyPad nécessite des icônes en format string HTML, pas des composants Astro. C'est pourquoi j'ai créé `/src/constants/social-icons-svg.ts`.

---

## Qualité & DX (Developer Experience)

### Prettier 3.6.2
**Formatage automatique**

J'utilise Prettier pour formater automatiquement le code à chaque sauvegarde.

**Plugins** :
- `prettier-plugin-astro` - Support des fichiers .astro
- `prettier-plugin-tailwindcss` - Tri automatique des classes Tailwind (ordre cohérent)

**Configuration** :
```json
{
  "semi": true,
  "singleQuote": false,
  "tabWidth": 2,
  "useTabs": true,
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"]
}
```

---

## Dépendances Complètes

```json
{
  "dependencies": {
    "@alpinejs/collapse": "^3.14.9",
    "@alpinejs/focus": "^3.14.9",
    "@astrojs/check": "0.9.4",
    "@astrojs/tailwind": "^6.0.2",
    "alpinejs": "^3.14.9",
    "astro": "5.11.0",
    "hotkeypad": "1.0.2",
    "prettier-plugin-tailwindcss": "^0.6.13",
    "typescript": "5.8.3"
  }
}
```

**Total : 9 packages** - Stack volontairement minimaliste pour réduire la complexité et la taille du bundle.

---

## Pourquoi ces choix ?

### ✅ Astro
- Performance maximale (HTML statique)
- SEO optimal (SSG)
- Support i18n natif

### ✅ TypeScript
- Type safety (moins d'erreurs en production)
- Autocomplétion IDE
- Documentation implicite du code

### ✅ Tailwind
- Pas de CSS à maintenir
- Design system cohérent
- Thèmes faciles avec CSS variables

### ✅ Alpine.js
- Léger (~15kb vs React ~40kb)
- Syntaxe déclarative intuitive
- Parfait pour des interactions simples

### ✅ HotKeyPad
- UX moderne (palette de commandes)
- Accessible au clavier
- Facile à implémenter

---

[← Retour à l'index](README.md) | [Architecture des Fichiers →](02-architecture.md)
