import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export interface CreateTaskInput {
  title: string;
  content: string;
  date?: string | Date;
}

export interface UpdateTaskInput {
  title: string;
  content: string;
  date?: string | Date;
}

export const taskService = {
  async getTasks(userId: string) {
    const db = await getDb();
    return db
      .collection("tasks")
      .find({ userId: new ObjectId(userId) })
      .toArray();
  },

  async getTaskById(taskId: string, userId: string) {
    const db = await getDb();
    return db.collection("tasks").findOne({
      _id: new ObjectId(taskId),
      userId: new ObjectId(userId),
    });
  },

  async createTask(userId: string, input: CreateTaskInput) {
    const db = await getDb();
    const taskDate = input.date ? new Date(input.date) : new Date();

    const result = await db.collection("tasks").insertOne({
      userId: new ObjectId(userId),
      title: input.title,
      content: input.content,
      date: taskDate,
      completed: false,
      createdAt: new Date(),
    });

    return {
      _id: result.insertedId,
      userId,
      title: input.title,
      content: input.content,
      date: taskDate,
      completed: false,
    };
  },

  async updateTask(taskId: string, userId: string, input: UpdateTaskInput) {
    const db = await getDb();
    const updateData: Record<string, any> = {
      title: input.title,
      content: input.content,
      updatedAt: new Date(),
    };

    if (input.date) {
      updateData.date = new Date(input.date);
    }

    const result = await db
      .collection("tasks")
      .updateOne(
        { _id: new ObjectId(taskId), userId: new ObjectId(userId) },
        { $set: updateData },
      );

    return result.matchedCount > 0;
  },

  async updateTaskStatus(taskId: string, userId: string, completed: boolean) {
    const db = await getDb();
    const result = await db
      .collection("tasks")
      .updateOne(
        { _id: new ObjectId(taskId), userId: new ObjectId(userId) },
        { $set: { completed, updatedAt: new Date() } },
      );

    return result.matchedCount > 0;
  },

  async deleteTask(taskId: string, userId: string) {
    const db = await getDb();
    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(taskId),
      userId: new ObjectId(userId),
    });

    return result.deletedCount > 0;
  },
};
