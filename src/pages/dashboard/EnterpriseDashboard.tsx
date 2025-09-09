import React from 'react';
import { useTranslation } from 'react-i18next';
import { Building, Users, TrendingUp, Clock } from 'lucide-react';

export default function EnterpriseDashboard() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    {
      title: isRTL ? 'المشاريع النشطة' : 'Active Projects',
      value: '42',
      icon: Building,
      change: '+8',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'المهندسون في الفريق' : 'Team Engineers',
      value: '156',
      icon: Users,
      change: '+12',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'معدل الإنجاز' : 'Completion Rate',
      value: '94.2%',
      icon: TrendingUp,
      change: '+3.2%',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'متوسط وقت المشروع' : 'Avg. Project Time',
      value: '12.5 days',
      icon: Clock,
      change: '-2.1 days',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {isRTL ? 'لوحة تحكم المؤسسة' : 'Enterprise Dashboard'}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {isRTL ? 'إدارة فرقك ومشاريعك من مكان واحد.' : 'Manage your teams and projects from one place.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
                <div className={`mt-2 flex items-center text-sm ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span>{stat.change}</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {isRTL ? 'من الشهر الماضي' : 'from last month'}
                  </span>
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Department Performance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {isRTL ? 'أداء الأقسام' : 'Department Performance'}
        </h2>
        <div className="space-y-4">
          {[
            { name: isRTL ? 'الهندسة المدنية' : 'Civil Engineering', projects: 15, engineers: 45, performance: 96 },
            { name: isRTL ? 'الهندسة الكهربائية' : 'Electrical Engineering', projects: 12, engineers: 38, performance: 92 },
            { name: isRTL ? 'الهندسة الميكانيكية' : 'Mechanical Engineering', projects: 10, engineers: 32, performance: 89 },
            { name: isRTL ? 'الهندسة المعمارية' : 'Architectural Engineering', projects: 5, engineers: 41, performance: 94 }
          ].map((dept, index) => (
            <div key={index} className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                  {dept.name}
                </h3>
                <span className="text-sm font-medium text-primary">
                  {dept.performance}% {isRTL ? 'كفاءة' : 'Efficiency'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {isRTL ? 'المشاريع:' : 'Projects:'} 
                  </span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                    {dept.projects}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {isRTL ? 'المهندسون:' : 'Engineers:'} 
                  </span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">
                    {dept.engineers}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dept.performance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}