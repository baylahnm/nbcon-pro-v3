import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  TrendingUp, 
  Download, 
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  Filter,
  Search,
  MoreVertical,
  Shield,
  FileText
} from 'lucide-react'

export default function Payments() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar')

  const tabs = [
    { id: 'overview', label: t('payments.overview', 'Overview'), icon: TrendingUp },
    { id: 'transactions', label: t('payments.transactions', 'Transactions'), icon: CreditCard },
    { id: 'methods', label: t('payments.methods', 'Payment Methods'), icon: Wallet },
    { id: 'escrow', label: t('payments.escrow', 'Escrow'), icon: Shield },
    { id: 'payouts', label: t('payments.payouts', 'Payouts'), icon: Download },
    { id: 'invoices', label: t('payments.invoices', 'Invoices'), icon: FileText }
  ]

  const mockTransactions = [
    {
      id: 'TXN-001',
      type: 'payment',
      amount: 2500,
      currency: 'SAR',
      status: 'completed',
      date: '2024-01-15',
      description: 'Project Payment - Site Inspection',
      engineer: 'Ahmed Al-Rashid'
    },
    {
      id: 'TXN-002',
      type: 'payout',
      amount: 1800,
      currency: 'SAR',
      status: 'pending',
      date: '2024-01-14',
      description: 'Engineer Payout - Electrical Design',
      engineer: 'Sara Al-Mansouri'
    },
    {
      id: 'TXN-003',
      type: 'refund',
      amount: 500,
      currency: 'SAR',
      status: 'completed',
      date: '2024-01-13',
      description: 'Refund - Cancelled Project',
      engineer: 'Mohammed Al-Zahrani'
    }
  ]

  const mockPaymentMethods = [
    {
      id: 'pm-1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'bank',
      bankName: 'Al Rajhi Bank',
      accountNumber: '****1234',
      isDefault: false
    }
  ]

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('payments.totalEarnings', 'Total Earnings')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                12,450 SAR
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('payments.pendingPayments', 'Pending Payments')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                3,200 SAR
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('payments.availableBalance', 'Available Balance')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                8,750 SAR
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t('payments.thisMonth', 'This Month')}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                4,200 SAR
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('payments.recentTransactions', 'Recent Transactions')}
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {mockTransactions.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'payment' ? 'bg-green-100 dark:bg-green-900' :
                    transaction.type === 'payout' ? 'bg-blue-100 dark:bg-blue-900' :
                    'bg-red-100 dark:bg-red-900'
                  }`}>
                    {transaction.type === 'payment' ? (
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : transaction.type === 'payout' ? (
                      <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Upload className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {transaction.engineer} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    transaction.type === 'refund' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                  }`}>
                    {transaction.type === 'refund' ? '-' : '+'}{transaction.amount} {transaction.currency}
                  </p>
                  <div className="flex items-center">
                    {transaction.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <Clock className="w-4 h-4 text-yellow-500 mr-1" />
                    )}
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              {t('payments.viewAllTransactions', 'View All Transactions')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTransactions = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t('payments.searchTransactions', 'Search transactions...')}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
            <option>{t('payments.allStatuses', 'All Statuses')}</option>
            <option>{t('payments.completed', 'Completed')}</option>
            <option>{t('payments.pending', 'Pending')}</option>
            <option>{t('payments.failed', 'Failed')}</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
            <option>{t('payments.allTypes', 'All Types')}</option>
            <option>{t('payments.payment', 'Payment')}</option>
            <option>{t('payments.payout', 'Payout')}</option>
            <option>{t('payments.refund', 'Refund')}</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('payments.transaction', 'Transaction')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('payments.amount', 'Amount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('payments.status', 'Status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('payments.date', 'Date')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('payments.actions', 'Actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {transaction.id} • {transaction.engineer}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      transaction.type === 'refund' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                    }`}>
                      {transaction.type === 'refund' ? '-' : '+'}{transaction.amount} {transaction.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {transaction.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {transaction.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {transaction.status === 'failed' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderPaymentMethods = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t('payments.paymentMethods', 'Payment Methods')}
        </h3>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('payments.addMethod', 'Add Method')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPaymentMethods.map((method) => (
          <div key={method.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {method.brand || method.bankName}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {method.type === 'card' ? `****${method.last4}` : method.accountNumber}
                  </p>
                </div>
              </div>
              {method.isDefault && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {t('payments.default', 'Default')}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {method.type === 'card' ? `Expires ${method.expiry}` : 'Bank Account'}
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderEscrow = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('payments.escrowFunds', 'Escrow Funds')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">5,200 SAR</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('payments.heldInEscrow', 'Held in Escrow')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">2</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('payments.activeEscrows', 'Active Escrows')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">15</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('payments.completedEscrows', 'Completed Escrows')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderPayouts = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('payments.payoutSettings', 'Payout Settings')}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('payments.payoutMethod', 'Payout Method')}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
              <option>{t('payments.bankTransfer', 'Bank Transfer')}</option>
              <option>{t('payments.paypal', 'PayPal')}</option>
              <option>{t('payments.stripe', 'Stripe')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('payments.payoutFrequency', 'Payout Frequency')}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white">
              <option>{t('payments.weekly', 'Weekly')}</option>
              <option>{t('payments.monthly', 'Monthly')}</option>
              <option>{t('payments.manual', 'Manual')}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('payments.invoices', 'Invoices')}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {t('payments.invoicesDescription', 'Manage your invoices and billing history')}
        </p>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'transactions':
        return renderTransactions()
      case 'methods':
        return renderPaymentMethods()
      case 'escrow':
        return renderEscrow()
      case 'payouts':
        return renderPayouts()
      case 'invoices':
        return renderInvoices()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('payments.title', 'Payments')}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {t('payments.description', 'Manage your payments, transactions, and financial settings')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
