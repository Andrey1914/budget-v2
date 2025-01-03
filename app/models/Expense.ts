import { Schema, model, models } from "mongoose";
import { IExpense } from "@/interfaces";

const expenseSchema = new Schema<IExpense>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = models.Expense || model<IExpense>("Expense", expenseSchema);

export default Expense;
