export interface FormatCurrencyOptions {
  currency?: string
  currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay']
  locale?: string
  maximumFractionDigits?: number
  minimumFractionDigits?: number
  useGrouping?: boolean
}

export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {}
): string {
  if (!Number.isFinite(amount)) {
    throw new RangeError('amount must be a finite number')
  }

  const {
    currency = 'USD',
    currencyDisplay,
    locale = 'en-US',
    maximumFractionDigits,
    minimumFractionDigits,
    useGrouping
  } = options

  return new Intl.NumberFormat(locale, {
    currency,
    currencyDisplay,
    maximumFractionDigits,
    minimumFractionDigits,
    style: 'currency',
    useGrouping
  }).format(amount)
}
