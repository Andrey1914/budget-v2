export const formatAmount = (amount: number): string => {
  if (!Number.isFinite(amount)) {
    return "";
  }

  return amount.toFixed(2);
};

export const convertCurrencyAmount = (
  amountValue: string,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>,
): string => {
  if (amountValue.trim() === "") {
    return "";
  }

  const amount = Number(amountValue);
  const rateFrom = rates[fromCurrency];
  const rateTo = rates[toCurrency];

  if (
    !Number.isFinite(amount) ||
    amount < 0 ||
    rateFrom === undefined ||
    rateTo === undefined ||
    rateFrom <= 0 ||
    rateTo <= 0
  ) {
    return "";
  }

  return formatAmount(amount * (rateTo / rateFrom));
};
