import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import {
  engineerMenu,
  clientMenu,
  adminMenu,
  sidebarNavigation
} from '../../config/menuConfig';
import { MenuSection, MenuItem } from '../../types/navigation';

export default function Sidebar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const isRTL = i18n.language === 'ar';

  // Get menu based on user role
  const getMenuForRole = (): MenuSection[] => {
    switch (user?.role) {
      case 'engineer':
        return engineerMenu;
      case 'client':
        return clientMenu;
      case 'admin':
        return adminMenu;
      default:
        return clientMenu;
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isActiveRoute = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderMenuItem = (item: MenuItem) => {
    const isActive = isActiveRoute(item.path);
    const label = isRTL && item.labelAr ? item.labelAr : item.label;

    // Handle logout specially
    if (item.id === 'logout') {
      return (
        <button
          key={item.id}
          onClick={() => {
            const { logout } = useAuthStore.getState();
            logout();
            setIsOpen(false);
          }}
          className={cn(
            'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 w-full text-start',
            'hover:bg-red-50 dark:hover:bg-red-900/20',
            'text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
          )}
        >
          <span className="text-xl" role="img" aria-label={label}>
            {item.icon}
          </span>
          <span className="flex-1">{label}</span>
        </button>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.path || '#'}
        className={cn(
          'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          isActive && 'bg-primary/10 text-primary dark:bg-primary/20',
          !isActive && 'text-gray-700 dark:text-gray-300'
        )}
        onClick={() => setIsOpen(false)}
      >
        <span className="text-xl" role="img" aria-label={label}>
          {item.icon}
        </span>
        <span className="flex-1">{label}</span>
        {item.badge && (
          <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  const renderMenuSection = (section: MenuSection) => {
    const isExpanded = expandedSections.includes(section.id);
    const title = isRTL && section.titleAr ? section.titleAr : section.title;

    // Check if section should be shown based on roles
    if (section.roles && user?.role && !section.roles.includes(user.role)) {
      return null;
    }

    return (
      <div key={section.id} className="mb-6">
        <button
          onClick={() => toggleSection(section.id)}
          className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
        >
          <span>{title}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {isExpanded && (
          <div className="mt-2 space-y-1">
            {section.items.map(renderMenuItem)}
          </div>
        )}
      </div>
    );
  };

  const mainMenu = getMenuForRole();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 inset-s-4 z-50 lg:hidden p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 inset-s-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl z-40 overflow-y-auto',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0 lg:sticky lg:top-0'
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-2xl font-bold text-primary">
            nbcon Pro
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {user?.role === 'engineer' 
              ? isRTL ? 'لوحة تحكم المهندس' : 'Engineer Dashboard'
              : user?.role === 'admin'
              ? isRTL ? 'لوحة تحكم المسؤول' : 'Admin Dashboard'
              : isRTL ? 'لوحة تحكم العميل' : 'Client Dashboard'
            }
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <nav className="space-y-1">
            {sidebarNavigation.map(item => {
              // Check if item should be shown based on roles
              if (item.roles && user?.role && !item.roles.includes(user.role)) {
                return null;
              }
              return renderMenuItem(item);
            })}
          </nav>
        </div>

        {/* Main Menu Sections */}
        <div className="p-4">
          {mainMenu.map(renderMenuSection)}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {user?.name || 'User'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email || user?.phone}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
