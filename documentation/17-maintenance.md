# ✅ Maintenance & Checklist

## Statistiques du Projet

### Métriques Actuelles

- **Score** : 9.5/10
- **Build time** : ~3.3s
- **Fichiers** : 49 fichiers TypeScript/Astro
- **Dépendances** : 9 packages
- **Traductions** : 6 fichiers JSON (3 par langue)
- **Composants** : 15 composants Astro
- **Icônes SVG** : 23 fichiers
- **0 erreurs** de build
- **0 warnings** en production

### Optimisations Appliquées

- ✅ Icônes dédupliquées (constantes centralisées)
- ✅ Images social media (og:image, twitter:image)
- ✅ fetchpriority="high" sur hero image
- ✅ Script Hero refactorisé (utilise theme.ts)
- ✅ console.warn conditionnés (DEV only)
- ✅ Accessibilité WCAG 2.1 AA

---

## Checklist Pré-Modification

Avant d'ajouter ou modifier du code :

- [ ] J'ai lu la documentation correspondante
- [ ] J'ai identifié les composants/fichiers à modifier
- [ ] J'ai ajouté les traductions (FR + EN)
- [ ] J'ai testé en mode DEV (`pnpm dev`)
- [ ] Je comprends l'impact de mes changements

---

## Checklist Post-Modification

Après chaque modification :

### 1. Build & Types

```bash
# Vérifie les types
pnpm astro check
# ✅ 0 errors, 0 warnings

# Build réussit
pnpm build
# ✅ Terminé en ~3.3s
```

### 2. Fonctionnalités

- [ ] Les traductions fonctionnent (FR + EN)
- [ ] Le thème s'applique correctement (light/dark/system)
- [ ] Le changement de langue fonctionne
- [ ] La palette de commandes fonctionne (Cmd+K)

### 3. Responsive

- [ ] Mobile (< 640px)
- [ ] Tablet (640px - 1024px)
- [ ] Desktop (> 1024px)

### 4. Impression

```bash
# Tester Cmd+P
# Vérifier que :
```
- [ ] Le mode light est appliqué
- [ ] Les éléments `.no-print` sont masqués
- [ ] Le layout est adapté

### 5. Accessibilité

- [ ] Navigation clavier fonctionne
- [ ] Focus visible sur tous les éléments
- [ ] ARIA labels présents
- [ ] Pas de violations (tester avec axe DevTools)

### 6. SEO

```bash
# Vérifier les meta tags
grep "og:image" dist/fr/index.html
grep "twitter:image" dist/fr/index.html
```

- [ ] og:image avec URL absolue correcte
- [ ] twitter:image avec URL absolue correcte
- [ ] title et description présents

### 7. Console Propre

- [ ] Aucune erreur dans la console (PROD)
- [ ] Aucun warning dans la console (PROD)
- [ ] Warnings visibles uniquement en DEV

---

## Maintenance Régulière

### Mettre à Jour les Dépendances

```bash
# Vérifier les mises à jour
pnpm outdated

# Mettre à jour
pnpm update

# Rebuild et tester
pnpm build
```

### Mettre à Jour le CV

1. Éditer `cv-fr.json` et `cv-en.json`
2. Vérifier la syntaxe JSON : `cat cv-fr.json | jq .`
3. Rebuild : `pnpm build`
4. Preview : `pnpm preview`
5. Deploy

### Ajouter une Traduction

1. Identifier le namespace (`common`, `components`, `sections`)
2. Ajouter dans FR et EN simultanément
3. Tester en DEV
4. Rebuild et deploy

---

## Ressources & Liens Utiles

### Documentation Officielle

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Alpine.js](https://alpinejs.dev)
- [HotKeyPad](https://github.com/vincjo/hotkeypad)

### Standards

- [JSON Resume](https://jsonresume.org/schema/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [Open Graph Protocol](https://ogp.me/)

### Outils

- [OpenGraph.xyz](https://www.opengraph.xyz/) - Tester Open Graph
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance
- [axe DevTools](https://www.deque.com/axe/devtools/) - Accessibilité

---

## Versioning

### Changelog

**Version 1.0.0** (Décembre 2024)
- ✅ Refactoring complet avec i18n custom
- ✅ Suppression des dépendances inutiles
- ✅ Optimisations SEO et performance
- ✅ Corrections accessibilité WCAG 2.1 AA
- ✅ Documentation modulaire complète

---

## Contact & Support

Pour toute question ou problème :

- **Email** : contact@simonchabrier.fr
- **GitHub** : [@simonchabrier](https://github.com/simonchabrier)
- **LinkedIn** : [Simon Chabrier](https://linkedin.com/in/simonchabrier)

---

**📅 Dernière mise à jour** : Décembre 2024
**🔖 Version** : 1.0.0
**👤 Auteur** : Simon Chabrier

---

[← Debugging](16-debugging.md) | [Retour à l'index](README.md)
