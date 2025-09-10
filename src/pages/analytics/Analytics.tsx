import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/PageLayout'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Settings,
  MoreVertical,
  Activity,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Star,
  Briefcase,
  MessageSquare,
  FileText,
  PieChart,
  LineChart,
  BarChart
} from 'lucide-react'

export default function Analytics() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar')
  const [timeRange, setTimeRange] = useState('30d')

  const tabs = [
    { id: 'overview', label: t('analytics.overview', 'Overview'), icon: BarChart3 },
    { id: 'revenue', label: t('analytics.revenue', 'Revenue'), icon: DollarSign },
    { id: 'jobs', label: t('analytics.jobs', 'Jobs'), icon: Briefcase },
    { id: 'users', label: t('analytics.users', 'Users'), icon: Users },
    { id: 'performance', label: t('analytics.performance', 'Performance'), icon: Activity },
    { id: 'reports', label: t('analytics.reports', 'Reports'), icon: FileText }
  ]

  const mockOverviewData = {
    totalRevenue: 125000,
    totalJobs: 45,
    activeUsers: 1200,
    completionRate: 94.5,
    avgJobValue: 2778,
    growthRate: 12.5
  }

  const mockRevenueData = [
    { month: 'Jan', revenue: 85000, jobs: 12 },
    { month: 'Feb', revenue: 92000, jobs: 15 },
    { month: 'Mar', revenue: 105000, jobs: 18 },
    { month: 'Apr', revenue: 115000, jobs: 22 },
    { month: 'May', revenue: 125000, jobs: 25 },
    { month: 'Jun', revenue: 135000, jobs: 28 }
  ]

  const mockJobStats = [
    { category: 'Electrical', count: 15, revenue: 45000, growth: 8.2 },
    { category: 'Mechanical', count: 12, revenue: 38000, growth: 12.5 },
    { category: 'Civil', count: 10, revenue: 32000, growth: 5.8 },
    { category: 'Structural', count: 8, revenue: 10000, growth: 15.3 }
  ]

  const mockUserStats = [
    { type: 'Engineers', count: 850, growth: 8.5, active: 720 },
    { type: 'Clients', count: 350, growth: 12.3, active: 280 },
    { type: 'Enterprise', count: 25, growth: 25.0, active: 22 }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ms-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('analytics.totalRevenue', 'Total Revenue')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockOverviewData.totalRevenue.toLocaleString()} SAR
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                +{mockOverviewData.growthRate}% {t('analytics.fromLastMonth', 'from last month')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ms-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('analytics.totalJobs', 'Total Jobs')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockOverviewData.totalJobs}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                +8 {t('analytics.thisMonth', 'this month')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ms-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('analytics.activeUsers', 'Active Users')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockOverviewData.activeUsers.toLocaleString()}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                +{mockOverviewData.growthRate}% {t('analytics.growth', 'growth')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ms-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('analytics.completionRate', 'Completion Rate')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockOverviewData.completionRate}%
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                +2.1% {t('analytics.improvement', 'improvement')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
              <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ms-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('analytics.avgJobValue', 'Avg Job Value')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockOverviewData.avgJobValue.toLocaleString()} SAR
              </p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400">
                +5.2% {t('analytics.increase', 'increase')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-pink-100 dark:bg-pink-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="ms-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('analytics.growthRate', 'Growth Rate')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockOverviewData.growthRate}%
              </p>
              <p className="text-sm text-pink-600 dark:text-pink-400">
                {t('analytics.monthly', 'monthly')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('analytics.revenueTrend', 'Revenue Trend')}
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                {t('analytics.chartPlaceholder', 'Chart visualization would go here')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('analytics.jobCategories', 'Job Categories')}
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
                {t('analytics.chartPlaceholder', 'Chart visualization would go here')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRevenue = () => (
    <div className="space-y-6">
      {/* Revenue Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="7d">{t('analytics.last7Days', 'Last 7 Days')}</option>
              <option value="30d">{t('analytics.last30Days', 'Last 30 Days')}</option>
              <option value="90d">{t('analytics.last90Days', 'Last 90 Days')}</option>
              <option value="1y">{t('analytics.lastYear', 'Last Year')}</option>
            </select>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 me-2" />
            {t('analytics.export', 'Export')}
          </Button>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('analytics.revenueChart', 'Revenue Chart')}
        </h3>
        <div className="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <BarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {t('analytics.revenueChartPlaceholder', 'Revenue chart visualization would go here')}
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('analytics.revenueBreakdown', 'Revenue Breakdown')}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('analytics.month', 'Month')}
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('analytics.revenue', 'Revenue')}
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('analytics.jobs', 'Jobs')}
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('analytics.growth', 'Growth')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockRevenueData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {item.month}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {item.revenue.toLocaleString()} SAR
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {item.jobs}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">
                    +{Math.floor(Math.random() * 20 + 5)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderJobs = () => (
    <div className="space-y-6">
      {/* Job Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockJobStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.category}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.count}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.revenue.toLocaleString()} SAR
                </p>
              </div>
              <div className="text-end">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  +{stat.growth}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Job Performance Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('analytics.jobPerformance', 'Job Performance')}
        </h3>
        <div className="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {t('analytics.jobChartPlaceholder', 'Job performance chart would go here')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="space-y-6">
      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockUserStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.type}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.count}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.active} {t('analytics.active', 'active')}
                </p>
              </div>
              <div className="text-end">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  +{stat.growth}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Growth Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('analytics.userGrowth', 'User Growth')}
        </h3>
        <div className="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              {t('analytics.userChartPlaceholder', 'User growth chart would go here')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('analytics.performanceMetrics', 'Performance Metrics')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('analytics.pageLoadTime', 'Page Load Time')}
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">1.2s</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('analytics.uptime', 'Uptime')}
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">99.9%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '99%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('analytics.reports', 'Reports')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: t('analytics.monthlyReport', 'Monthly Report'), type: 'PDF', size: '2.4 MB' },
            { name: t('analytics.userReport', 'User Report'), type: 'Excel', size: '1.8 MB' },
            { name: t('analytics.revenueReport', 'Revenue Report'), type: 'PDF', size: '3.1 MB' },
            { name: t('analytics.jobReport', 'Job Report'), type: 'Excel', size: '1.2 MB' },
            { name: t('analytics.performanceReport', 'Performance Report'), type: 'PDF', size: '2.7 MB' }
          ].map((report, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 dark:text-white">{report.name}</h4>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {report.type} • {report.size}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'revenue':
        return renderRevenue()
      case 'jobs':
        return renderJobs()
      case 'users':
        return renderUsers()
      case 'performance':
        return renderPerformance()
      case 'reports':
        return renderReports()
      default:
        return renderOverview()
    }
  }

  return (
    <PageLayout
      title={t('analytics.title', 'Analytics')}
      description={t('analytics.description', 'Track your business performance and insights')}
      filterTabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showSearch={false}
      showViewToggle={false}
      headerActions={
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 me-2" />
            {t('analytics.refresh', 'Refresh')}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 me-2" />
            {t('analytics.export', 'Export')}
          </Button>
        </div>
      }
    >
      {renderTabContent()}
    </PageLayout>
  )
}
