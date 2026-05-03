import { describe, it, expect } from 'vitest'

import { splitInstallment } from '../src/installment'

describe('splitInstallment', () => {
  it('should split evenly', () => {
    expect(splitInstallment(1000, 2)).toEqual([500, 500])
  })

  it('should handle remainder correctly', () => {
    expect(splitInstallment(1000, 3)).toEqual([333, 333, 334])
  })

  it('should handle small values', () => {
    expect(splitInstallment(1, 2)).toEqual([0, 1])
  })
})
