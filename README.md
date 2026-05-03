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
- 🔐 Data masking (account, name, etc.)
- 🧾 Transaction utilities
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

## 🧩 API

### `maskAccount(account: string): string`

Mask account number, leaving last 4 digits visible.

### `maskName(name: string): string`

Mask each word in a name.

### `splitInstallment(amount: number, months: number): number[]`

Split amount into installments with correct rounding.

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

## 📄 License

MIT

---

## 💡 Vision

This package is part of a growing ecosystem of modular financial tools
designed to simplify development in fintech and banking systems.
