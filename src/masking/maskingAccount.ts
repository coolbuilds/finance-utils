export function maskAccount(account: string): string {
  if (account.length <= 4) return account
  const visible = account.slice(-4)
  return '*'.repeat(account.length - 4) + visible
}
