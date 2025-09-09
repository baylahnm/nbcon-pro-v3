import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enCommon from './locales/en/common.json'
import arCommon from './locales/ar/common.json'
import enAuth from './locales/en/auth.json'
import arAuth from './locales/ar/auth.json'

const resources = {
  en: {
    common: enCommon,
    auth: enAuth,
  },
  ar: {
    common: arCommon,
    auth: arAuth,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
