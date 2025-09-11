import type { TFunction } from 'i18next'

export type SkillSlug =
  | 'autocad'
  | 'revit'
  | 'project-management'
  | 'structural-analysis'
  | 'hvac-design'
  | 'energy-efficiency'
  | 'building-systems'
  | '3d-modeling'
  | 'safety-assessment'
  | 'building-codes'
  | 'seismic-design'
  | 'power-systems'
  | 'lighting-design'
  | 'smart-buildings'
  | 'renewable-energy'

export interface DemoEngineer {
  id: string
  name: string
  title: string
  rating: number
  reviews: number
  location: string
  experience: string
  hourlyRate: string
  matchScore: number
  responseTime: string
  availability: string
  availabilityKey: 'now' | 'thisWeek' | 'thisMonth'
  skills: SkillSlug[]
  isVerified: boolean
  isOnline: boolean
  avatar: string
  lastActive: string
  // Optional fields used by some pages
  portfolio?: number
  completionRate?: string
  certifications?: string[]
  languages?: string[]
}

export type EngineerPool = Record<SkillSlug, DemoEngineer[]>

// Lightweight seeded RNG utilities for deterministic shuffles
export const xmur3 = (str: string) => {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return (h ^= h >>> 16) >>> 0
  }
}

export const sfc32 = (a: number, b: number, c: number, d: number) => {
  return () => {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0
    let t = (a + b) | 0
    a = b ^ (b >>> 9)
    b = (c + (c << 3)) | 0
    c = (c << 21) | (c >>> 11)
    d = (d + 1) | 0
    t = (t + d) | 0
    c = (c + t) | 0
    return (t >>> 0) / 4294967296
  }
}

export const seededRng = (seedStr: string) => {
  const seed = xmur3(seedStr)
  return sfc32(seed(), seed(), seed(), seed())
}

export const pickN = <T,>(arr: T[], n: number, rng?: () => number): T[] => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const r = rng ? rng() : Math.random()
    const j = Math.floor(r * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, Math.min(n, copy.length))
}

// Normalize various tab ids to canonical slugs used by the pool
export const normalizeSkillId = (id: string): SkillSlug | undefined => {
  const map: Record<string, SkillSlug> = {
    autocad: 'autocad',
    revit: 'revit',
    'project-management': 'project-management',
    projectManagement: 'project-management',
    'structural-analysis': 'structural-analysis',
    structuralAnalysis: 'structural-analysis',
    'hvac-design': 'hvac-design',
    hvacDesign: 'hvac-design',
    'energy-efficiency': 'energy-efficiency',
    energyEfficiency: 'energy-efficiency',
    'building-systems': 'building-systems',
    buildingSystems: 'building-systems',
    '3d-modeling': '3d-modeling',
    modeling3d: '3d-modeling',
    'safety-assessment': 'safety-assessment',
    safetyAssessment: 'safety-assessment',
    'building-codes': 'building-codes',
    buildingCodes: 'building-codes',
    'seismic-design': 'seismic-design',
    seismicDesign: 'seismic-design',
    'power-systems': 'power-systems',
    powerSystems: 'power-systems',
    'lighting-design': 'lighting-design',
    lightingDesign: 'lighting-design',
    'smart-buildings': 'smart-buildings',
    smartBuildings: 'smart-buildings',
    'renewable-energy': 'renewable-energy',
    renewableEnergy: 'renewable-energy',
  }
  return map[id]
}

export const createEngineerPool = (t: TFunction<'common'>, language: string): EngineerPool => {
  const city = (slug: string) => t(`engineerFiltering.locations.${slug}`, slug)
  const now = (m: string) => m
  const base = (
    id: string,
    name: string,
    title: string,
    locationSlug: string,
    experience: string,
    rate: string,
    score: number,
    response: string,
    availabilityKey: 'now' | 'thisWeek' | 'thisMonth',
    skills: SkillSlug[],
    lastActive: string,
    rating: number,
    reviews: number,
    online = true,
  ): DemoEngineer => ({
    id,
    name,
    title,
    rating,
    reviews,
    location: city(locationSlug),
    experience,
    hourlyRate: rate,
    matchScore: score,
    responseTime: response,
    availability: t(`engineerFiltering.availability.${availabilityKey}`, availabilityKey),
    availabilityKey,
    skills,
    isVerified: true,
    isOnline: online,
    avatar: '/api/placeholder/60/60',
    lastActive: now(lastActive),
    portfolio: 12,
    completionRate: '98%',
    certifications: [],
    languages: [],
  })

  // NOTE: Names are sample Arabic strings; titles are English for localization mapping in UI
  const p: EngineerPool = {
    'autocad': [
      base('ac1', 'عبدالله الحربي', 'Senior Civil Engineer', 'riyadh', '8 years', 'SAR 150', 95, '2 hours', 'now', ['autocad','revit','project-management'], '2 minutes ago', 4.9, 127, true),
      base('ac2', 'ليلى القحطاني', 'Structural Engineer', 'jeddah', '5-10 years', 'SAR 140', 90, '1 hour', 'thisWeek', ['autocad','structural-analysis'], '10 minutes ago', 4.7, 88, false),
      base('ac3', 'ناصر الزهراني', 'Mechanical Engineer', 'dammam', '6 years', 'SAR 130', 88, '3 hours', 'thisMonth', ['autocad','hvac-design'], '30 minutes ago', 4.6, 75, true),
    ],
    'revit': [
      base('rv1', 'سارة العتيبي', 'Architect', 'riyadh', '5 years', 'SAR 125', 92, '1 hour', 'thisWeek', ['revit','3d-modeling'], '20 minutes ago', 4.8, 96, false),
      base('rv2', 'ناصر الزهراني', 'Senior Civil Engineer', 'jeddah', '8 years', 'SAR 145', 93, '2 hours', 'now', ['revit','autocad','building-codes'], '5 minutes ago', 4.9, 110, true),
    ],
    'project-management': [
      base('pm1', 'محمد الغامدي', 'Project Manager', 'riyadh', '10+ years', 'SAR 200', 96, '3 hours', 'thisMonth', ['project-management','building-systems'], '1 hour ago', 4.8, 140, true),
      base('pm2', 'نورة الشمري', 'Senior Civil Engineer', 'dammam', '6 years', 'SAR 160', 90, '2 hours', 'now', ['project-management','smart-buildings'], '15 minutes ago', 4.6, 72, false),
    ],
    'structural-analysis': [
      base('sa1', 'خالد الدوسري', 'Structural Engineer', 'riyadh', '10+ years', 'SAR 180', 94, '3 hours', 'thisMonth', ['structural-analysis','building-codes'], '5 minutes ago', 4.9, 156, true),
      base('sa2', 'ريم المطيري', 'Structural Engineer', 'jeddah', '5-10 years', 'SAR 155', 89, '2 hours', 'thisWeek', ['structural-analysis','seismic-design'], '40 minutes ago', 4.7, 98, false),
    ],
    'hvac-design': [
      base('hv1', 'أحمد الشريف', 'Mechanical Engineer', 'jeddah', '6 years', 'SAR 120', 92, '1 hour', 'thisWeek', ['hvac-design','energy-efficiency'], '1 hour ago', 4.8, 89, false),
      base('hv2', 'رنا الشلهوب', 'Mechanical Engineer', 'riyadh', '5-10 years', 'SAR 135', 90, '2 hours', 'now', ['hvac-design','building-systems'], '12 minutes ago', 4.7, 76, true),
    ],
    'energy-efficiency': [
      base('ee1', 'سلمان العبدالله', 'Environmental Engineer', 'dammam', '8 years', 'SAR 140', 91, '2 hours', 'thisWeek', ['energy-efficiency','smart-buildings'], '25 minutes ago', 4.6, 70, true),
      base('ee2', 'أريج السبيعي', 'Architect', 'riyadh', '5 years', 'SAR 110', 88, '4 hours', 'thisMonth', ['energy-efficiency','lighting-design'], '18 minutes ago', 4.5, 60, false),
    ],
    'building-systems': [
      base('bs1', 'تركي العنزي', 'Electrical Engineer', 'riyadh', '2-5 years', 'SAR 100', 85, '3 hours', 'now', ['building-systems','power-systems'], '30 minutes ago', 4.4, 50, true),
      base('bs2', 'نجلاء العمري', 'Project Manager', 'jeddah', '5-10 years', 'SAR 170', 90, '2 hours', 'thisWeek', ['building-systems','smart-buildings'], '55 minutes ago', 4.6, 66, false),
    ],
    '3d-modeling': [
      base('m31', 'مالك البقمي', 'Architect', 'riyadh', '5 years', 'SAR 120', 89, '2 hours', 'thisMonth', ['3d-modeling','revit'], '35 minutes ago', 4.7, 81, true),
      base('m32', 'هند العبدالكريم', 'Architect', 'dammam', '2-5 years', 'SAR 100', 86, '4 hours', 'thisWeek', ['3d-modeling','lighting-design'], '22 minutes ago', 4.5, 47, false),
    ],
    'safety-assessment': [
      base('sf1', 'علي الشهري', 'Structural Engineer', 'jeddah', '8 years', 'SAR 150', 90, '3 hours', 'now', ['safety-assessment','building-codes'], '50 minutes ago', 4.6, 74, true),
      base('sf2', 'مي الجهني', 'Civil Engineer', 'riyadh', '5-10 years', 'SAR 130', 87, '2 hours', 'thisMonth', ['safety-assessment','structural-analysis'], '1 hour ago', 4.4, 52, false),
    ],
    'building-codes': [
      base('bc1', 'بندر القحطاني', 'Senior Civil Engineer', 'riyadh', '10+ years', 'SAR 180', 93, '2 hours', 'thisWeek', ['building-codes','project-management'], '12 minutes ago', 4.9, 162, true),
      base('bc2', 'دلال الحربي', 'Architect', 'jeddah', '6 years', 'SAR 120', 88, '1 hour', 'now', ['building-codes','3d-modeling'], '28 minutes ago', 4.6, 77, false),
    ],
    'seismic-design': [
      base('sd1', 'فيصل القرني', 'Structural Engineer', 'dammam', '5-10 years', 'SAR 160', 91, '2 hours', 'thisWeek', ['seismic-design','structural-analysis'], '40 minutes ago', 4.7, 84, true),
      base('sd2', 'نوف العسيري', 'Structural Engineer', 'riyadh', '8 years', 'SAR 150', 90, '3 hours', 'thisMonth', ['seismic-design','building-codes'], '16 minutes ago', 4.6, 79, false),
    ],
    'power-systems': [
      base('ps1', 'راكان القحطاني', 'Electrical Engineer', 'riyadh', '5-10 years', 'SAR 140', 89, '2 hours', 'now', ['power-systems','lighting-design'], '26 minutes ago', 4.6, 72, true),
      base('ps2', 'آلاء الزيدي', 'Electrical Engineer', 'jeddah', '2-5 years', 'SAR 110', 86, '4 hours', 'thisWeek', ['power-systems','smart-buildings'], '1 hour ago', 4.4, 53, false),
    ],
    'lighting-design': [
      base('ld1', 'هيفاء الدوسري', 'Architect', 'dammam', '5 years', 'SAR 115', 87, '3 hours', 'thisMonth', ['lighting-design','energy-efficiency'], '1 hour ago', 4.5, 61, false),
      base('ld2', 'زياد الفيفي', 'Electrical Engineer', 'riyadh', '8 years', 'SAR 135', 90, '2 hours', 'now', ['lighting-design','power-systems'], '8 minutes ago', 4.7, 83, true),
    ],
    'smart-buildings': [
      base('sb1', 'مشعل السبيعي', 'Project Manager', 'riyadh', '6 years', 'SAR 170', 92, '1 hour', 'thisWeek', ['smart-buildings','building-systems'], '42 minutes ago', 4.8, 90, true),
      base('sb2', 'سناء الرشيد', 'Architect', 'jeddah', '2-5 years', 'SAR 110', 85, '4 hours', 'now', ['smart-buildings','energy-efficiency'], '55 minutes ago', 4.4, 49, false),
    ],
    'renewable-energy': [
      base('re1', 'عبدالرحمن المطيري', 'Electrical Engineer', 'dammam', '5-10 years', 'SAR 140', 90, '2 hours', 'thisMonth', ['renewable-energy','energy-efficiency'], '33 minutes ago', 4.6, 76, true),
      base('re2', 'هدى العبداللطيف', 'Environmental Engineer', 'riyadh', '6 years', 'SAR 125', 88, '3 hours', 'now', ['renewable-energy','smart-buildings'], '14 minutes ago', 4.5, 64, false),
    ],
  }
  return p
}

export const buildEngineersForTab = (
  pool: EngineerPool,
  activeId: string,
  seedPrefix = ''
): DemoEngineer[] => {
  if (activeId === 'all') {
    const all: DemoEngineer[] = []
    Object.entries(pool).forEach(([skill, list]) => {
      const rng = seededRng(`${seedPrefix}all-${skill}`)
      all.push(...pickN(list, 2, rng))
    })
    return all
  }
  const slug = normalizeSkillId(activeId)
  if (!slug) return []
  const list = pool[slug] || []
  const n = Math.min(3, Math.max(2, list.length))
  const rng = seededRng(`${seedPrefix}tab-${slug}`)
  return pickN(list, n, rng)
}

