import { Schema, model, models } from "mongoose";
import { IExpense } from "@/interfaces";

const expenseSchema = new Schema<IExpense>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
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

// import { Schema, model, models } from "mongoose";
// import { IExpense } from "@/interfaces";

// const expenseSchema = new Schema<IExpense>(
//   {
//     user: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// const Expense = models.Expense || model<IExpense>("Expense", expenseSchema);
// export default Expense;
