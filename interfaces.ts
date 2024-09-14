import { Schema, Document } from "mongoose";

// User interfaces
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface Token {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

// Expense interfeces

export interface IExpense extends Document {
  user: Schema.Types.ObjectId;
  amount: number;
  description: string;
  date: Date;
}

export interface ExpenseFormProps {
  onSubmit: (data: {
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => void;
}

// Income interfaces
export interface IIncome extends Document {
  user: Schema.Types.ObjectId;
  amount: number;
  description: string;
  date: Date;
}

export interface IncomeFormProps {
  onSubmit: (data: {
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => void;
}

// Task interfaces
export interface ITask extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskFormProps {
  onSubmit: (data: { title: string; content: string }) => void;
}
