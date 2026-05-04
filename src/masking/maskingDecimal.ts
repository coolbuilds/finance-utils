type Currency =
  | "IDR" | "USD" | "THB" | "SGD"
  | "CAD" | "AUD" | "CHF" | "CNY"
  | "DKK" | "EUR" | "GBP" | "HKD"
  | "JPY" | "NZD" | "SEK" | "MYR"
  | "KRW"
  | string;

export function maskingDecimal(
  isDecimal: string | number | null | undefined,
  currency: Currency,
  locale: string = "en-US"
): string {
  if (isDecimal === null || isDecimal === undefined || isDecimal === "") {
    return "-";
  }

  const numSplit = isDecimal.toString().split(".");
  const intPart = numSplit[0];
  const decPart = numSplit[1] || "";

  const convertInt = parseInt(intPart, 10).toLocaleString(locale);
  const convertDec = decPart
    ? decPart.padEnd(2, "0").substring(0, 2)
    : "00";

  let result: string;

  if (currency === "IDR" && convertDec === "00") {
    result = convertInt;
  } else {
    result = `${convertInt}.${convertDec}`;
  }

  const currencyMap: Record<string, string> = {
    IDR: "Rp",
    USD: "USD",
    THB: "THB",
    SGD: "SGD",
    CAD: "CAD",
    AUD: "AUD",
    CHF: "CHF",
    CNY: "CNY",
    DKK: "DKK",
    EUR: "EUR",
    GBP: "GBP",
    HKD: "HKD",
    JPY: "JPY",
    NZD: "NZD",
    SEK: "SEK",
    MYR: "MYR",
    KRW: "KRW",
  };

  const currencyValue = currencyMap[currency] || currency;

  return `${currencyValue} ${result}`;
}