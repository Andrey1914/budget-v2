import { IBaseTransaction } from "@/interfaces";

export const getTransactionTimestamp = (date: Date | string): number => {
  return new Date(date).getTime();
};

export const formatTransactionDate = (date: Date | string): string => {
  return new Date(getTransactionTimestamp(date)).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const sortTransactionsByDate = (
  transactions: IBaseTransaction[],
): IBaseTransaction[] => {
  return [...transactions].sort((a, b) => {
    const timeA = getTransactionTimestamp(a.date);
    const timeB = getTransactionTimestamp(b.date);

    if (timeB !== timeA) {
      return timeB - timeA;
    }

    return String(b._id).localeCompare(String(a._id));
  });
};
