import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, DollarSign, Clock, TrendingUp } from 'lucide-react';

export default function EngineerDashboard() {
	const { t, i18n } = useTranslation('common');
	const isRTL = i18n.language === 'ar';

	const stats = useMemo(() => ([
		{
			titleKey: 'analytics.totalJobs',
			fallback: 'Total Jobs',
			value: '24',
			icon: Activity,
			change: '+12%',
			changeType: 'positive'
		},
		{
			titleKey: 'payments.thisMonth',
			fallback: 'This Month',
			value: 'SAR 45,280',
			icon: DollarSign,
			change: '+23%',
			changeType: 'positive'
		},
		{
			titleKey: 'analytics.performance',
			fallback: 'Performance',
			value: '168',
			icon: Clock,
			change: '+5%',
			changeType: 'positive'
		},
		{
			titleKey: 'analytics.completionRate',
			fallback: 'Completion Rate',
			value: '98.5%',
			icon: TrendingUp,
			change: '+2.3%',
			changeType: 'positive'
		}
	]), []);

	return (
		<div className="space-y-6">
			{/* Page Header */}
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
					{t('nav.engineerDashboard', 'Engineer Dashboard')}
				</h1>
				<p className="mt-2 text-gray-600 dark:text-gray-400" dir={isRTL ? 'rtl' : 'ltr'}>
					{t('analytics.description', "Track your business performance and insights")}
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
									{t(stat.titleKey as any, { defaultValue: stat.fallback })}
								</p>
								<p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
									{stat.value}
								</p>
								<div className={`mt-2 flex items-center text-sm ${
									stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
								}`}>
									<span>{stat.change}</span>
									<span className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-600 dark:text-gray-400`}>
										{t('analytics.fromLastMonth', 'from last month')}
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

			{/* Recent Activity */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
				<h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4" dir={isRTL ? 'rtl' : 'ltr'}>
					{t('analytics.recentActivity', 'Recent Activity')}
				</h2>
				<div className="space-y-4">
					{[1, 2, 3].map((item) => (
						<div key={item} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
							<div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
							<div className="flex-1">
								<p className="text-gray-900 dark:text-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
									{t('analytics.activitySample', 'Your quote for "HVAC System Design for Commercial Building" was accepted')}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1" dir={isRTL ? 'rtl' : 'ltr'}>
									{t('analytics.last2hours', '2 hours ago')}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}