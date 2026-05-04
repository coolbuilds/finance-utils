export function calculateTotalWithTax(amount: number, taxRate: number): number {
  if (!Number.isFinite(amount) || !Number.isFinite(taxRate)) {
    return 0
  }

  const result = amount + amount * taxRate
  return Number(result.toFixed(2))
}
