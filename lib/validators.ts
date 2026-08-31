import { z } from "zod";

// (Task)
export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  date: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  date: z.string().optional(),
});

// (Transactions)
export const createTransactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.union([z.number(), z.string()]).transform((val) => {
    const num = typeof val === "number" ? val : parseFloat(val);
    if (isNaN(num) || num <= 0)
      throw new Error("Amount must be a positive number");
    return num;
  }),
  description: z.string().optional().default(""),
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"),
  currency: z.string().min(1, "Currency is required"),
});

// (Review)
export const createReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5"),
  text: z.string().min(1, "Text must be a non-empty string"),
});

// (Profile)
export const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  avatar: z.string().min(1, "Avatar is required"),
  baseCurrency: z.string().optional(),
});

// DTO
export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
export type CreateTransactionDto = z.infer<typeof createTransactionSchema>;
export type CreateReviewDto = z.infer<typeof createReviewSchema>;
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
