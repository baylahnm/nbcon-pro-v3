import React, { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import '../src/index.css'
import './storybook.css'
import i18n from '../src/i18n'

const withI18n = (Story, context) => {
  const locale = context.globals.locale || 'en'
  useEffect(() => {
    i18n.changeLanguage(locale)
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [locale])
  return <Story />
}

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'ar', title: 'العربية' }
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  decorators: [withI18n]
}

export default preview


