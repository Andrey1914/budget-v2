import { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";

export interface Session {
  user: IUser;
  expires: string;
}

// User interfaces
export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  image: string;
  password: string;
  token?: string;
  isVerified: boolean;
  verificationCode?: string;
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
  userId: Schema.Types.ObjectId;
  amount: number;
  category: Schema.Types.ObjectId | string;
  description: string;
  date: Date;
  categoryDetails?: Category;
}

export interface EditExpenseFormProps {
  expenseId: string;
  initialAmount: number;
  initialDescription: string;
  initialCategory: string;
  onExpenseUpdated: () => void;
}

export interface ExpenseFormProps {
  initialData?: {
    amount: number;
    category: string;
    description: string;
    date: string;
  };
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
  userId: Schema.Types.ObjectId;
  amount: number;
  category: Schema.Types.ObjectId | string;
  description: string;
  date: Date;
  categoryDetails?: Category;
}

export interface EditIncomeFormProps {
  incomeId: string;
  initialAmount: number;
  initialDescription: string;
  initialCategory: string;
  onIncomeUpdated: () => void;
}

export interface IncomeFormProps {
  initialData?: {
    amount: number;
    category: string;
    description: string;
    date: string;
  };
  onSubmit: (data: {
    amount: number;
    category: string;
    description: string;
    date: string;
  }) => void;
}

// Category interfaces

export interface Category {
  _id: string;
  name: string;
  description: string;
}

export interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: Category) => void;
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
  onTaskUpdated: () => void;
}

export interface Transaction {
  _id: ObjectId;
  date: string;
  amount: number;
  type: "income" | "expense";
}

export interface IReview extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  username: string;
  avatar?: string;
  rating: number;
  text: string;
  createdAt: Date;
}
