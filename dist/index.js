// src/masking/maskingAccount.ts
function maskAccount(account) {
  if (account.length <= 4) return account;
  const visible = account.slice(-4);
  return "*".repeat(account.length - 4) + visible;
}

// src/masking/maskName.ts
function maskName(name) {
  return name.split(" ").map((word) => word[0] + "*".repeat(word.length - 1)).join(" ");
}

// src/installment/splitInstallment.ts
function splitInstallment(amount, months) {
  const base = Math.floor(amount / months);
  const remainder = amount % months;
  return Array.from(
    { length: months },
    (_, i) => i === months - 1 ? base + remainder : base
  );
}

// src/interest/calculateCompoundInterest.ts
function assertFiniteNumber(value, name) {
  if (!Number.isFinite(value)) {
    throw new RangeError(`${name} must be a finite number`);
  }
}
function calculateCompoundInterest(principal, rate, periods, contribution = 0) {
  assertFiniteNumber(principal, "principal");
  assertFiniteNumber(rate, "rate");
  assertFiniteNumber(periods, "periods");
  assertFiniteNumber(contribution, "contribution");
  if (periods < 0) {
    throw new RangeError("periods must be greater than or equal to 0");
  }
  if (rate === 0) {
    return principal + contribution * periods;
  }
  const growthFactor = (1 + rate) ** periods;
  const contributionValue = contribution * ((growthFactor - 1) / rate);
  return principal * growthFactor + contributionValue;
}
export {
  calculateCompoundInterest,
  maskAccount,
  maskName,
  splitInstallment
};
