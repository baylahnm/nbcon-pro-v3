import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, DollarSign, Activity, Shield } from 'lucide-react';

export default function AdminDashboard() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const stats = [
    {
      title: isRTL ? 'إجمالي المستخدمين' : 'Total Users',
      value: '15,482',
      icon: Users,
      change: '+425',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'إيرادات المنصة' : 'Platform Revenue',
      value: 'SAR 2.4M',
      icon: DollarSign,
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'المعاملات اليومية' : 'Daily Transactions',
      value: '3,245',
      icon: Activity,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'حالة النظام' : 'System Status',
      value: '99.9%',
      icon: Shield,
      change: 'Operational',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {isRTL ? 'لوحة تحكم المسؤول' : 'Admin Dashboard'}
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {isRTL ? 'نظرة عامة على أداء المنصة وحالة النظام.' : 'Platform performance and system status overview.'}
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
                  {index !== 3 && (
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {isRTL ? 'من الأسبوع الماضي' : 'from last week'}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {isRTL ? 'التسجيلات الأخيرة' : 'Recent Registrations'}
          </h2>
          <div className="space-y-3">
            {[
              { name: isRTL ? 'محمد الشمري' : 'Mohammed Al-Shammari', role: 'Engineer', time: '5 min ago' },
              { name: isRTL ? 'شركة البناء المتقدم' : 'Advanced Construction Co.', role: 'Client', time: '12 min ago' },
              { name: isRTL ? 'سارة العتيبي' : 'Sara Al-Otaibi', role: 'Engineer', time: '1 hour ago' },
              { name: isRTL ? 'مؤسسة الهندسة الحديثة' : 'Modern Engineering Est.', role: 'Enterprise', time: '2 hours ago' }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {user.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{user.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            {isRTL ? 'تنبيهات النظام' : 'System Alerts'}
          </h2>
          <div className="space-y-3">
            {[
              { 
                type: 'success', 
                message: isRTL ? 'تم تحديث النظام بنجاح إلى الإصدار 2.4.1' : 'System successfully updated to version 2.4.1',
                time: '1 hour ago'
              },
              { 
                type: 'warning', 
                message: isRTL ? 'ارتفاع استخدام الخادم (85%)' : 'High server usage detected (85%)',
                time: '3 hours ago'
              },
              { 
                type: 'info', 
                message: isRTL ? 'النسخ الاحتياطي المجدول مكتمل' : 'Scheduled backup completed',
                time: '6 hours ago'
              }
            ].map((alert, index) => (
              <div key={index} className="flex items-start gap-3 py-2">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.type === 'success' ? 'bg-green-500' :
                  alert.type === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-gray-100">{alert.message}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}