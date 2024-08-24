import { Schema, model, models } from "mongoose";
import { IIncome } from "@/interfaces";

const incomeSchema = new Schema<IIncome>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

const Income = models.Income || model<IIncome>("Income", incomeSchema);
export default Income;
