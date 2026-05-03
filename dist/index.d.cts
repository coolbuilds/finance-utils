declare function maskAccount(account: string): string;

declare function maskName(name: string): string;

declare function splitInstallment(amount: number, months: number): number[];

export { maskAccount, maskName, splitInstallment };
