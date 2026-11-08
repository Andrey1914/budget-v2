import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export interface CreateTransactionInput {
  type: "income" | "expense";
  amount: number | string;
  description?: string;
  category: string | ObjectId;
  date: string | Date;
  currency: string;
}

export interface UpdateTransactionInput {
  type: "income" | "expense";
  amount: number | string;
  description: string;
  category: string | ObjectId;
  date: string | Date;
}

export const transactionService = {
  async getTransactions(
    type: "income" | "expense",
    userId: string,
    startDate?: string,
    endDate?: string,
  ) {
    const db = await getDb();
    const start = startDate
      ? new Date(startDate)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const end = endDate
      ? new Date(endDate)
      : new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0,
          23,
          59,
          59,
        );

    return db
      .collection(type)
      .find({
        userId: new ObjectId(userId),
        date: { $gte: start, $lte: end },
      })
      .toArray();
  },

  async getTransactionById(
    type: "income" | "expense",
    id: string,
    userId: string,
  ) {
    const db = await getDb();
    return db.collection(type).findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });
  },

  async createTransaction(userId: string, input: CreateTransactionInput) {
    const db = await getDb();
    const transactionDate = new Date(input.date);
    const categoryId =
      typeof input.category === "string"
        ? new ObjectId(input.category)
        : input.category;
    const parsedAmount =
      typeof input.amount === "string"
        ? parseFloat(input.amount)
        : input.amount;

    const result = await db.collection(input.type).insertOne({
      userId: new ObjectId(userId),
      amount: parsedAmount,
      description: input.description || "",
      category: categoryId,
      date: transactionDate,
      createdAt: new Date(),
      currency: input.currency,
    });

    return {
      _id: result.insertedId,
      userId,
      amount: parsedAmount,
      description: input.description || "",
      category: categoryId,
      date: transactionDate,
      currency: input.currency,
    };
  },

  async updateTransaction(
    id: string,
    userId: string,
    input: UpdateTransactionInput,
  ) {
    const db = await getDb();
    const parsedAmount =
      typeof input.amount === "string"
        ? parseFloat(input.amount)
        : input.amount;
    const categoryId =
      typeof input.category === "string"
        ? new ObjectId(input.category)
        : input.category;

    const result = await db.collection(input.type).updateOne(
      { _id: new ObjectId(id), userId: new ObjectId(userId) },
      {
        $set: {
          amount: parsedAmount,
          description: input.description,
          category: categoryId,
          date: new Date(input.date),
          updatedAt: new Date(),
        },
      },
    );

    return result.matchedCount > 0;
  },

  async deleteTransaction(
    type: "income" | "expense",
    id: string,
    userId: string,
  ) {
    const db = await getDb();
    const result = await db.collection(type).deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(userId),
    });

    return result.deletedCount > 0;
  },
};
