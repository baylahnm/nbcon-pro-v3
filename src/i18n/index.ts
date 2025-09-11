import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enCommon from './locales/en/common.json'
import arCommon from './locales/ar/common.json'
import enAuth from './locales/en/auth.json'
import arAuth from './locales/ar/auth.json'
import enSkills from './locales/en/skills.json'
import arSkills from './locales/ar/skills.json'
import enSearchAdvanced from './locales/en/searchAdvanced.json'
import arSearchAdvanced from './locales/ar/searchAdvanced.json'
import enCerts from './locales/en/certs.json'
import arCerts from './locales/ar/certs.json'
import enLanguages from './locales/en/languages.json'
import arLanguages from './locales/ar/languages.json'
import enJobs from './locales/en/jobs.json'
import arJobs from './locales/ar/jobs.json'

// Inject small missing keys without touching large JSON files
// Ensure AR has engineerFiltering.search.locationPlaceholder
try {
  // @ts-ignore
  arCommon.engineerFiltering = {
    // @ts-ignore
    ...(arCommon.engineerFiltering || {}),
    // @ts-ignore
    search: {
      // @ts-ignore
      ...(arCommon.engineerFiltering?.search || {}),
      // Arabic: "e.g., Riyadh, Jeddah"
      locationPlaceholder: 'مثال: الرياض، جدة',
    },
  }
} catch {}

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
    skills: enSkills,
    searchAdvanced: enSearchAdvanced,
    certs: enCerts,
    languages: enLanguages,
    jobs: enJobs,
  },
  ar: {
    common: arCommon,
    auth: arAuth,
    skills: arSkills,
    searchAdvanced: arSearchAdvanced,
    certs: arCerts,
    languages: arLanguages,
    jobs: arJobs,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    ns: ['common', 'auth', 'skills', 'searchAdvanced', 'certs', 'languages', 'jobs'],
    defaultNS: 'common',
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
