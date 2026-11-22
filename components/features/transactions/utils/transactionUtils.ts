import { IBaseTransaction } from "@/interfaces";

export type TransactionType = "income" | "expense";

export const getTransactionCategoryName = (
  transaction: IBaseTransaction,
  categoryMap: Record<string, string>,
  fallback = "",
): string => {
  const categoryId = transaction.category?.toString();

  if (!categoryId) {
    return fallback;
  }

  return categoryMap[categoryId] ?? fallback;
};

export const getTransactionTotal = (
  transactions: IBaseTransaction[],
  currency?: string,
): number => {
  if (!currency) {
    return 0;
  }

  return transactions
    .filter((transaction) => transaction.currency === currency)
    .reduce((total, transaction) => total + transaction.amount, 0);
};
