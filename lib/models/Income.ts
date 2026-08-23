import { Schema, model, models } from "mongoose";
import { IIncome } from "@/interfaces";

const incomeSchema = new Schema<IIncome>(
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

const Income = models.Income || model<IIncome>("Income", incomeSchema);

export default Income;
