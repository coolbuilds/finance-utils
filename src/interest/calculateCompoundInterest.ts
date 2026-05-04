function assertFiniteNumber(value: number, name: string): void {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} must be a finite number`)
  }
}

export function calculateCompoundInterest(
  principal: number,
  rate: number,
  periods: number,
  contribution = 0
): number {
  assertFiniteNumber(principal, 'principal')
  assertFiniteNumber(rate, 'rate')
  assertFiniteNumber(periods, 'periods')
  assertFiniteNumber(contribution, 'contribution')

  if (periods < 0) {
    throw new RangeError('periods must be greater than or equal to 0')
  }

  if (rate === 0) {
    return principal + contribution * periods
  }

  const growthFactor = (1 + rate) ** periods
  const contributionValue = contribution * ((growthFactor - 1) / rate)

  return principal * growthFactor + contributionValue
}
