import { describe, it, expect } from 'vitest'

import { maskAccount, maskName } from '../src/masking'

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
})
