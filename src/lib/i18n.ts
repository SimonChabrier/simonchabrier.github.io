export const languages = {
  fr: 'Français',
  en: 'English',
} as const

export type Lang = keyof typeof languages

export const defaultLang: Lang = 'fr'

export const translations = {
  fr: {
    aboutTitle: "A propos",
    educationTitle: "Formations",
    certificatesTitle: "Diplômes et Certifications",
    experienceTitle: "Expérience",
    current: "Actuel",
    missions: "Missions:",
    responsibilities: "Responsabilités:",
    achievements: "Réalisations:",
    seeMore: "Voir plus",
    seeLess: "Voir moins",
    projectsTitle: "Réalisations",
    projectsIntro: "Quelques projets représentatifs de ces deux dernières années...",
    skillsTitle: "Technologies",
    level: "Niveau",
    changeLanguage: "Changer la langue",
    changeTheme: "Changer le thème",
    system: "Système",
    dark: "Sombre",
    light: "Clair",
    pressCmd: "Presser",
    toOpen: "pour ouvrir les commandes.",
    search: "Rechercher",
    print: "Imprimer",
    legalButton: "Mentions & Confidentialité",
    legalTitle: "Informations légales",
  },
  en: {
    aboutTitle: "About",
    educationTitle: "Education",
    certificatesTitle: "Degrees and Certifications",
    experienceTitle: "Experience",
    current: "Current",
    missions: "Missions:",
    responsibilities: "Responsibilities:",
    achievements: "Achievements:",
    seeMore: "Show more",
    seeLess: "Show less",
    projectsTitle: "Projects",
    projectsIntro: "A few representative projects from the last two years...",
    skillsTitle: "Technologies",
    level: "Level",
    changeLanguage: "Change language",
    changeTheme: "Change theme",
    system: "System",
    dark: "Dark",
    light: "Light",
    pressCmd: "Press",
    toOpen: "to open commands.",
    search: "Search",
    print: "Print",
    legalButton: "Legal & Privacy",
    legalTitle: "Legal information",
  }
} as const;

export function getLangFromUrl(url: URL): Lang {
  const lang = url.searchParams.get('lang');
  return (lang === 'en' || lang === 'fr' ? lang : defaultLang) as Lang;
}

export function useTranslations(lang: Lang) {
  return (key: keyof typeof translations.fr): string => {
    return translations[lang][key] ?? translations[defaultLang][key];
  };
}
