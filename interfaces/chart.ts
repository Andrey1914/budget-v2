import { Session, IExpense, IIncome } from "@/interfaces";

export interface CategoryChartProps {
  session: Session;
  selectedMonth: number | "";
  selectedType: string;
  transactions: IIncome[] | IExpense[];
  currencyTotals: CurrencyTotal[];
}

export interface CurrencyTotal {
  currency: string;
  income: number;
  expense: number;
  balance: number;
}

export type AnalyticsTransaction = (IIncome | IExpense) & {
  type: "income" | "expense";
};

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}
