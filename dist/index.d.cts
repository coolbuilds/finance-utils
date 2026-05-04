declare function maskAccount(account: string): string;

declare function maskName(name: string): string;

declare function splitInstallment(amount: number, months: number): number[];

declare function calculateCompoundInterest(principal: number, rate: number, periods: number, contribution?: number): number;

interface FormatCurrencyOptions {
    currency?: string;
    currencyDisplay?: Intl.NumberFormatOptions['currencyDisplay'];
    locale?: string;
    maximumFractionDigits?: number;
    minimumFractionDigits?: number;
    useGrouping?: boolean;
}
declare function formatCurrency(amount: number, options?: FormatCurrencyOptions): string;

export { type FormatCurrencyOptions, calculateCompoundInterest, formatCurrency, maskAccount, maskName, splitInstallment };
