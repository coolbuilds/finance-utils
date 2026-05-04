import { describe, it, expect } from 'vitest'

import { calculateCompoundInterest } from '../src/interest'

describe('calculateCompoundInterest', () => {
  it('should calculate compound interest without contribution', () => {
    expect(calculateCompoundInterest(1000, 0.05, 2)).toBeCloseTo(1102.5)
  })

  it('should include contribution added at the end of each period', () => {
    expect(calculateCompoundInterest(1000, 0.05, 2, 100)).toBeCloseTo(1307.5)
  })

  it('should handle zero rate', () => {
    expect(calculateCompoundInterest(1000, 0, 3, 100)).toBe(1300)
  })

  it('should reject negative periods', () => {
    expect(() => calculateCompoundInterest(1000, 0.05, -1)).toThrow(RangeError)
  })
})
