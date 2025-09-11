import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { SkillChip } from '@/components/ui/SkillChip'
import { 
  Zap, 
  Users, 
  Clock, 
  Star, 
  MapPin,
  DollarSign,
  CheckCircle,
  RefreshCw,
  Eye,
  MessageCircle,
  Search
} from 'lucide-react'
import { formatSar } from '@/i18n/formatters'

const RealTimeMatching = () => {
  const { t, i18n } = useTranslation('common')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isMatching, setIsMatching] = useState(true)
  const [selectedEngineers, setSelectedEngineers] = useState<string[]>([])
  const [matches, setMatches] = useState<any[]>([])
  const [matchCount, setMatchCount] = useState(0)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeSkillTab, setActiveSkillTab] = useState('all')
  
  // Helpers to localize dynamic sample strings
  const localizeTitle = (title: string) => {
    const map: Record<string, string> = {
      'Senior Civil Engineer': 'messages.engineerTitles.seniorCivilEngineer',
      'Mechanical Engineer': 'messages.engineerTitles.mechanicalEngineer',
      'Structural Engineer': 'messages.engineerTitles.structuralEngineer',
      'Electrical Engineer': 'messages.engineerTitles.electricalEngineer',
      'Project Manager': 'messages.engineerTitles.projectManager',
      'Architect': 'messages.engineerTitles.architect',
      'Environmental Engineer': 'messages.engineerTitles.environmentalEngineer',
    }
    const key = map[title]
    return key ? t(key, title) : title
  }

  const localizeExperience = (s: string) => {
    if (i18n.language !== 'ar') return s
    return s.replace(/years?/gi, t('engineerFiltering.engineer.years', 'years'))
  }

  const localizeRelative = (s: string) => {
    if (i18n.language !== 'ar') return s
    return s
      .replace(/minutes? ago/gi, 'دقائق مضت')
      .replace(/hour ago/gi, 'ساعة مضت')
      .replace(/hours?/gi, 'ساعات')
  }

  // Skill tabs for filtering
  const skillTabs = useMemo(() => [
    {
      id: 'all',
      label: t('engineerFiltering.allSkills', 'All Skills'),
      icon: Users
    },
    {
      id: 'autocad',
      label: t('skills:autocad', 'AutoCAD'),
      icon: Search
    },
    {
      id: 'revit',
      label: t('skills:revit', 'Revit'),
      icon: Search
    },
    {
      id: 'project-management',
      label: t('skills:project-management', 'Project Management'),
      icon: Search
    },
    {
      id: 'structural-analysis',
      label: t('skills:structural-analysis', 'Structural Analysis'),
      icon: Search
    },
    {
      id: 'hvac-design',
      label: t('skills:hvac-design', 'HVAC Design'),
      icon: Search
    },
    {
      id: 'energy-efficiency',
      label: t('skills:energy-efficiency', 'Energy Efficiency'),
      icon: Search
    },
    {
      id: 'building-systems',
      label: t('skills:building-systems', 'Building Systems'),
      icon: Search
    },
    {
      id: '3d-modeling',
      label: t('skills:3d-modeling', '3D Modeling'),
      icon: Search
    },
    {
      id: 'safety-assessment',
      label: t('skills:safety-assessment', 'Safety Assessment'),
      icon: Search
    },
    {
      id: 'building-codes',
      label: t('skills:building-codes', 'Building Codes'),
      icon: Search
    },
    {
      id: 'seismic-design',
      label: t('skills:seismic-design', 'Seismic Design'),
      icon: Search
    },
    {
      id: 'power-systems',
      label: t('skills:power-systems', 'Power Systems'),
      icon: Search
    },
    {
      id: 'lighting-design',
      label: t('skills:lighting-design', 'Lighting Design'),
      icon: Search
    },
    {
      id: 'smart-buildings',
      label: t('skills:smart-buildings', 'Smart Buildings'),
      icon: Search
    },
    {
      id: 'renewable-energy',
      label: t('skills:renewable-energy', 'Renewable Energy'),
      icon: Search
    }
  ], [t, i18n.language])

  // Mock job data
  const jobData = {
    id: '1',
    title: t('realTimeMatching.jobInfo.title', 'Office Building Design'),
    description: t('realTimeMatching.jobInfo.description', 'Complete architectural design for modern office building with sustainable features.'),
    budget: 'SAR 15,000 - 50,000',
    location: t('realTimeMatching.jobInfo.location', 'Riyadh, Saudi Arabia'),
    timeline: t('realTimeMatching.jobInfo.timeline', '2-3 weeks'),
    skills: ['AutoCAD', 'Revit', 'Structural Analysis', 'Sustainability'],
    postedAt: new Date()
  }

  // Deterministic seeded RNG utilities + picker
  const xmur3 = (str: string) => {
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

  const sfc32 = (a: number, b: number, c: number, d: number) => {
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

  const seededRng = (seedStr: string) => {
    const seed = xmur3(seedStr)
    return sfc32(seed(), seed(), seed(), seed())
  }

  const pickN = (arr: any[], n: number, rng?: () => number) => {
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--) {
      const r = rng ? rng() : Math.random()
      const j = Math.floor(r * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy.slice(0, Math.min(n, copy.length))
  }

  // Arabic engineer pool grouped by skill slug
  const engineerPool = useMemo(() => {
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
      skills: string[],
      lastActive: string,
      rating: number,
      reviews: number,
      online = true,
    ) => ({
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
    })

    const p: Record<string, any[]> = {
      'autocad': [
        base('ac1', 'عبدالله الحربي', 'Senior Civil Engineer', 'riyadh', '8 years', 'SAR 150', 95, '2 hours', 'now', ['autocad','revit','project-management'], '2 minutes ago', 4.9, 127, true),
        base('ac2', 'ليلى القحطاني', 'Structural Engineer', 'jeddah', '5-10 years', 'SAR 140', 90, '1 hour', 'thisWeek', ['autocad','structural-analysis'], '10 minutes ago', 4.7, 88, false),
        base('ac3', 'حسن الشمري', 'Mechanical Engineer', 'dammam', '6 years', 'SAR 130', 88, '3 hours', 'thisMonth', ['autocad','hvac-design'], '30 minutes ago', 4.6, 75, true),
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
  }, [t, i18n.language])

  // Build the mock list per tab selection
  const mockEngineers = useMemo(() => {
    if (activeSkillTab === 'all') {
      // pick a few from each skill
      const all: any[] = []
      Object.entries(engineerPool).forEach(([skill, list]) => {
        const rng = seededRng(`all-${skill}`)
        all.push(...pickN(list as any[], 2, rng))
      })
      return all
    }
    const list = engineerPool[activeSkillTab] || []
    // 2–3 for the selected skill
    const n = Math.min(3, Math.max(2, list.length))
    const rng = seededRng(`tab-${activeSkillTab}`)
    return pickN(list, n, rng)
  }, [engineerPool, activeSkillTab])

  // Filter engineers based on search and skill tab
  const filteredEngineers = useMemo(() => {
    let filtered = mockEngineers
    if (searchQuery) {
      filtered = filtered.filter(engineer =>
        engineer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        engineer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof engineer.location === 'string' && engineer.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        engineer.skills.some(skill => t(`skills:${skill}`, skill).toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }
    return filtered
  }, [mockEngineers, searchQuery, t])

  useEffect(() => {
    // Simulate real-time matching
    const interval = setInterval(() => {
      if (isMatching) {
        // Simulate new matches coming in
        const newMatches = filteredEngineers.slice(0, Math.min(matchCount + 1, filteredEngineers.length))
        setMatches(newMatches)
        setMatchCount(newMatches.length)
        setLastUpdate(new Date())
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isMatching, matchCount, filteredEngineers])

  const handleSelectEngineer = (engineerId: string) => {
    setSelectedEngineers(prev => 
      prev.includes(engineerId) 
        ? prev.filter(id => id !== engineerId)
        : [...prev, engineerId]
    )
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setMatches([])
      setMatchCount(0)
      setIsLoading(false)
    }, 1000)
  }

  const handleStopMatching = () => {
    setIsMatching(false)
  }

  const handleStartMatching = () => {
    setIsMatching(true)
  }

  const handleSendInvitations = () => {
    console.log('Sending invitations to:', selectedEngineers)
    navigate('/quote-comparison')
  }

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 dark:bg-green-900/30'
    if (score >= 80) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
    return 'text-red-600 bg-red-100 dark:bg-red-900/30'
  }

  const getAvailabilityColor = (availabilityKey: 'now' | 'thisWeek' | 'thisMonth') => {
    switch (availabilityKey) {
      case 'now':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'thisWeek':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'thisMonth':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
    }
  }

  return (
    <PageLayout
      title={t('realTimeMatching.title', 'Real-Time Matching')}
      description={t('realTimeMatching.description', 'AI-powered matching to find the best engineers for your job')}
      searchPlaceholder={t('realTimeMatching.searchPlaceholder', 'Search engineers by name, skills, or location...')}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      filterTabs={skillTabs}
      activeTab={activeSkillTab}
      onTabChange={setActiveSkillTab}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      showViewToggle={true}
      headerActions={
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isMatching ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {isMatching ? t('realTimeMatching.matching', 'Matching...') : t('realTimeMatching.paused', 'Paused')}
            </span>
          </div>
          
          <Button
            onClick={isMatching ? handleStopMatching : handleStartMatching}
            variant="outline"
            size="sm"
          >
            {isMatching ? t('realTimeMatching.stopMatching', 'Stop Matching') : t('realTimeMatching.startMatching', 'Start Matching')}
          </Button>
        </div>
      }
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Job Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8"
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {jobData.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {jobData.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 me-1" />
                  {jobData.location}
                </span>
                <span className="flex items-center">
                  <DollarSign className="w-4 h-4 me-1" />
                  {jobData.budget}
                </span>
                <span className="flex items-center">
                  <Clock className="w-4 h-4 me-1" />
                  {jobData.timeline}
                </span>
              </div>
            </div>
            
            <div className="text-end">
              <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">
                {matchCount} {t('realTimeMatching.matches', 'Matches')}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('realTimeMatching.lastUpdated', 'Last updated')}: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Matching Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-center">
            <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 me-3" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">
                {t('realTimeMatching.aiPoweredMatching', 'AI-Powered Matching in Progress')}
              </h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                {t('realTimeMatching.aiDescription', 'Our AI is analyzing your job requirements and finding the best matching engineers in real-time.')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Matches Grid/List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('realTimeMatching.matchingEngineers', 'Matching Engineers')}
            </h3>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleRefresh}
                loading={isLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className="w-4 h-4 me-2" />
                {t('realTimeMatching.refresh', 'Refresh')}
              </Button>
              
              {selectedEngineers.length > 0 && (
                <Button
                  onClick={handleSendInvitations}
                  size="sm"
                  className="bg-brand-500 hover:bg-brand-600 text-white"
                >
                  {t('realTimeMatching.sendInvitations', 'Send Invitations')} ({selectedEngineers.length})
                </Button>
              )}
            </div>
          </div>

          <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
            <AnimatePresence>
              {matches.map((engineer, index) => (
                <motion.div
                  key={engineer.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 transition-all duration-200 ${
                    selectedEngineers.includes(engineer.id)
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  } ${viewMode === 'list' ? 'flex items-center p-4' : 'p-6'}`}
                >
                  <div className={viewMode === 'list' ? 'flex-1' : 'w-full'}>
                    {/* Header */}
                    <div className={`flex items-start justify-between ${viewMode === 'list' ? 'mb-2' : 'mb-4'}`}>
                      <div className="flex items-center">
                        <div className={`bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center ${viewMode === 'list' ? 'w-12 h-12 me-3' : 'w-16 h-16 me-4'}`}>
                          <span className={`font-bold text-brand-600 dark:text-brand-400 ${viewMode === 'list' ? 'text-lg' : 'text-xl'}`}>
                            {engineer.name.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h4 className={`font-semibold text-gray-900 dark:text-white ${viewMode === 'list' ? 'text-base' : 'text-lg'}`}>
                              {engineer.name}
                            </h4>
                            {engineer.isVerified && (
                              <CheckCircle className="w-4 h-4 text-green-500 ms-2" />
                            )}
                            {engineer.isOnline && (
                              <div className="w-2 h-2 bg-green-500 rounded-full ms-2"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {localizeTitle(engineer.title)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-end">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMatchColor(engineer.matchScore)}`}>
                          {engineer.matchScore}% {t('realTimeMatching.engineer.matchScore', 'match')}
                        </span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className={`grid gap-4 text-sm text-gray-600 dark:text-gray-400 ${viewMode === 'list' ? 'grid-cols-4 mb-2' : 'grid-cols-2 mb-4'}`}>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 me-1 text-yellow-400 fill-current" />
                        {engineer.rating} ({engineer.reviews} {t('realTimeMatching.engineer.reviews', 'reviews')})
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 me-1" />
                        {engineer.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 me-1" />
                        {localizeExperience(engineer.experience)}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 me-1" />
                        {formatSar(parseFloat(String(engineer.hourlyRate).replace(/[^0-9.]/g, '')))}
                        /{t('realTimeMatching.engineer.hourlyRate', 'hour')}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className={viewMode === 'list' ? 'mb-2' : 'mb-4'}>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(engineer.availabilityKey)}`}>
                        {engineer.availability}
                      </span>
                      <span className="ms-2 text-xs text-gray-500 dark:text-gray-400">
                        {t('realTimeMatching.engineer.lastActive', 'Last active')}: {localizeRelative(engineer.lastActive)}
                      </span>
                    </div>

                    {/* Skills */}
                    <div className={viewMode === 'list' ? 'mb-2' : 'mb-4'}>
                      <div className="flex flex-wrap gap-1">
                        {engineer.skills.slice(0, viewMode === 'list' ? 2 : 3).map((skill: string, idx: number) => (
                          <SkillChip
                            key={idx}
                            label={skill}
                            className="text-xs"
                          />
                        ))}
                        {engineer.skills.length > (viewMode === 'list' ? 2 : 3) && (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                            +{engineer.skills.length - (viewMode === 'list' ? 2 : 3)} {t('realTimeMatching.more', 'more')}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Performance */}
                    <div className={`flex justify-between text-sm text-gray-500 dark:text-gray-400 ${viewMode === 'list' ? 'mb-2' : 'mb-4'}`}>
                      <span>{t('realTimeMatching.engineer.response', 'Response')}: {localizeRelative(engineer.responseTime)}</span>
                      <span>{t('realTimeMatching.engineer.portfolio', 'Portfolio')}: 12 {t('realTimeMatching.engineer.projects', 'projects')}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex ${viewMode === 'list' ? 'space-x-2' : 'space-x-2'}`}>
                      <button
                        onClick={() => handleSelectEngineer(engineer.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedEngineers.includes(engineer.id)
                            ? 'bg-brand-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        } ${viewMode === 'list' ? 'flex-1' : 'flex-1'}`}
                      >
                        {selectedEngineers.includes(engineer.id) ? t('realTimeMatching.engineer.selected', 'Selected') : t('realTimeMatching.engineer.select', 'Select')}
                      </button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        title={t('realTimeMatching.engineer.viewProfile', 'View Profile')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        title={t('realTimeMatching.engineer.message', 'Message')}
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* No Matches */}
        {matches.length === 0 && !isMatching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('realTimeMatching.noMatchesFound', 'No matches found yet')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('realTimeMatching.noMatchesHint', 'Try adjusting your job requirements or start matching again.')}
            </p>
            <Button
              onClick={handleStartMatching}
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              {t('realTimeMatching.startMatching', 'Start Matching')}
            </Button>
          </motion.div>
        )}

        {/* Loading State */}
        {isMatching && matches.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('realTimeMatching.findingEngineers', 'Finding the best engineers...')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('realTimeMatching.findingDescription', 'Our AI is analyzing your requirements and matching with qualified engineers.')}
            </p>
          </motion.div>
        )}
      </div>
    </PageLayout>
  )
}

export default RealTimeMatching
