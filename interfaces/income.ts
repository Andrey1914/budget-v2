import { Schema, Document } from "mongoose";
import { Category } from "./category";

export interface IIncome extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  amount: number;
  category: Schema.Types.ObjectId | string;
  description: string;
  date: Date;
  categoryDetails?: Category;
  currency?: string;
}

export interface IncomeFormProps {
  initialData?: {
    amount: number;
    category: string;
    description: string;
    date: string;
    currency: string;
  };
  onSubmit: (data: {
    amount: number;
    category: string;
    description: string;
    date: string;
    currency: string;
  }) => void;
}

export interface EditIncomeFormProps {
  incomeId: string;
  initialAmount: number;
  initialDescription: string;
  initialCategory: string;
  onIncomeUpdated: () => void;
}
