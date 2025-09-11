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

// Ensure AR has realTimeMatching.more for overflow label
try {
  // @ts-ignore
  arCommon.realTimeMatching = {
    // @ts-ignore
    ...(arCommon.realTimeMatching || {}),
    more: 'المزيد',
  }
} catch {}

// Hardening: ensure statusTracking keys exist in both EN and AR
try {
  // @ts-ignore
  enCommon.statusTracking = {
    // @ts-ignore
    ...(enCommon.statusTracking || {}),
    title: enCommon.statusTracking?.title ?? 'Job Status Tracking',
    description: enCommon.statusTracking?.description ?? 'Track and manage your job progress, milestones, and team collaboration',
    searchPlaceholder: enCommon.statusTracking?.searchPlaceholder ?? 'Search jobs by title, client, or engineer...',
    viewArchive: enCommon.statusTracking?.viewArchive ?? 'View Archive',
    allJobs: enCommon.statusTracking?.allJobs ?? 'All Jobs',
    pending: enCommon.statusTracking?.pending ?? 'Pending',
    inProgress: enCommon.statusTracking?.inProgress ?? 'In Progress',
    completed: enCommon.statusTracking?.completed ?? 'Completed',
    onHold: enCommon.statusTracking?.onHold ?? 'On Hold',
    client: enCommon.statusTracking?.client ?? 'Client',
    engineer: enCommon.statusTracking?.engineer ?? 'Engineer',
    location: enCommon.statusTracking?.location ?? 'Location',
    progress: enCommon.statusTracking?.progress ?? 'Progress',
    spent: enCommon.statusTracking?.spent ?? 'Spent',
    complete: enCommon.statusTracking?.complete ?? 'Complete',
    start: enCommon.statusTracking?.start ?? 'Start',
    end: enCommon.statusTracking?.end ?? 'End',
    lastUpdate: enCommon.statusTracking?.lastUpdate ?? 'Last Update',
    next: enCommon.statusTracking?.next ?? 'Next',
    due: enCommon.statusTracking?.due ?? 'Due',
    viewDetails: enCommon.statusTracking?.viewDetails ?? 'View Details',
    jobTitles: {
      ...(enCommon.statusTracking?.jobTitles || {}),
      officeBuildingDesign: enCommon.statusTracking?.jobTitles?.officeBuildingDesign ?? 'Office Building Design',
      shoppingMallRenovation: enCommon.statusTracking?.jobTitles?.shoppingMallRenovation ?? 'Shopping Mall Renovation',
      residentialComplexDesign: enCommon.statusTracking?.jobTitles?.residentialComplexDesign ?? 'Residential Complex Design',
    },
    clients: {
      ...(enCommon.statusTracking?.clients || {}),
      alRajhiConstruction: enCommon.statusTracking?.clients?.alRajhiConstruction ?? 'Al-Rajhi Construction',
      saudiAramco: enCommon.statusTracking?.clients?.saudiAramco ?? 'Saudi Aramco',
      neom: enCommon.statusTracking?.clients?.neom ?? 'NEOM',
    },
    locations: {
      ...(enCommon.statusTracking?.locations || {}),
      riyadh: enCommon.statusTracking?.locations?.riyadh ?? 'Riyadh, Saudi Arabia',
      dhahran: enCommon.statusTracking?.locations?.dhahran ?? 'Dhahran, Saudi Arabia',
      tabuk: enCommon.statusTracking?.locations?.tabuk ?? 'Tabuk, Saudi Arabia',
    },
    descriptions: {
      ...(enCommon.statusTracking?.descriptions || {}),
      officeBuildingDesign: enCommon.statusTracking?.descriptions?.officeBuildingDesign ?? 'Complete architectural and structural design for modern office building with sustainable features.',
      shoppingMallRenovation: enCommon.statusTracking?.descriptions?.shoppingMallRenovation ?? 'Comprehensive renovation and modernization of existing shopping mall.',
      residentialComplexDesign: enCommon.statusTracking?.descriptions?.residentialComplexDesign ?? 'Design and development of luxury residential complex with modern amenities.',
    },
    milestoneTitles: {
      ...(enCommon.statusTracking?.milestoneTitles || {}),
      detailedDrawings: enCommon.statusTracking?.milestoneTitles?.detailedDrawings ?? 'Detailed Drawings',
    },
  }
} catch {}

try {
  // @ts-ignore
  arCommon.statusTracking = {
    // @ts-ignore
    ...(arCommon.statusTracking || {}),
    title: arCommon.statusTracking?.title ?? 'تتبع حالة الوظيفة',
    description: arCommon.statusTracking?.description ?? 'تتبع وإدارة تقدم العمل، المعالم، وتعاون الفريق',
    searchPlaceholder: arCommon.statusTracking?.searchPlaceholder ?? 'ابحث عن الوظائف حسب العنوان أو العميل أو المهندس...',
    viewArchive: arCommon.statusTracking?.viewArchive ?? 'عرض الأرشيف',
    allJobs: arCommon.statusTracking?.allJobs ?? 'كل الوظائف',
    pending: arCommon.statusTracking?.pending ?? 'قيد الانتظار',
    inProgress: arCommon.statusTracking?.inProgress ?? 'قيد التنفيذ',
    completed: arCommon.statusTracking?.completed ?? 'مكتمل',
    onHold: arCommon.statusTracking?.onHold ?? 'معلق',
    client: arCommon.statusTracking?.client ?? 'العميل',
    engineer: arCommon.statusTracking?.engineer ?? 'المهندس',
    location: arCommon.statusTracking?.location ?? 'الموقع',
    progress: arCommon.statusTracking?.progress ?? 'التقدم',
    spent: arCommon.statusTracking?.spent ?? 'المنفق',
    complete: arCommon.statusTracking?.complete ?? 'اكتمال',
    start: arCommon.statusTracking?.start ?? 'البدء',
    end: arCommon.statusTracking?.end ?? 'الانتهاء',
    lastUpdate: arCommon.statusTracking?.lastUpdate ?? 'آخر تحديث',
    next: arCommon.statusTracking?.next ?? 'التالي',
    due: arCommon.statusTracking?.due ?? 'الموعد',
    viewDetails: arCommon.statusTracking?.viewDetails ?? 'عرض التفاصيل',
    jobTitles: {
      ...(arCommon.statusTracking?.jobTitles || {}),
      officeBuildingDesign: arCommon.statusTracking?.jobTitles?.officeBuildingDesign ?? 'تصميم مبنى مكاتب',
      shoppingMallRenovation: arCommon.statusTracking?.jobTitles?.shoppingMallRenovation ?? 'تجديد مركز تجاري',
      residentialComplexDesign: arCommon.statusTracking?.jobTitles?.residentialComplexDesign ?? 'تصميم مجمع سكني',
    },
    clients: {
      ...(arCommon.statusTracking?.clients || {}),
      alRajhiConstruction: arCommon.statusTracking?.clients?.alRajhiConstruction ?? 'الراجحي للمقاولات',
      saudiAramco: arCommon.statusTracking?.clients?.saudiAramco ?? 'أرامكو السعودية',
      neom: arCommon.statusTracking?.clients?.neom ?? 'نيوم',
    },
    locations: {
      ...(arCommon.statusTracking?.locations || {}),
      riyadh: arCommon.statusTracking?.locations?.riyadh ?? 'الرياض، المملكة العربية السعودية',
      dhahran: arCommon.statusTracking?.locations?.dhahran ?? 'الظهران، المملكة العربية السعودية',
      tabuk: arCommon.statusTracking?.locations?.tabuk ?? 'تبوك، المملكة العربية السعودية',
    },
    descriptions: {
      ...(arCommon.statusTracking?.descriptions || {}),
      officeBuildingDesign: arCommon.statusTracking?.descriptions?.officeBuildingDesign ?? 'تصميم معماري وإنشائي متكامل لمبنى مكاتب حديث بميزات مستدامة.',
      shoppingMallRenovation: arCommon.statusTracking?.descriptions?.shoppingMallRenovation ?? 'تجديد شامل وتحديث لمركز تسوق قائم.',
      residentialComplexDesign: arCommon.statusTracking?.descriptions?.residentialComplexDesign ?? 'تصميم وتطوير مجمع سكني فاخر بوسائل راحة حديثة.',
    },
    milestoneTitles: {
      ...(arCommon.statusTracking?.milestoneTitles || {}),
      detailedDrawings: arCommon.statusTracking?.milestoneTitles?.detailedDrawings ?? 'رسومات تفصيلية',
    },
  }
} catch {}

// Ensure AR realTimeMatching common keys used in UI exist
try {
  // @ts-ignore
  arCommon.realTimeMatching = {
    // @ts-ignore
    ...(arCommon.realTimeMatching || {}),
    matches: arCommon.realTimeMatching?.matches ?? 'مطابقات',
    lastUpdated: arCommon.realTimeMatching?.lastUpdated ?? 'آخر تحديث',
    refresh: arCommon.realTimeMatching?.refresh ?? 'تحديث',
    matchingEngineers: arCommon.realTimeMatching?.matchingEngineers ?? 'مطابقة المهندسين',
    aiPoweredMatching: arCommon.realTimeMatching?.aiPoweredMatching ?? 'مطابقة مدعومة بالذكاء الاصطناعي قيد التقدم',
    aiDescription: arCommon.realTimeMatching?.aiDescription ?? 'يحلل الذكاء الاصطناعي متطلبات وظيفتك ويجد أفضل المهندسين المطابقين في الوقت الفعلي.',
    jobInfo: {
      ...(arCommon.realTimeMatching?.jobInfo || {}),
      title: arCommon.realTimeMatching?.jobInfo?.title ?? 'تصميم مبنى مكاتب',
      description: arCommon.realTimeMatching?.jobInfo?.description ?? 'تصميم معماري كامل لمبنى مكاتب حديث بميزات مستدامة.',
      budget: arCommon.realTimeMatching?.jobInfo?.budget ?? 'الميزانية',
      location: arCommon.realTimeMatching?.jobInfo?.location ?? 'الموقع',
      timeline: arCommon.realTimeMatching?.jobInfo?.timeline ?? 'المدة الزمنية',
      skills: arCommon.realTimeMatching?.jobInfo?.skills ?? 'المهارات المطلوبة',
    },
    engineer: {
      ...(arCommon.realTimeMatching?.engineer || {}),
      rating: arCommon.realTimeMatching?.engineer?.rating ?? 'التقييم',
      reviews: arCommon.realTimeMatching?.engineer?.reviews ?? 'مراجعات',
      experience: arCommon.realTimeMatching?.engineer?.experience ?? 'الخبرة',
      hourlyRate: arCommon.realTimeMatching?.engineer?.hourlyRate ?? 'ساعة',
      hour: arCommon.realTimeMatching?.engineer?.hour ?? 'ساعة',
      matchScore: arCommon.realTimeMatching?.engineer?.matchScore ?? 'مطابقة',
      availability: arCommon.realTimeMatching?.engineer?.availability ?? 'التوفر',
      lastActive: arCommon.realTimeMatching?.engineer?.lastActive ?? 'آخر نشاط',
      response: arCommon.realTimeMatching?.engineer?.response ?? 'الاستجابة',
      portfolio: arCommon.realTimeMatching?.engineer?.portfolio ?? 'ملف الأعمال',
      projects: arCommon.realTimeMatching?.engineer?.projects ?? 'مشاريع',
      select: arCommon.realTimeMatching?.engineer?.select ?? 'اختيار',
      selected: arCommon.realTimeMatching?.engineer?.selected ?? 'تم الاختيار',
      viewProfile: arCommon.realTimeMatching?.engineer?.viewProfile ?? 'عرض الملف',
      message: arCommon.realTimeMatching?.engineer?.message ?? 'رسالة',
    },
    noMatchesFound: arCommon.realTimeMatching?.noMatchesFound ?? 'لا توجد مطابقات بعد',
    noMatchesHint: arCommon.realTimeMatching?.noMatchesHint ?? 'حاول تعديل متطلبات وظيفتك أو ابدأ المطابقة مرة أخرى.',
    findingEngineers: arCommon.realTimeMatching?.findingEngineers ?? 'جارٍ العثور على أفضل المهندسين...',
    findingDescription: arCommon.realTimeMatching?.findingDescription ?? 'يحلل الذكاء الاصطناعي متطلباتك ويطابقك مع المهندسين المؤهلين.',
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
