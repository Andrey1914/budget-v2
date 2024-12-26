// import { Schema, Document } from "mongoose";
// import { ObjectId } from "mongodb";

// export interface Session {
//   user: IUser;
//   expires: string;
// }

// User interfaces
// export interface IUser extends Document {
//   _id?: string;
//   name: string;
//   email: string;
//   image: string;
//   password: string;
//   token?: string;
//   isVerified: boolean;
//   verificationCode?: string;
//   currency?: string;
// }

// export interface IVerifyResponse {
//   isVerified: boolean;
//   message?: string;
//   error?: string;
// }

// export interface Token {
//   sub: string;
//   email: string;
//   name: string;
//   iat: number;
//   exp: number;
// }

// Expense interfeces

// export interface IExpense extends Document {
//   _id: Schema.Types.ObjectId;
//   userId: Schema.Types.ObjectId;
//   amount: number;
//   category: Schema.Types.ObjectId | string;
//   description: string;
//   date: Date;
//   categoryDetails?: Category;
//   currency?: string;
// }

// export interface EditExpenseFormProps {
//   expenseId: string;
//   initialAmount: number;
//   initialDescription: string;
//   initialCategory: string;
//   onExpenseUpdated: () => void;
// }

// export interface ExpenseFormProps {
//   initialData?: {
//     amount: number;
//     category: string;
//     description: string;
//     date: string;
//     currency: string;
//   };
//   onSubmit: (data: {
//     amount: number;
//     category: string;
//     description: string;
//     date: string;
//     currency: string;
//   }) => void;
// }

// Income interfaces
// export interface IIncome extends Document {
//   _id: Schema.Types.ObjectId;
//   userId: Schema.Types.ObjectId;
//   amount: number;
//   category: Schema.Types.ObjectId | string;
//   description: string;
//   date: Date;
//   categoryDetails?: Category;
//   currency?: string;
// }

// export interface EditIncomeFormProps {
//   incomeId: string;
//   initialAmount: number;
//   initialDescription: string;
//   initialCategory: string;
//   onIncomeUpdated: () => void;
// }

// export interface IncomeFormProps {
//   initialData?: {
//     amount: number;
//     category: string;
//     description: string;
//     date: string;
//     currency: string;
//   };
//   onSubmit: (data: {
//     amount: number;
//     category: string;
//     description: string;
//     date: string;
//     currency: string;
//   }) => void;
// }

// Category interfaces

// export interface Category {
//   _id: string;
//   name: string;
//   description: string;
// }

// export interface CategoryFormProps {
//   initialData?: Category;
//   onSubmit: (data: Category) => void;
// }

// Task interfaces
// export interface ITask extends Document {
//   user: Schema.Types.ObjectId;
//   userId: Schema.Types.ObjectId;
//   title: string;
//   description: string;
//   completed: boolean;
// }

// export interface TaskFormProps {
//   onSubmit: (data: { title: string; content: string }) => void;
// }

// export interface EditTaskFormProps {
//   taskId: string;
//   initialTitle: string;
//   initialContent: string;
//   initialCompleted: boolean;
//   onTaskUpdated: () => void;
// }

// export interface Transaction {
//   _id: ObjectId;
//   date: string;
//   amount: number;
//   type: "income" | "expense";
//   currency: string;
// }

// export interface TransactionFormProps {
//   amount: number | string;
//   setAmount: (value: string) => void;
//   category: string;
//   setCategory: (value: string) => void;
//   description: string;
//   setDescription: (value: string) => void;
//   currency: string;
//   setCurrency: (value: string) => void;
//   currencies: { code: string; name: string }[];
//   date: string;
//   setDate: (value: string) => void;
//   loading: boolean;
//   onSubmit: (e: React.FormEvent) => void;
//   categories: Category[];
//   newCategory: string;
//   newCategoryDescription: string;
//   setNewCategory: (value: string) => void;
//   setNewCategoryDescription: (value: string) => void;
//   handleAddCategory: () => Promise<void>;
//   handleEditCategory: () => Promise<void>;
//   handleOpenEditDialog: (category: Category) => void;
//   handleDeleteCategory: () => Promise<void>;
//   openAddDialog: boolean;
//   setOpenAddDialog: (open: boolean) => void;
//   openEditDialog: boolean;
//   setOpenEditDialog: (open: boolean) => void;
//   editingCategory: Category | null;
//   handleCloseEditDialog: () => void;

//   open: boolean;
//   anchorEl: HTMLElement | null;
//   message: string;
//   onClose: () => void;
// }

// export interface IReview extends Document {
//   _id: Schema.Types.ObjectId;
//   userId: Schema.Types.ObjectId;
//   username: string;
//   avatar?: string;
//   rating: number;
//   text: string;
//   createdAt: Date;
// }

// export interface BalanceComparisonProps {
//   totalIncome: number;
//   totalExpense: number;
//   carryOverBalance?: number;
//   // balance: number;
// }
