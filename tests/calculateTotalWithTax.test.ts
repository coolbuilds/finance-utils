import { describe, it, expect } from 'vitest'

import { calculateTotalWithTax } from '../src/calculateTotalWithTax'

describe('calculateTotalWithTax', () => {
  it('should calculate total with tax correctly', () => {
    expect(calculateTotalWithTax(100000, 0.1)).toBe(110000)
  })

  it('should return same amount when taxRate is 0', () => {
    expect(calculateTotalWithTax(100000, 0)).toBe(100000)
  })

  it('should handle decimal tax rate', () => {
    expect(calculateTotalWithTax(200000, 0.075)).toBe(215000)
  })

  it('should handle zero amount', () => {
    expect(calculateTotalWithTax(0, 0.1)).toBe(0)
  })

  it('should handle negative amount (refund case)', () => {
    expect(calculateTotalWithTax(-100000, 0.1)).toBe(-110000)
  })
})