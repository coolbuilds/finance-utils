"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  calculateCompoundInterest: () => calculateCompoundInterest,
  formatCurrency: () => formatCurrency,
  maskAccount: () => maskAccount,
  maskName: () => maskName,
  splitInstallment: () => splitInstallment
});
module.exports = __toCommonJS(index_exports);

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

// src/currency/formatCurrency.ts
function formatCurrency(amount, options = {}) {
  if (!Number.isFinite(amount)) {
    throw new RangeError("amount must be a finite number");
  }
  const {
    currency = "USD",
    currencyDisplay,
    locale = "en-US",
    maximumFractionDigits,
    minimumFractionDigits,
    useGrouping
  } = options;
  return new Intl.NumberFormat(locale, {
    currency,
    currencyDisplay,
    maximumFractionDigits,
    minimumFractionDigits,
    style: "currency",
    useGrouping
  }).format(amount);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calculateCompoundInterest,
  formatCurrency,
  maskAccount,
  maskName,
  splitInstallment
});
