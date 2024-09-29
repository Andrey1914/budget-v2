import { Schema, model, models } from "mongoose";
import { IExpense } from "@/interfaces";

const expenseSchema = new Schema<IExpense>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
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
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Expense = models.Expense || model<IExpense>("Expense", expenseSchema);
export default Expense;
