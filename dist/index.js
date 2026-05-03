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
export {
  maskAccount,
  maskName,
  splitInstallment
};
