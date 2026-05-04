export function calculateTotalWithTax(amount: number, taxRate: number): number {
  return amount + amount * taxRate
}