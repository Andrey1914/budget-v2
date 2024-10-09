import { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

// User interfaces
export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  password: string;
  token?: string;
  isVerified: boolean;
  verificationCode?: string;
  // tempPassword?: string;
  // tempPasswordExpires?: Date;
}

export interface IVerifyResponse {
  isVerified: boolean;
  message?: string;
  error?: string;
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
  _id: Schema.Types.ObjectId;
  // user: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  amount: number;
  description: string;
  date: Date;
}

export interface EditExpenseFormProps {
  expenseId: string;
  initialAmount: number;
  initialDescription: string;
  initialCategory: string;
  onExpenseUpdated: () => void; // Коллбэк для обновления задач после редактирования
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
  _id: Schema.Types.ObjectId;
  // user: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  amount: number;
  description: string;
  date: Date;
}

export interface EditIncomeFormProps {
  incomeId: string;
  initialAmount: number;
  initialDescription: string;
  initialCategory: string;
  onIncomeUpdated: () => void; // Коллбэк для обновления задач после редактирования
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
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  completed: boolean;
}

export interface TaskFormProps {
  onSubmit: (data: { title: string; content: string }) => void;
}

export interface EditTaskFormProps {
  taskId: string;
  initialTitle: string;
  initialContent: string;
  initialCompleted: boolean;
  onTaskUpdated: () => void; // Коллбэк для обновления задач после редактирования
}

export interface Transaction {
  _id: ObjectId; // Или ObjectId, в зависимости от вашей реализации
  date: string;
  amount: number;
  type: "income" | "expense";
}
