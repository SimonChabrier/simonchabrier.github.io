# 🔐 Sécurité

## Liens Externes Sécurisés

### rel="noopener noreferrer"

```html
<a href={url} target="_blank" rel="noopener noreferrer">
  Lien externe
</a>
```

**Protection** :
- `noopener` : Empêche `window.opener` d'être accessible
- `noreferrer` : N'envoie pas le referrer HTTP

---

## Données Sensibles

### tracking.json

```bash
# .gitignore
/public/tracking.json
```

**Raison** : Contient les scripts Matomo qui peuvent inclure des identifiants.

### Pas de Secrets Hardcodés

❌ Ne jamais mettre dans le code :
- API keys
- Tokens
- Mots de passe
- Identifiants Matomo

---

## TypeScript Strict

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Bénéfice** : Détecte les erreurs potentielles à la compilation.

---

## Validation des Entrées

### switchLocale

```typescript
export function switchLocale(targetLocale: Locale): void {
  // Validation implicite via le type Locale = "en" | "fr"
  if (!["en", "fr"].includes(targetLocale)) {
    return; // Protection supplémentaire
  }

  localStorage.setItem("locale", targetLocale);
  window.location.href = `/${targetLocale}/`;
}
```

---

## CSP (Content Security Policy)

**Statut** : Non activé actuellement.

**Si j'active une CSP**, je devrai :

1. **Ajouter des nonces aux scripts inline** :
```html
<script nonce="{{nonce}}">
  // Code inline
</script>
```

2. **Configurer les headers** :
```
Content-Security-Policy: script-src 'self' 'nonce-{{nonce}}';
```

---

## Bonnes Pratiques Appliquées

### ✅ Pas de `eval()`

Je n'utilise jamais `eval()` ou `new Function()`.

### ✅ Pas d'innerHTML avec données utilisateur

Je n'utilise pas `innerHTML` pour injecter du contenu dynamique.

### ✅ Sanitization

Toutes les données du CV sont contrôlées (pas d'input utilisateur).

---

[← Accessibilité](12-accessibilite.md) | [Retour à l'index](README.md) | [Build & Déploiement →](14-build-deploiement.md)
