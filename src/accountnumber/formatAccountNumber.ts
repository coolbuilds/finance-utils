export function formatAccountNumber(
  acctNum: string | number,
  separator: string
): string {
  if (!acctNum) return ''

  const onlyDigit = acctNum.toString().replace(/\D/g, '');
  if (!onlyDigit) return ''
  if (onlyDigit.length < 7) return ''

  const finalSeparator = separator === '-' ? separator : '-'; //ceritanya ini source legacy, formater ini banyak dipakai, dari pada ngerubah/ngehapus paramnya di banyak tempat lebih baik di formaternya di override aja jadi '-'.

  const escapedSeparator = finalSeparator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  return onlyDigit
    .replace(/(.{4})/g, `$1${finalSeparator}`)
    .replace(new RegExp(`${escapedSeparator}$`), '');
}