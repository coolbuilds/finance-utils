import { describe, it, expect } from 'vitest'

import { formatCurrency } from '../src/currency'

describe('formatCurrency', () => {
  it('should format currency with default options', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56')
  })

  it('should format currency with custom locale and currency', () => {
    expect(formatCurrency(15000, { currency: 'IDR', locale: 'id-ID' })).toMatch(
      /^Rp\s?15\.000(?:,00)?$/u
    )
  })

  it('should support custom fraction digits', () => {
    expect(
      formatCurrency(1234.5, {
        currency: 'USD',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
      })
    ).toBe('$1,235')
  })

  it('should reject non-finite amount', () => {
    expect(() => formatCurrency(Number.NaN)).toThrow(RangeError)
  })
})
