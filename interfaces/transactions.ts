import { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { Category } from "./category";

export interface IBaseTransaction extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  amount: number;
  category: Schema.Types.ObjectId | string;
  description: string;
  date: Date;
  categoryDetails?: Category;
  currency?: string;
}

export interface Transaction {
  _id: ObjectId;
  date: string;
  amount: number;
  type: "income" | "expense";
  currency: string;
}

export interface TransactionFormProps {
  amount: number | string;
  setAmount: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  currency: string;
  setCurrency: (value: string) => void;
  currencies: { code: string; name: string }[];
  date: string;
  setDate: (value: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  categories: Category[];
  newCategory: string;
  newCategoryDescription: string;
  setNewCategory: (value: string) => void;
  setNewCategoryDescription: (value: string) => void;
  handleAddCategory: () => Promise<void>;
  handleEditCategory: () => Promise<void>;
  handleOpenEditDialog: (category: Category) => void;
  handleDeleteCategory: () => Promise<void>;
  openAddDialog: boolean;
  setOpenAddDialog: (open: boolean) => void;
  openEditDialog: boolean;
  setOpenEditDialog: (open: boolean) => void;
  editingCategory: Category | null;
  handleCloseEditDialog: () => void;

  open: boolean;
  anchorEl: HTMLElement | null;
  message: string;
  onClose: () => void;
}
