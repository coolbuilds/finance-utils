export function formatAccountNumber(
  acctNum: string,
  separator: string = '-'
): string {
  if (!acctNum) return ''

  const onlyDigit = acctNum.replace(/\D/g, '') //ignore character non digit 0-9
  if (!onlyDigit) return ''

  const escapedSeparator = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  return onlyDigit
    .replace(/(.{4})/g, `$1${separator}`)
    .replace(new RegExp(`${escapedSeparator}$`), '')
}
