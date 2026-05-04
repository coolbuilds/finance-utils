export function calculateTotalWithTax(amount: number, taxRate: number): number {
  if (!Number.isFinite(amount) || !Number.isFinite(taxRate)) {
    return 0
  }

  return amount + amount * taxRate
}
