// Expense
export type Expense = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

// Income
export type Income = {
  _id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
};

// Task
export type Task = {
  _id: string;
  title: string;
  content: string;
  date: string;
  completed: boolean;
};
