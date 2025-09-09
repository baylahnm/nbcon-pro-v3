import React from 'react';
import { useTranslation } from 'react-i18next';
import { Briefcase, Users, Clock, TrendingUp } from 'lucide-react';

export default function ClientDashboard() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    {
      title: isRTL ? 'المشاريع النشطة' : 'Active Projects',
      value: '8',
      icon: Briefcase,
      change: '+3',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'المهندسون المعينون' : 'Engineers Hired',
      value: '12',
      icon: Users,
      change: '+5',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'متوسط وقت الإنجاز' : 'Avg. Completion Time',
      value: '4.2 days',
      icon: Clock,
      change: '-15%',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'رضا المشروع' : 'Project Satisfaction',
      value: '4.8/5',
      icon: TrendingUp,
      change: '+0.3',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {isRTL ? 'لوحة تحكم العميل' : 'Client Dashboard'}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {isRTL ? 'مرحباً بعودتك! إليك نظرة عامة على مشاريعك.' : 'Welcome back! Here\'s an overview of your projects.'}
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

      {/* Active Projects */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          {isRTL ? 'المشاريع النشطة' : 'Active Projects'}
        </h2>
        <div className="space-y-4">
          {[
            {
              title: isRTL ? 'تصميم نظام كهربائي لفيلا سكنية' : 'Electrical System Design for Residential Villa',
              engineer: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed',
              progress: 75,
              status: isRTL ? 'قيد التنفيذ' : 'In Progress'
            },
            {
              title: isRTL ? 'تقييم إنشائي لمبنى تجاري' : 'Structural Assessment for Commercial Building',
              engineer: isRTL ? 'فاطمة علي' : 'Fatima Ali',
              progress: 45,
              status: isRTL ? 'قيد المراجعة' : 'Under Review'
            },
            {
              title: isRTL ? 'تصميم نظام HVAC لمكتب' : 'HVAC System Design for Office',
              engineer: isRTL ? 'عبدالله سعود' : 'Abdullah Saud',
              progress: 90,
              status: isRTL ? 'شبه مكتمل' : 'Almost Complete'
            }
          ].map((project, index) => (
            <div key={index} className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {isRTL ? 'المهندس:' : 'Engineer:'} {project.engineer}
                  </p>
                </div>
                <span className="text-sm font-medium text-primary">
                  {project.status}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {project.progress}% {isRTL ? 'مكتمل' : 'Complete'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}