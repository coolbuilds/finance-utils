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

  it('should handle string input expected return 0', () => {
    expect(calculateTotalWithTax('hahahahah', 'kocakgaming')).toBe(0)
  })

  it('should return 0 when amount is NaN', () => {
    expect(calculateTotalWithTax(NaN, 0.1)).toBe(0)
  })

  it('should return 0 when taxRate is NaN', () => {
    expect(calculateTotalWithTax(100000, NaN)).toBe(0)
  })

  it('should return 0 when amount is Infinity', () => {
    expect(calculateTotalWithTax(Infinity, 0.1)).toBe(0)
  })

  it('should return 0 when taxRate is Infinity', () => {
    expect(calculateTotalWithTax(100000, Infinity)).toBe(0)
  })

  it('should calculate precise decimal result', () => {
    expect(calculateTotalWithTax(0.1, 0.2)).toBe(0.12)
  })
})
