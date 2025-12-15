# 🐛 Debugging

## Console Warnings en DEV

Les warnings i18n n'apparaissent qu'en mode développement :

```typescript
if (import.meta.env.DEV) {
  console.warn("Message de debug");
}
```

### Lancer en DEV

```bash
pnpm dev
```

**Warnings possibles** :
- `Clé de traduction invalide: ...`
- `Locale invalide: ...`
- `Fichier de traduction introuvable: ...`
- `Traduction introuvable: ...`

---

## Vérifier les Traductions

### Tester une Clé

```astro
---
const test = t("sections:hero.showProfile", {
  lng: "fr",
  name: "Simon"
});

console.log(test);
// → "Voir le profil de Simon sur" (si OK)
// → "sections:hero.showProfile" (si erreur)
---
```

### Valider les Fichiers JSON

```bash
# Vérifier la syntaxe
cat public/locales/fr/sections.json | jq .

# Afficher le contenu formaté
jq . public/locales/fr/sections.json
```

---

## Build Errors

### Erreur : Module non trouvé

```
Cannot find module '@cvType'
```

**Solution** : Vérifier `tsconfig.json` → `paths` → Le chemin existe ?

### Erreur : Type invalide

```
Type 'string' is not assignable to type 'Locale'
```

**Solution** : Utiliser le type correct :
```typescript
const locale: Locale = "fr";  // ✅
const locale: string = "fr";  // ❌
```

---

## Type Checking

```bash
pnpm astro check
```

**Résultat attendu** :
```
Result (47 files):
- 0 errors
- 0 warnings
- 0 hints
```

---

## Debugging Thème

### Vérifier le Thème Actuel

```javascript
// Console navigateur
localStorage.getItem("theme")
// → "light" | "dark" | "system" | null

document.documentElement.className
// → "" (light) | "dark" (dark)
```

### Forcer un Thème

```javascript
import { updateTheme } from "@/utils/theme";
updateTheme("dark");
```

### Tester prefers-color-scheme

```javascript
window.matchMedia("(prefers-color-scheme: dark)").matches
// → true (OS en dark) | false (OS en light)
```

---

## Debugging Locale

### Vérifier la Langue

```javascript
localStorage.getItem("locale")
// → "fr" | "en" | null
```

### Forcer une Langue

```javascript
import { switchLocale } from "@/utils/locale";
switchLocale("en");
// → Redirige vers /en/
```

---

## Debugging HotKeyPad

### Vérifier les Commandes

```javascript
// Console navigateur
const hotkeypadData = document.querySelector("#hotkeypad")?.getAttribute("data-info");
console.log(JSON.parse(hotkeypadData));
// → Array des commandes
```

### Tester un Raccourci

- Appuyer sur `Cmd+K` → Palette s'ouvre ?
- Appuyer sur `Ctrl+P` → Impression ?

---

## Performance

### Lighthouse

1. Chrome DevTools → Lighthouse
2. Mode: Desktop ou Mobile
3. Categories: Performance, Accessibility, Best Practices, SEO
4. Generate report

**Cibles** :
- Performance: > 90
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Web Vitals

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## Debugging CSS

### Inspecter les Variables

```javascript
// Console navigateur
getComputedStyle(document.documentElement).getPropertyValue("--color-fill")
// → "255, 255, 255" (light) | "17, 24, 39" (dark)
```

### Tester une Classe Tailwind

```javascript
// Console
document.querySelector(".bg-skin-fill").style.backgroundColor
// → "rgb(255, 255, 255)"
```

---

## Erreurs Fréquentes

### 1. Cache du Navigateur

**Problème** : Les changements ne s'affichent pas.

**Solution** : Recharger avec cache clear (Cmd+Shift+R).

### 2. Traduction Manquante

**Problème** : Affiche la clé au lieu du texte.

**Solution** :
1. Vérifier que la clé existe dans le JSON
2. Vérifier l'orthographe de la clé
3. Vérifier le namespace (`common:`, `sections:`, etc.)

### 3. Props Undefined

**Problème** : `Cannot read property 'name' of undefined`

**Solution** :
1. Vérifier que les props sont bien passées
2. Vérifier les types TypeScript
3. Ajouter des vérifications optionnelles : `basics?.name`

### 4. Alpine.js ne Fonctionne Pas

**Problème** : `x-data` ne fait rien.

**Solution** :
1. Vérifier que Alpine.js est chargé
2. Utiliser `x-cloak` pour masquer avant hydratation
3. Vérifier la console pour erreurs JavaScript

---

[← Nouvelles Fonctionnalités](15-nouvelles-fonctionnalites.md) | [Retour à l'index](README.md) | [Maintenance →](17-maintenance.md)
