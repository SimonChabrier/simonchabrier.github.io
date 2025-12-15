# 🔍 SEO & Meta Tags

## Configuration SEO dans Layout.astro

### Props Reçues

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

## Meta Tags Essentiels

### Basiques

```html
<title>{title}</title>
<meta name="description" content={summary} />
<meta name="robots" content="index, follow" />
<link rel="canonical" href={canonical} />
<html lang={locale} />
```

---

## Open Graph (Facebook, LinkedIn)

```html
<meta property="og:url" content={canonical} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={summary} />
<meta property="og:image" content={`${canonicalDomain}${cleanImagePath}`} />
<meta property="og:locale" content={locale === "fr" ? "fr_FR" : "en_US"} />
```

**⚠️ Note** : L'image doit être une URL absolue complète.

---

## Twitter Cards

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={summary} />
<meta name="twitter:image" content={`${canonicalDomain}${cleanImagePath}`} />
```

---

## Nettoyage du Chemin d'Image

### Problème

Le CV contient `./../avatar_254.webp`, ce qui donne une URL invalide si concaténé directement.

### Solution

```typescript
const cleanImagePath = image.replace(/^(\.\.\/|\.\/)+/, '/');
// Input:  "./../avatar_254.webp"
// Output: "/avatar_254.webp"

const imageUrl = `${canonicalDomain}${cleanImagePath}`;
// → "https://simonchabrier.fr/avatar_254.webp" ✅
```

---

## Performance & Web Vitals

### LCP (Largest Contentful Paint)

```html
<img fetchpriority="high" srcset="..." />
```

**Appliqué sur** : Hero image (première image visible).

### CLS (Cumulative Layout Shift)

```html
<img width="256" height="256" />
```

**Raison** : Dimensions explicites évitent les layout shifts.

### Images Responsives

```html
<img
  srcset="avatar_128.webp 128w, avatar_254.webp 256w"
  sizes="(max-width: 640px) 128px, 256px"
/>
```

**Bénéfice** : Charge la bonne résolution selon l'écran.

---

## Chargement CSS Asynchrone

```html
<link
  rel="preload"
  as="style"
  href="/themes/themes.css"
  onload="this.onload=null;this.rel='stylesheet';"
/>
<noscript>
  <link rel="stylesheet" href="/themes/themes.css" />
</noscript>
```

**Bénéfice** : CSS des thèmes ne bloque pas le rendu.

---

## Vérification SEO

### Tester Open Graph

- [OpenGraph.xyz](https://www.opengraph.xyz/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

### Tester Twitter Cards

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Vérifier HTML

```bash
grep "og:image" dist/fr/index.html
# → <meta property="og:image" content="https://simonchabrier.fr/avatar_254.webp" />
```

---

[← Utilitaires](10-utilitaires.md) | [Retour à l'index](README.md) | [Accessibilité →](12-accessibilite.md)
