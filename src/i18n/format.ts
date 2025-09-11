export type NumeralStyle = 'latin' | 'arabic-indic'

const ARABIC_INDIC_MAP: Record<string, string> = {
  '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
  '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩',
  ',': '،'
}

const toArabicIndic = (input: string): string => {
  return input.replace(/[0-9,]/g, ch => ARABIC_INDIC_MAP[ch] ?? ch)
}

export interface FormatNumberOptions {
  locale?: string
  style?: NumeralStyle
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export const formatNumber = (
  value: number,
  { locale = 'en', style = 'latin', minimumFractionDigits, maximumFractionDigits }: FormatNumberOptions = {}
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits
  })
  const formatted = formatter.format(value)
  return style === 'arabic-indic' ? toArabicIndic(formatted) : formatted
}

export interface FormatCurrencyOptions extends FormatNumberOptions {
  currency?: string
}

export const formatCurrency = (
  value: number,
  { locale = 'en', style = 'latin', currency = 'SAR', minimumFractionDigits, maximumFractionDigits }: FormatCurrencyOptions = {}
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  })
  const formatted = formatter.format(value)
  return style === 'arabic-indic' ? toArabicIndic(formatted) : formatted
}

export interface FormatDateOptions {
  locale?: string
  withTime?: boolean
  // Note: Hijri is approximated here; replace with a proper Hijri lib if needed
  useHijri?: boolean
  numeralStyle?: NumeralStyle
}

// Very lightweight Hijri approximation using Intl for Arabic locale fallback
const approximateHijri = (date: Date): string => {
  // Placeholder: show Gregorian with AR locale tag as interim display
  return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

export const formatDate = (
  input: Date | string | number,
  { locale = 'en', withTime = false, useHijri = false, numeralStyle = 'latin' }: FormatDateOptions = {}
): string => {
  const date = input instanceof Date ? input : new Date(input)
  let formatted = ''
  if (useHijri) {
    formatted = approximateHijri(date)
  } else {
    formatted = new Intl.DateTimeFormat(locale, {
      year: 'numeric', month: 'short', day: 'numeric',
      ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {})
    }).format(date)
  }
  return numeralStyle === 'arabic-indic' ? toArabicIndic(formatted) : formatted
}


