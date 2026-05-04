import { describe, it, expect } from 'vitest'

import { maskAccount, maskName, maskingDecimal } from '../src/masking'

describe('masking', () => {
  describe('maskAccount', () => {
    it('should mask all except last 4 digits', () => {
      expect(maskAccount('1234567890')).toBe('******7890')
    })

    it('should return same if length <= 4', () => {
      expect(maskAccount('1234')).toBe('1234')
    })
  })

  describe('maskName', () => {
    it('should mask each word', () => {
      expect(maskName('Ricky Ariansyah')).toBe('R**** A********')
    })
  })

  describe('maskingDecimal', () => {
    it('should mask decimal with amount, currency, locale', () => {
      expect(maskingDecimal('10000', 'IDR', 'en-US')).toBe('Rp 10,000')
    })

    it('should mask decimal with amount decimal, currency, locale', () => {
      expect(maskingDecimal(10000.5, 'USD', 'en-US')).toBe('USD 10,000.50')
    })

    it('should mask decimal with amount decimal, currency, other locale', () => {
      expect(maskingDecimal(10000.5, 'IDR', 'id-ID')).toBe('Rp 10.000.50')
    })

    it('should mask decimal with amount zero, currency, without locale', () => {
      expect(maskingDecimal(0, 'IDR')).toBe('Rp 0')
    })

    it('should mask decimal with amount null, currency, without locale', () => {
      expect(maskingDecimal(null, 'IDR')).toBe('-')
    })

    it('should handle invalid number properly (expected fallback)', () => {
    expect(maskingDecimal('abc', 'IDR')).toBe('-')
})
  })
})
