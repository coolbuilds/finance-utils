declare function maskAccount(account: string): string;

declare function maskName(name: string): string;

declare function splitInstallment(amount: number, months: number): number[];

declare function calculateCompoundInterest(principal: number, rate: number, periods: number, contribution?: number): number;

export { calculateCompoundInterest, maskAccount, maskName, splitInstallment };
