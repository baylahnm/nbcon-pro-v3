import React from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, Search, Settings, Globe, Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { cn } from '../../lib/utils';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useThemeStore();
  const isRTL = i18n.language === 'ar';

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className={cn(
              "absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400",
              isRTL ? "right-3" : "left-3"
            )} />
            <input
              type="text"
              placeholder={t('common.search', 'Search...')}
              className={cn(
                "w-full h-10 bg-gray-100 dark:bg-gray-700 rounded-lg",
                "text-gray-900 dark:text-gray-100 placeholder-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-primary/50",
                isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
              )}
            />
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 ml-6">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle language"
          >
            <Globe className="w-5 h-5" />
            <span className="ml-1 text-sm font-medium">
              {i18n.language.toUpperCase()}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Settings */}
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
