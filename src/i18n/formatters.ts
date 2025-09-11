import i18next from 'i18next'

export function formatSar(amount: number): string {
  const lang = i18next.language || 'en'
  const locale = lang.startsWith('ar') ? 'ar-SA' : 'en-US'
  const numberingSystem = lang.startsWith('ar') ? 'arab' : 'latn'
  try {
    // @ts-ignore
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'SAR',
      currencyDisplay: 'narrowSymbol',
      maximumFractionDigits: 0,
      numberingSystem
    }).format(amount)
  } catch {
    const sar = i18next.t('currency.sar', { ns: 'jobs', defaultValue: 'SAR' })
    return `${sar} ${amount}`
  }
}

export function formatNumber(n: number): string {
  const lang = i18next.language || 'en'
  const locale = lang.startsWith('ar') ? 'ar-SA' : 'en-US'
  const numberingSystem = lang.startsWith('ar') ? 'arab' : 'latn'
  try {
    // @ts-ignore
    return new Intl.NumberFormat(locale, { numberingSystem }).format(n)
  } catch {
    return `${n}`
  }
}

export function tCity(raw: string, t: (k: string, o?: any) => string): string {
  const key = `cities.${raw.trim().toLowerCase()}`
  const translated = t(key, { ns: 'jobs', defaultValue: '' })
  return translated || raw
}


