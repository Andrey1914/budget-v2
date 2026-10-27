import { Schema, Document } from "mongoose";
import { ObjectId } from "mongodb";
import { ICategory } from "./category";

export interface IBaseTransaction extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  amount: number;
  category: Schema.Types.ObjectId | string;
  description: string;
  date: Date;
  categoryDetails?: ICategory;
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
  type: "income" | "expense";
  initialData?: any;
  onSuccess?: () => void;
  onClose?: () => void;
  onSubmit?: (data?: any) => void | Promise<any>;
}

