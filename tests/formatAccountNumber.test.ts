import { describe, expect, it } from 'vitest';

import { formatAccountNumber } from '../src/accountnumber'

describe('format account number', () => {
    it('should format account number with validate digits', () => {
        expect(formatAccountNumber('1234567890')).toBe('1234-5678-90')
    })

    it('should format mixed digits and non digits', () => {
        expect(formatAccountNumber('cool2149itu42nda4912')).toBe('2149-4249-12')
    })

    it('should format with separator', () => {
        expect(formatAccountNumber('1234-5678-9120')).toBe('1234-5678-9120')
    })

    it('should format whitout digits', () => {
        expect(formatAccountNumber('permudah jalankan menujuMu ya Rabb')).toBe('')
    })

    it('should formate whit space', () => {
        expect(formatAccountNumber('1234 5678 9123',)).toBe('1234-5678-9123')
    })

})