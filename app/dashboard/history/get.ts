import axios from "axios";
import { IIncome, IExpense } from "@/interfaces";

interface FilterParams {
  month: number | "";
  type: string;
}

export const fetchTransactions = async (filters: FilterParams) => {
  const { month, type } = filters;

  try {
    const res = await axios.get<{
      transactions: IIncome[] | IExpense[];
      totalSum: number;
    }>("/api/transactions/filterTransactions", {
      params: {
        month: month !== "" ? month : undefined,
        type: type !== "all" ? type : undefined,
      },
    });

    console.log("Ответ от сервера:", res.data);

    return {
      transactions: res.data.transactions,
      totalSum: res.data.totalSum,
    };
  } catch (error) {
    console.error("Ошибка при загрузке транзакций:", error);
    throw error;
  }
};
