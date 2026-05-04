![Coverage](./badges.svg)

# @coolbuilds/finance-utils

A modular TypeScript toolkit for financial logic --- built for
scalability, performance, and great developer experience.

> Lightweight utilities for building banking, fintech, and payment
> applications.

---

## ✨ Features

- 💱 Currency & number helpers
- 💳 Installment calculations
- 📈 Compound interest calculations
- 🔐 Data masking (account, name, etc.)
- 🧾 Transaction utilities
- 🧾 Tax & fee calculations
- ⚡ Zero dependencies
- 🧠 Simple, composable functions

---

## 📦 Installation

```bash
npm install @coolbuilds/finance-utils
```

or

```bash
yarn add @coolbuilds/finance-utils
```

---

## 🚀 Usage

### 🔐 Masking

```ts
import { maskAccount, maskName } from '@coolbuilds/finance-utils'

maskAccount('1234567890')
// ******7890

maskName('Ricky Ariansyah')
// R**** A********
```

---

### 💳 Installment

```ts
import { splitInstallment } from '@coolbuilds/finance-utils'

splitInstallment(1000, 3)
// [333, 333, 334]
```

---

### 📈 Interest

```ts
import { calculateCompoundInterest } from '@coolbuilds/finance-utils'

calculateCompoundInterest(1000, 0.05, 2, 100)
// 1307.5
```

---

### 🧾 Tax Calculation

```ts
import { calculateTotalWithTax } from '@coolbuilds/finance-utils'

calculateTotalWithTax(100000, 0.1)
// 110000

---

## 🧩 API

### `maskAccount(account: string): string`

Mask account number, leaving last 4 digits visible.

### `maskName(name: string): string`

Mask each word in a name.

### `splitInstallment(amount: number, months: number): number[]`

Split amount into installments with correct rounding.

### `calculateCompoundInterest(principal: number, rate: number, periods: number, contribution?: number): number`

Calculate compound interest, with optional contribution added at the end
of each period.

### `calculateTotalWithTax(amount: number, taxRate: number): number`

Calculate total amount including tax.

- `amount`: base amount
- `taxRate`: tax rate in decimal (e.g. 0.1 for 10%)

Returns total amount after tax.

---

## 🛠️ Development

```bash
npm install
npm run test
npm run lint
npm run format
npm run build
```

---

## 🧪 Testing

This project uses **Vitest** for unit testing.

```bash
npm run test
```

---

## 📁 Project Structure

```bash
src/
  masking/
  installment/
  interest/
  transaction/
tests/
```

---

## 🤝 Contributing

Contributions are welcome!

1.  Fork the repository\
2.  Create your feature branch\
3.  Commit your changes\
4.  Open a pull request

---

## 👥 Contributors

<table>
<tr>
<td align="center"><a href="https://github.com/coolbuilds"><img src="https://github.com/coolbuilds.png?size=128" width="64" height="64" alt="Ricky Ariansyah" /><br /><sub><b>Ricky Ariansyah</b></sub></a></td>
</tr>
</table>

---

## 📄 License

MIT

---

## 💡 Vision

This package is part of a growing ecosystem of modular financial tools
designed to simplify development in fintech and banking systems.
