export function splitInstallment(amount: number, months: number): number[] {
  const base = Math.floor(amount / months)
  const remainder = amount % months

  return Array.from({ length: months }, (_, i) =>
    i === months - 1 ? base + remainder : base
  )
}
