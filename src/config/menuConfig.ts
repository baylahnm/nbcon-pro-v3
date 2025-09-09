import { MenuSection } from '../types/navigation';

export const engineerMenu: MenuSection[] = [
  {
    id: 'overview',
    title: 'Engineer Dashboard',
    titleAr: 'لوحة تحكم المهندس',
    items: [
      {
        id: 'dashboard',
        label: 'Overview & Analytics',
        labelAr: 'نظرة عامة والتحليلات',
        icon: '📊',
        path: '/engineer/dashboard'
      }
    ]
  },
  {
    id: 'jobs',
    title: 'Jobs & Projects',
    titleAr: 'الوظائف والمشاريع',
    items: [
      {
        id: 'browse-jobs',
        label: 'Browse Available Jobs',
        labelAr: 'تصفح الوظائف المتاحة',
        icon: '🔍',
        path: '/jobs/browse'
      },
      {
        id: 'real-time-matching',
        label: 'Real-time Job Matching',
        labelAr: 'مطابقة الوظائف الفورية',
        icon: '⚡',
        path: '/jobs/real-time-matching'
      },
      {
        id: 'job-tracking',
        label: 'Job Status Tracking',
        labelAr: 'تتبع حالة الوظيفة',
        icon: '📍',
        path: '/jobs/status-tracking'
      },
      {
        id: 'emergency-jobs',
        label: 'Emergency Job Requests',
        labelAr: 'طلبات الوظائف الطارئة',
        icon: '🚨',
        path: '/jobs/emergency'
      },
      {
        id: 'job-recommendations',
        label: 'Automated Job Recommendations',
        labelAr: 'توصيات الوظائف الآلية',
        icon: '🤖',
        path: '/jobs/recommendations'
      }
    ]
  },
  {
    id: 'financial',
    title: 'Financial Management',
    titleAr: 'الإدارة المالية',
    items: [
      {
        id: 'earnings',
        label: 'Earnings Dashboard',
        labelAr: 'لوحة الأرباح',
        icon: '💰',
        path: '/financial/earnings'
      },
      {
        id: 'payment-methods',
        label: 'Payment Methods Setup',
        labelAr: 'إعداد طرق الدفع',
        icon: '💳',
        path: '/financial/payment-methods'
      },
      {
        id: 'escrow',
        label: 'Escrow Payments',
        labelAr: 'مدفوعات الضمان',
        icon: '🔒',
        path: '/financial/escrow'
      },
      {
        id: 'payouts',
        label: 'Payout Settings',
        labelAr: 'إعدادات المدفوعات',
        icon: '🏦',
        path: '/financial/payouts'
      },
      {
        id: 'time-billing',
        label: 'Time Tracking & Billing',
        labelAr: 'تتبع الوقت والفواتير',
        icon: '⏱️',
        path: '/financial/time-billing'
      },
      {
        id: 'quote-builder',
        label: 'Custom Quote Builder',
        labelAr: 'منشئ العروض المخصصة',
        icon: '📋',
        path: '/financial/quote-builder'
      }
    ]
  },
  {
    id: 'portfolio',
    title: 'Portfolio & Profile',
    titleAr: 'المحفظة والملف الشخصي',
    items: [
      {
        id: 'view-profile',
        label: 'View Profile',
        labelAr: 'عرض الملف الشخصي',
        icon: '👤',
        path: '/profile/view'
      },
      {
        id: 'edit-profile',
        label: 'Edit Profile',
        labelAr: 'تعديل الملف الشخصي',
        icon: '✏️',
        path: '/profile/edit'
      },
      {
        id: 'portfolio',
        label: 'Portfolio Showcase',
        labelAr: 'عرض المحفظة',
        icon: '💼',
        path: '/profile/portfolio'
      },
      {
        id: 'posts',
        label: 'Professional Posts',
        labelAr: 'المنشورات المهنية',
        icon: '📝',
        path: '/profile/posts'
      },
      {
        id: 'browse-profiles',
        label: 'Browse Profiles',
        labelAr: 'تصفح الملفات الشخصية',
        icon: '👥',
        path: '/engineers/browse'
      },
      {
        id: 'profile-manager',
        label: 'Profile Manager Dashboard',
        labelAr: 'لوحة إدارة الملف الشخصي',
        icon: '📊',
        path: '/profile/manager'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Services',
    titleAr: 'الأدوات والخدمات',
    items: [
      {
        id: 'availability',
        label: 'Availability Calendar',
        labelAr: 'تقويم التوفر',
        icon: '📅',
        path: '/tools/availability'
      },
      {
        id: 'deliverables',
        label: 'Project Deliverables Manager',
        labelAr: 'مدير تسليمات المشروع',
        icon: '📦',
        path: '/tools/deliverables'
      },
      {
        id: 'collaboration',
        label: 'Multi-Engineer Collaboration',
        labelAr: 'التعاون متعدد المهندسين',
        icon: '🤝',
        path: '/tools/collaboration'
      },
      {
        id: 'certificates',
        label: 'Certificate Completion System',
        labelAr: 'نظام إكمال الشهادات',
        icon: '🏆',
        path: '/tools/certificates'
      },
      {
        id: 'search-filters',
        label: 'Advanced Search Filters',
        labelAr: 'مرشحات البحث المتقدمة',
        icon: '🔎',
        path: '/tools/search'
      },
      {
        id: 'quality',
        label: 'Quality Assurance Center',
        labelAr: 'مركز ضمان الجودة',
        icon: '✅',
        path: '/tools/quality'
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication',
    titleAr: 'التواصل',
    items: [
      {
        id: 'messaging',
        label: 'Realtime Messaging',
        labelAr: 'المراسلة الفورية',
        icon: '💬',
        path: '/messaging'
      },
      {
        id: 'notifications',
        label: 'Notification Management',
        labelAr: 'إدارة الإشعارات',
        icon: '🔔',
        path: '/notifications'
      },
      {
        id: 'advanced-notifications',
        label: 'Advanced Notifications',
        labelAr: 'الإشعارات المتقدمة',
        icon: '📬',
        path: '/notifications/advanced'
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    titleAr: 'الإعدادات',
    items: [
      {
        id: 'settings-hub',
        label: 'Settings Hub',
        labelAr: 'مركز الإعدادات',
        icon: '⚙️',
        path: '/settings'
      },
      {
        id: 'theme',
        label: 'Theme Settings',
        labelAr: 'إعدادات المظهر',
        icon: '🎨',
        path: '/settings/theme'
      },
      {
        id: 'notification-settings',
        label: 'Notification Settings',
        labelAr: 'إعدادات الإشعارات',
        icon: '🔕',
        path: '/settings/notifications'
      },
      {
        id: 'accessibility',
        label: 'Accessibility Settings',
        labelAr: 'إعدادات إمكانية الوصول',
        icon: '♿',
        path: '/settings/accessibility'
      },
      {
        id: 'performance',
        label: 'Performance Settings',
        labelAr: 'إعدادات الأداء',
        icon: '⚡',
        path: '/settings/performance'
      }
    ]
  },
  {
    id: 'help',
    title: 'Help & Support',
    titleAr: 'المساعدة والدعم',
    items: [
      {
        id: 'help-center',
        label: 'Help Center',
        labelAr: 'مركز المساعدة',
        icon: '❓',
        path: '/support'
      }
    ]
  }
];

export const clientMenu: MenuSection[] = [
  {
    id: 'overview',
    title: 'Client Dashboard',
    titleAr: 'لوحة تحكم العميل',
    items: [
      {
        id: 'dashboard',
        label: 'Overview & Analytics',
        labelAr: 'نظرة عامة والتحليلات',
        icon: '📊',
        path: '/client/dashboard'
      }
    ]
  },
  {
    id: 'job-management',
    title: 'Job Management',
    titleAr: 'إدارة الوظائف',
    items: [
      {
        id: 'browse-services',
        label: 'Browse Services',
        labelAr: 'تصفح الخدمات',
        icon: '🔍',
        path: '/browse-services'
      },
      {
        id: 'create-job',
        label: 'Create Job Request',
        labelAr: 'إنشاء طلب وظيفة',
        icon: '➕',
        path: '/job-request'
      },
      {
        id: 'job-tracking',
        label: 'Job Status Tracking',
        labelAr: 'تتبع حالة الوظيفة',
        icon: '📍',
        path: '/jobs/status-tracking'
      },
      {
        id: 'saved-drafts',
        label: 'Saved Job Drafts',
        labelAr: 'مسودات الوظائف المحفوظة',
        icon: '💾',
        path: '/jobs/drafts'
      },
      {
        id: 'bulk-posting',
        label: 'Bulk Job Posting',
        labelAr: 'نشر الوظائف بالجملة',
        icon: '📚',
        path: '/jobs/bulk-post'
      },
      {
        id: 'templates',
        label: 'Job Templates Library',
        labelAr: 'مكتبة قوالب الوظائف',
        icon: '📋',
        path: '/jobs/templates'
      },
      {
        id: 'job-clone',
        label: 'Job Cloning & Duplication',
        labelAr: 'استنساخ وتكرار الوظائف',
        icon: '📑',
        path: '/jobs/clone'
      },
      {
        id: 'emergency',
        label: 'Emergency Job Request',
        labelAr: 'طلب وظيفة طارئة',
        icon: '🚨',
        path: '/jobs/emergency'
      },
      {
        id: 'quote-comparison',
        label: 'Quote Comparison Matrix',
        labelAr: 'مصفوفة مقارنة العروض',
        icon: '📊',
        path: '/jobs/quote-comparison'
      }
    ]
  },
  {
    id: 'budget-payments',
    title: 'Budget & Payments',
    titleAr: 'الميزانية والمدفوعات',
    items: [
      {
        id: 'budget-tracker',
        label: 'Budget Tracker',
        labelAr: 'متتبع الميزانية',
        icon: '💰',
        path: '/budget/tracker'
      },
      {
        id: 'payment-methods',
        label: 'Payment Methods Setup',
        labelAr: 'إعداد طرق الدفع',
        icon: '💳',
        path: '/payments/methods'
      },
      {
        id: 'escrow',
        label: 'Escrow Payment System',
        labelAr: 'نظام دفع الضمان',
        icon: '🔒',
        path: '/payments/escrow'
      },
      {
        id: 'business-intelligence',
        label: 'Business Intelligence',
        labelAr: 'ذكاء الأعمال',
        icon: '📈',
        path: '/budget/intelligence'
      }
    ]
  },
  {
    id: 'engineer-management',
    title: 'Engineer Management',
    titleAr: 'إدارة المهندسين',
    items: [
      {
        id: 'browse-engineers',
        label: 'Browse Profiles',
        labelAr: 'تصفح الملفات الشخصية',
        icon: '👥',
        path: '/engineers/browse'
      },
      {
        id: 'engineer-filter',
        label: 'Engineer Filtering & Search',
        labelAr: 'تصفية وبحث المهندسين',
        icon: '🔎',
        path: '/engineers/filter'
      },
      {
        id: 'favorites',
        label: 'Client Favorites',
        labelAr: 'المفضلات',
        icon: '⭐',
        path: '/engineers/favorites'
      },
      {
        id: 'portfolio-viewer',
        label: 'Engineer Portfolio Viewer',
        labelAr: 'عارض محفظة المهندس',
        icon: '💼',
        path: '/engineers/portfolio'
      },
      {
        id: 'real-time-matching',
        label: 'Real-time Job Matching',
        labelAr: 'مطابقة الوظائف الفورية',
        icon: '⚡',
        path: '/jobs/real-time-matching'
      }
    ]
  },
  {
    id: 'project-management',
    title: 'Project Management',
    titleAr: 'إدارة المشاريع',
    items: [
      {
        id: 'deliverables',
        label: 'Project Deliverables Manager',
        labelAr: 'مدير تسليمات المشروع',
        icon: '📦',
        path: '/projects/deliverables'
      },
      {
        id: 'collaboration',
        label: 'Multi-Engineer Collaboration',
        labelAr: 'التعاون متعدد المهندسين',
        icon: '🤝',
        path: '/projects/collaboration'
      },
      {
        id: 'certificates',
        label: 'Certificate Completion System',
        labelAr: 'نظام إكمال الشهادات',
        icon: '🏆',
        path: '/projects/certificates'
      },
      {
        id: 'quality',
        label: 'Quality Assurance Center',
        labelAr: 'مركز ضمان الجودة',
        icon: '✅',
        path: '/projects/quality'
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication',
    titleAr: 'التواصل',
    items: [
      {
        id: 'messaging',
        label: 'Realtime Messaging',
        labelAr: 'المراسلة الفورية',
        icon: '💬',
        path: '/messaging'
      },
      {
        id: 'notifications',
        label: 'Notification Management',
        labelAr: 'إدارة الإشعارات',
        icon: '🔔',
        path: '/notifications'
      },
      {
        id: 'advanced-notifications',
        label: 'Advanced Notifications',
        labelAr: 'الإشعارات المتقدمة',
        icon: '📬',
        path: '/notifications/advanced'
      }
    ]
  },
  {
    id: 'analytics-reports',
    title: 'Analytics & Reports',
    titleAr: 'التحليلات والتقارير',
    items: [
      {
        id: 'business-hub',
        label: 'Business Intelligence Hub',
        labelAr: 'مركز ذكاء الأعمال',
        icon: '🏢',
        path: '/analytics/business'
      },
      {
        id: 'analytics-dashboard',
        label: 'Analytics & Reporting Dashboard',
        labelAr: 'لوحة التحليلات والتقارير',
        icon: '📊',
        path: '/analytics/dashboard'
      },
      {
        id: 'data-visualization',
        label: 'Data Visualization Studio',
        labelAr: 'استوديو تصور البيانات',
        icon: '📈',
        path: '/analytics/visualization'
      }
    ]
  },
  {
    id: 'admin-features',
    title: 'Admin Features',
    titleAr: 'ميزات المسؤول',
    roles: ['admin'],
    items: [
      {
        id: 'admin-dashboard',
        label: 'Admin Dashboard',
        labelAr: 'لوحة تحكم المسؤول',
        icon: '🛡️',
        path: '/admin/dashboard'
      },
      {
        id: 'financial-admin',
        label: 'Financial Administration',
        labelAr: 'الإدارة المالية',
        icon: '💼',
        path: '/admin/financial'
      },
      {
        id: 'system-config',
        label: 'System Configuration',
        labelAr: 'تكوين النظام',
        icon: '⚙️',
        path: '/admin/system'
      },
      {
        id: 'platform-maintenance',
        label: 'Platform Maintenance',
        labelAr: 'صيانة المنصة',
        icon: '🔧',
        path: '/admin/maintenance'
      }
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    titleAr: 'الإعدادات',
    items: [
      {
        id: 'settings-hub',
        label: 'Settings Hub',
        labelAr: 'مركز الإعدادات',
        icon: '⚙️',
        path: '/settings'
      },
      {
        id: 'theme',
        label: 'Theme Settings',
        labelAr: 'إعدادات المظهر',
        icon: '🎨',
        path: '/settings/theme'
      },
      {
        id: 'notification-settings',
        label: 'Notification Settings',
        labelAr: 'إعدادات الإشعارات',
        icon: '🔕',
        path: '/settings/notifications'
      },
      {
        id: 'accessibility',
        label: 'Accessibility Settings',
        labelAr: 'إعدادات إمكانية الوصول',
        icon: '♿',
        path: '/settings/accessibility'
      },
      {
        id: 'performance',
        label: 'Performance Settings',
        labelAr: 'إعدادات الأداء',
        icon: '⚡',
        path: '/settings/performance'
      }
    ]
  },
  {
    id: 'help',
    title: 'Help & Support',
    titleAr: 'المساعدة والدعم',
    items: [
      {
        id: 'help-center',
        label: 'Help Center',
        labelAr: 'مركز المساعدة',
        icon: '❓',
        path: '/support'
      }
    ]
  }
];

export const adminMenu: MenuSection[] = [
  {
    id: 'overview',
    title: 'Admin Dashboard',
    titleAr: 'لوحة تحكم المسؤول',
    items: [
      {
        id: 'dashboard',
        label: 'System Overview',
        labelAr: 'نظرة عامة على النظام',
        icon: '🛡️',
        path: '/admin/dashboard'
      }
    ]
  },
  {
    id: 'user-management',
    title: 'User Management',
    titleAr: 'إدارة المستخدمين',
    items: [
      {
        id: 'users',
        label: 'User Management System',
        labelAr: 'نظام إدارة المستخدمين',
        icon: '👥',
        path: '/admin/users'
      },
      {
        id: 'roles',
        label: 'Role & Permission Management',
        labelAr: 'إدارة الأدوار والصلاحيات',
        icon: '🔐',
        path: '/admin/roles'
      }
    ]
  },
  {
    id: 'financial-admin',
    title: 'Financial Administration',
    titleAr: 'الإدارة المالية',
    items: [
      {
        id: 'revenue',
        label: 'Platform Revenue Analytics',
        labelAr: 'تحليلات إيرادات المنصة',
        icon: '💰',
        path: '/admin/revenue'
      },
      {
        id: 'transactions',
        label: 'Transaction Monitoring',
        labelAr: 'مراقبة المعاملات',
        icon: '📊',
        path: '/admin/transactions'
      },
      {
        id: 'payment-gateway',
        label: 'Payment Gateway Management',
        labelAr: 'إدارة بوابة الدفع',
        icon: '💳',
        path: '/admin/payment-gateway'
      }
    ]
  },
  {
    id: 'system-management',
    title: 'System Management',
    titleAr: 'إدارة النظام',
    items: [
      {
        id: 'config',
        label: 'System Configuration',
        labelAr: 'تكوين النظام',
        icon: '⚙️',
        path: '/admin/config'
      },
      {
        id: 'maintenance',
        label: 'Platform Maintenance',
        labelAr: 'صيانة المنصة',
        icon: '🔧',
        path: '/admin/maintenance'
      },
      {
        id: 'performance',
        label: 'Performance Monitoring',
        labelAr: 'مراقبة الأداء',
        icon: '📈',
        path: '/admin/performance'
      },
      {
        id: 'status',
        label: 'System Status Dashboard',
        labelAr: 'لوحة حالة النظام',
        icon: '🚦',
        path: '/admin/status'
      }
    ]
  },
  {
    id: 'analytics-reporting',
    title: 'Analytics & Reporting',
    titleAr: 'التحليلات والتقارير',
    items: [
      {
        id: 'business-intel',
        label: 'Business Intelligence Reports',
        labelAr: 'تقارير ذكاء الأعمال',
        icon: '📊',
        path: '/admin/reports'
      },
      {
        id: 'platform-growth',
        label: 'Platform Growth Analytics',
        labelAr: 'تحليلات نمو المنصة',
        icon: '📈',
        path: '/admin/growth'
      },
      {
        id: 'data-viz',
        label: 'Data Visualization Studio',
        labelAr: 'استوديو تصور البيانات',
        icon: '📉',
        path: '/admin/data-visualization'
      }
    ]
  },
  {
    id: 'security-compliance',
    title: 'Security & Compliance',
    titleAr: 'الأمن والامتثال',
    items: [
      {
        id: 'security-center',
        label: 'Advanced Security Center',
        labelAr: 'مركز الأمن المتقدم',
        icon: '🔒',
        path: '/admin/security'
      },
      {
        id: 'audit-trail',
        label: 'Audit Trail System',
        labelAr: 'نظام سجل التدقيق',
        icon: '📝',
        path: '/admin/audit'
      },
      {
        id: 'compliance',
        label: 'Compliance Dashboard',
        labelAr: 'لوحة الامتثال',
        icon: '⚖️',
        path: '/admin/compliance'
      }
    ]
  },
  {
    id: 'platform-tools',
    title: 'Platform Tools',
    titleAr: 'أدوات المنصة',
    items: [
      {
        id: 'content-moderation',
        label: 'Content Moderation',
        labelAr: 'إدارة المحتوى',
        icon: '📋',
        path: '/admin/moderation'
      },
      {
        id: 'quality-assurance',
        label: 'Quality Assurance Center',
        labelAr: 'مركز ضمان الجودة',
        icon: '✅',
        path: '/admin/quality'
      },
      {
        id: 'integration-hub',
        label: 'Advanced Integration Hub',
        labelAr: 'مركز التكامل المتقدم',
        icon: '🔗',
        path: '/admin/integrations'
      }
    ]
  }
];

export const advancedFeaturesMenu: MenuSection[] = [
  {
    id: 'ai-automation',
    title: 'AI & Automation',
    titleAr: 'الذكاء الاصطناعي والأتمتة',
    items: [
      {
        id: 'ai-matching',
        label: 'AI Project Matching Engine',
        labelAr: 'محرك مطابقة المشاريع بالذكاء الاصطناعي',
        icon: '🤖',
        path: '/ai/matching'
      },
      {
        id: 'job-recommendations',
        label: 'Automated Job Recommendations',
        labelAr: 'توصيات الوظائف الآلية',
        icon: '🎯',
        path: '/ai/recommendations'
      },
      {
        id: 'smart-contracts',
        label: 'Smart Contract Escrow System',
        labelAr: 'نظام العقود الذكية للضمان',
        icon: '📄',
        path: '/ai/smart-contracts'
      }
    ]
  },
  {
    id: 'geolocation',
    title: 'Geolocation & Tracking',
    titleAr: 'الموقع الجغرافي والتتبع',
    items: [
      {
        id: 'geofencing',
        label: 'Advanced Geofencing System',
        labelAr: 'نظام السياج الجغرافي المتقدم',
        icon: '🌍',
        path: '/geo/geofencing'
      },
      {
        id: 'time-tracking',
        label: 'Time Tracking & Billing',
        labelAr: 'تتبع الوقت والفواتير',
        icon: '⏰',
        path: '/geo/time-tracking'
      }
    ]
  },
  {
    id: 'blockchain-security',
    title: 'Blockchain & Security',
    titleAr: 'البلوك تشين والأمن',
    items: [
      {
        id: 'blockchain-verification',
        label: 'Blockchain Project Verification',
        labelAr: 'التحقق من المشروع بالبلوك تشين',
        icon: '🔗',
        path: '/blockchain/verification'
      },
      {
        id: 'security-center',
        label: 'Advanced Security Center',
        labelAr: 'مركز الأمن المتقدم',
        icon: '🛡️',
        path: '/blockchain/security'
      },
      {
        id: 'smart-escrow',
        label: 'Smart Contract Escrow',
        labelAr: 'ضمان العقود الذكية',
        icon: '🔐',
        path: '/blockchain/escrow'
      }
    ]
  },
  {
    id: 'emerging-tech',
    title: 'Emerging Technologies',
    titleAr: 'التقنيات الناشئة',
    items: [
      {
        id: 'ar-vr',
        label: 'AR/VR Project Visualization',
        labelAr: 'تصور المشروع بالواقع المعزز/الافتراضي',
        icon: '🥽',
        path: '/tech/ar-vr'
      },
      {
        id: 'innovation-lab',
        label: 'Future Ready Innovation Lab',
        labelAr: 'مختبر الابتكار للمستقبل',
        icon: '🚀',
        path: '/tech/innovation'
      }
    ]
  }
];

// Main sidebar navigation structure
export const sidebarNavigation = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    labelAr: 'لوحة التحكم',
    icon: '🏠',
    path: '/'
  },
  {
    id: 'browse',
    label: 'Browse',
    labelAr: 'تصفح',
    icon: '🔍',
    path: '/browse-services',
    roles: ['client', 'engineer']
  },
  {
    id: 'jobs',
    label: 'Jobs',
    labelAr: 'الوظائف',
    icon: '💼',
    path: '/jobs/browse'
  },
  {
    id: 'payments',
    label: 'Payments',
    labelAr: 'المدفوعات',
    icon: '💰',
    path: '/payments',
    roles: ['client', 'engineer']
  },
  {
    id: 'messages',
    label: 'Messages',
    labelAr: 'الرسائل',
    icon: '💬',
    path: '/messaging',
    badge: 3 // Example notification count
  },
  {
    id: 'analytics',
    label: 'Analytics',
    labelAr: 'التحليلات',
    icon: '📊',
    path: '/analytics'
  },
  {
    id: 'settings',
    label: 'Settings',
    labelAr: 'الإعدادات',
    icon: '⚙️',
    path: '/settings'
  },
  {
    id: 'help',
    label: 'Help Center',
    labelAr: 'مركز المساعدة',
    icon: '❓',
    path: '/support'
  },
  {
    id: 'logout',
    label: 'Logout',
    labelAr: 'تسجيل الخروج',
    icon: '🚪',
    path: '/logout'
  }
];
