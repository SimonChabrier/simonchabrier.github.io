# 🧩 Composants Principaux

Ce document détaille les composants Astro principaux de mon portfolio.

---

## Hero.astro

**Responsabilité** : Section d'en-tête avec photo, nom, poste, localisation et contacts.

### Props

```typescript
interface Props {
  basics: Basics;
  locale: Locale;
}
```

### Fonctionnalités

- 📸 **Image responsive** avec `srcset` (128w, 256w)
- 🚀 **`fetchpriority="high"`** pour optimiser LCP
- 📧 **Copie email au clic** (Alpine.js)
- 🌐 **Liens vers profils sociaux** (GitHub, LinkedIn, X)
- 🎨 **Gestion du thème** (utilise theme.ts)
- 📞 **Liens téléphone et email** avec aria-label traduits

### Code Clé

```astro
---
import { t } from "@/utils/i18n";

const { basics, locale } = Astro.props;
const { name, label, image, imagesmall, location, profiles, phone, email } = basics;

const showProfileText = t("sections:hero.showProfile", { lng: locale, name });
---

<img
  src={image}
  alt={name}
  fetchpriority="high"
  srcset={`${imagesmall} 128w, ${image} 256w`}
  sizes="(max-width: 640px) 128px, 256px"
  width="256"
  height="256"
/>

<h1>{name}</h1>
<p>{label}</p>
<p>{location.city}, {location.region}</p>

<script>
  import { initializeTheme, updateTheme, setupPrintHandlers } from "@/utils/theme";
  const select = document.getElementById("themeSwitch");
  if (select) {
    initializeTheme(select);
    setupPrintHandlers(select);
    select.addEventListener("change", (e) => {
      updateTheme(e.target.value);
    });
  }
</script>
```

---

## Experience.astro

**Responsabilité** : Liste des expériences professionnelles avec expand/collapse.

### Props

```typescript
interface Props {
  work: Work[];
  locale: Locale;
}
```

### Fonctionnalités

- 📅 **Dates formatées** (startYear - endYear ou "Actuel")
- 🔽 **Expand/collapse** avec Alpine.js
- 🏷️ **Tags de compétences** avec icônes SVG
- 🔗 **Lien vers le site de l'entreprise**
- 📍 **Type de lieu** (Remote, Hybrid, On-site)

### Code Clé

```astro
---
const titleText = t("sections:experience.title", { lng: locale });
const nowText = t("sections:experience.now", { lng: locale });
const moreText = t("components:experience.showMore", { lng: locale });
const lessText = t("components:experience.showLess", { lng: locale });
---

{work.map(({ name, position, startDate, endDate, summary, responsibilities, achievements, skills }) => {
  const startYear = new Date(startDate).getFullYear();
  const endYear = endDate ? new Date(endDate).getFullYear() : nowText;

  return (
    <article x-data="{ expanded: false }">
      <header>
        <h3>{position}</h3>
        <p>{name} · {startYear} - {endYear}</p>
      </header>

      <!-- Missions (toujours visibles) -->
      <div>
        <h4>Missions:</h4>
        <ul>
          {Array.isArray(summary) ? (
            summary.map(item => <li>{item}</li>)
          ) : (
            <li>{summary}</li>
          )}
        </ul>
      </div>

      <!-- Contenu expandable -->
      <div x-show="expanded" x-collapse>
        {responsibilities && (
          <div>
            <h4>Responsabilités:</h4>
            <ul>{responsibilities.map(r => <li>{r}</li>)}</ul>
          </div>
        )}

        {achievements && (
          <div>
            <h4>Réalisations:</h4>
            <ul>{achievements.map(a => <li>{a}</li>)}</ul>
          </div>
        )}
      </div>

      <!-- Bouton toggle -->
      <button @click="expanded = !expanded">
        <span x-text="expanded ? lessText : moreText"></span>
      </button>

      <!-- Tags compétences -->
      {skills && (
        <div>
          {skills.map(skill => (
            <span class="badge">{skill}</span>
          ))}
        </div>
      )}
    </article>
  );
})}
```

---

## Skills.astro

**Responsabilité** : Afficher les compétences avec niveau et mots-clés dans un tooltip.

### Props

```typescript
interface Props {
  skills: Skills[];
  locale: Locale;
}
```

### Fonctionnalités

- 🏷️ **Badge pour chaque compétence**
- 💡 **Tooltip au survol** (Alpine.js)
- 📊 **Niveau affiché** dans le tooltip
- 🔤 **Mots-clés associés**

### Code Clé

```astro
<ul>
  {skills.map(({ name, level, keywords }) => (
    <li
      x-data="{ open: false }"
      @mouseenter="open = true"
      @mouseleave="open = false"
      class="relative"
    >
      <span>{name}</span>

      <!-- Tooltip -->
      <div x-show="open" x-cloak class="tooltip">
        <div class="font-semibold">{levelText}: {level}</div>
        <ul class="flex flex-wrap gap-1">
          {keywords?.map(keyword => (
            <li class="badge-small">{keyword}</li>
          ))}
        </ul>
      </div>
    </li>
  ))}
</ul>
```

**⚠️ Correction accessibilité** : Le `x-data` est directement sur le `<li>` (pas de `<div>` wrapper) pour respecter la structure HTML `<ul>` → `<li>`.

---

## KeyboardManager.astro

**Responsabilité** : Gérer la palette de commandes (Cmd+K) avec HotKeyPad.

### Props

```typescript
interface Props {
  profiles: Profiles[];
  locale: Locale;
}
```

### Fonctionnalités

- ⌨️ **Raccourcis clavier** (Cmd+K, Ctrl+P, Ctrl+G, etc.)
- 🌐 **Actions rapides vers profils sociaux**
- 🖨️ **Impression rapide**
- 🔍 **Recherche dans les commandes**

### Code Clé

```astro
---
import { SOCIAL_ICONS_SVG } from "@/constants/social-icons-svg";

const profilesInfo = profiles.map(({ network, url }) => {
  const icon = SOCIAL_ICONS_SVG[network];
  const firstLetter = network[0].toUpperCase();

  return {
    id: network,
    section: "Social",
    title: network,
    url,
    icon,
    hotkey: `ctrl+${firstLetter}`
  };
});
---

<div id="hotkeypad"
     data-info={JSON.stringify(profilesInfo)}
     data-print-text={printText}
     data-search-placeholder={searchPlaceholder}>
</div>

<script>
  import HotKeyPad from "hotkeypad";

  const hotkeypad = new HotKeyPad({
    placeholder: document.querySelector("#hotkeypad")?.getAttribute("data-search-placeholder") ?? "Search"
  });

  const info = hotkeypad.instance.getAttribute("data-info") ?? "[]";
  const parsedInfo = JSON.parse(info);

  const data = parsedInfo.map(({ url, hotkey, icon, id, section, title }) => {
    return {
      id,
      title,
      icon,
      hotkey,
      section,
      handler: () => window.open(url, "_blank")
    };
  });

  const printText = hotkeypad.instance.getAttribute("data-print-text") ?? "Print";

  hotkeypad.setCommands([
    {
      id: "print",
      title: printText,
      icon: `<svg>...</svg>`,
      hotkey: "ctrl+P",
      section: "Actions",
      handler: () => window.print()
    },
    ...data
  ]);

  // Fix accessibilité des h4 de HotKeyPad
  document.querySelectorAll('[data-container] h4').forEach((header) => {
    if (header.textContent === 'Actions') {
      header.setAttribute('aria-label', header.textContent);
    } else if (header.textContent === 'Social') {
      header.setAttribute('aria-label', 'Social');
    }
  });
</script>
```

**📝 Note** : Les icônes sont en format string car HotKeyPad ne peut pas utiliser de composants Astro.

---

## ThemeSwitch.astro

**Responsabilité** : Sélecteur de thème (System/Light/Dark).

### Props

```typescript
interface Props {
  locale: Locale;
}
```

### Fonctionnalités

- 🌓 **3 modes** : System, Light, Dark
- 💾 **Sauvegarde dans localStorage**
- 🔄 **Application immédiate** sans reload

### Code Clé

```astro
---
import { t } from "@/utils/i18n";

const labelText = t("common:theme.label", { lng: locale });
const systemText = t("common:theme.system", { lng: locale });
const lightText = t("common:theme.light", { lng: locale });
const darkText = t("common:theme.dark", { lng: locale });
---

<label for="themeSwitch">{labelText}</label>
<select id="themeSwitch">
  <option value="system">{systemText}</option>
  <option value="light">{lightText}</option>
  <option value="dark">{darkText}</option>
</select>

<script>
  import { initializeTheme, updateTheme } from "@/utils/theme";

  const select = document.getElementById("themeSwitch");
  if (select) {
    initializeTheme(select);
    select.addEventListener("change", (e) => {
      updateTheme(e.target.value);
    });
  }
</script>
```

---

## LocaleSwitch.astro

**Responsabilité** : Sélecteur de langue (FR/EN).

### Props

```typescript
interface Props {
  locale: Locale;
}
```

### Fonctionnalités

- 🌍 **Affiche le drapeau** de la langue actuelle
- 💾 **Sauvegarde dans localStorage**
- 🔄 **Redirection** vers `/fr/` ou `/en/`

### Code Clé

```astro
---
import FlagFr from "@/icons/FlagFr.astro";
import FlagEn from "@/icons/FlagEn.astro";

const labelText = t("common:locale.label", { lng: locale });
const frText = t("common:locale.fr", { lng: locale });
const enText = t("common:locale.en", { lng: locale });
---

<label for="localeSwitch">
  {locale === "fr" ? <FlagFr /> : <FlagEn />}
  {labelText}
</label>

<select id="localeSwitch">
  <option value="fr" selected={locale === "fr"}>{frText}</option>
  <option value="en" selected={locale === "en"}>{enText}</option>
</select>

<script>
  import { switchLocale } from "@/utils/locale";

  const select = document.getElementById("localeSwitch");
  select?.addEventListener("change", function() {
    switchLocale(this.value);
  });
</script>
```

---

## Dialog.astro

**Responsabilité** : Modale pour afficher les mentions légales.

### Props

```typescript
interface Props {
  legalInfo: any;  // Structure de mentions-fr.json / mentions-en.json
  locale: Locale;
}
```

### Fonctionnalités

- 📄 **Affichage des mentions légales**
- ❌ **Fermeture par bouton** ou click backdrop
- ⌨️ **Fermeture avec Escape**
- ♿ **Focus trap** avec Alpine.js

### Code Clé

```astro
<div x-data="{ open: false }">
  <button @click="open = true">
    {t("components:dialog.legal", { lng: locale })}
  </button>

  <div x-show="open" x-cloak class="fixed inset-0 z-50">
    <!-- Backdrop -->
    <div @click="open = false" class="fixed inset-0 bg-black/50"></div>

    <!-- Modal -->
    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4">
        <div @click.away="open = false" @keydown.escape.window="open = false"
             class="bg-skin-fill rounded-lg p-6 max-w-2xl w-full">

          <h2>{legalInfo.heading}</h2>

          {legalInfo.sections.map(section => (
            <section>
              <h3>{section.title}</h3>
              {section.paragraph && <p>{section.paragraph}</p>}
              {section.sites && (
                <div>
                  <p>{section.sites.name}</p>
                  {Object.entries(section.sites.urls).map(([key, url]) => (
                    <a href={url}>{key}</a>
                  ))}
                </div>
              )}
            </section>
          ))}

          <button @click="open = false">
            {t("components:dialog.close", { lng: locale })}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## Section.astro

**Responsabilité** : Wrapper générique pour les sections avec titre H2.

### Props

```typescript
interface Props {
  title: string;
  className?: string;
}
```

### Code

```astro
---
const { title, className } = Astro.props;
---

<section class={className}>
  <h2 class="text-2xl font-bold mb-4 text-skin-base">
    {title}
  </h2>
  <slot />
</section>
```

**Utilisation** :
```astro
<Section title="Compétences">
  <!-- Contenu de la section -->
</Section>
```

---

## Conventions

### ✅ Toujours passer `locale`

Tous les composants qui utilisent des traductions reçoivent `locale` en prop.

### ✅ Utiliser des interfaces TypeScript

```astro
---
interface Props {
  basics: Basics;
  locale: Locale;
}

const { basics, locale } = Astro.props;
---
```

### ✅ Traduire tous les textes visibles

```astro
const text = t("sections:hero.title", { lng: locale });
```

### ✅ Utiliser Alpine.js pour l'interactivité

```html
<div x-data="{ open: false }">
  <button @click="open = !open">Toggle</button>
  <div x-show="open">Contenu</div>
</div>
```

---

[← Styling & CSS](08-styling.md) | [Retour à l'index](README.md) | [Utilitaires →](10-utilitaires.md)
