import { Schema, Document } from "mongoose";
import { Category } from "./category";

export interface IExpense extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  amount: number;
  category: Schema.Types.ObjectId | string;
  description: string;
  date: Date;
  categoryDetails?: Category;
  currency?: string;
}

export interface ExpenseFormProps {
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

export interface EditExpenseFormProps {
  expenseId: string;
  initialAmount: number;
  initialDescription: string;
  initialCategory: string;
  onExpenseUpdated: () => void;
}
