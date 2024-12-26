import { Session, IExpense, IIncome } from "@/interfaces";

export interface CategoryChartProps {
  session: Session;
  selectedMonth: number | "";
  selectedType: string;
  transactions: IIncome[] | IExpense[];
}

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
