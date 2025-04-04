import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getTokenFromRequest } from "@/utils/getTokenFromRequest";
import { ObjectId } from "mongodb";

const handleCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!["POST", "GET", "PUT", "DELETE"].includes(req.method!)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { type } = req.query;
    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Invalid category type" });
    }

    const collectionName = `${type}-categories`;
    const userId = new ObjectId(token.sub);
    const client = await clientPromise;
    const db = client.db("budget-v2");

    if (req.method === "POST") {
      const { name, description } = req.body;

      if (!name) return res.status(400).json({ error: "Name is required" });
      const result = await db.collection(collectionName).insertOne({
        userId,
        name,
        description,
        createdAt: new Date(),
      });
      return res
        .status(201)
        .json({ category: { _id: result.insertedId, name, description } });
    }

    if (req.method === "GET") {
      const categories = await db
        .collection(collectionName)
        .find({ userId })
        .toArray();
      return res.status(200).json(categories);
    }

    if (req.method === "PUT") {
      const { id, name, description } = req.body;
      if (!id || !name) return res.status(400).json({ error: "Invalid input" });
      const result = await db
        .collection(collectionName)
        .updateOne(
          { _id: new ObjectId(id), userId },
          { $set: { name, description } }
        );
      if (result.matchedCount === 0)
        return res.status(404).json({ error: "Category not found" });
      return res.status(200).json({ message: "Category updated successfully" });
    }

    if (req.method === "DELETE") {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "ID is required" });
      const result = await db
        .collection(collectionName)
        .deleteOne({ _id: new ObjectId(id), userId });
      if (result.deletedCount === 0)
        return res.status(404).json({ error: "Category not found" });
      return res.status(200).json({ message: "Category deleted successfully" });
    }
  } catch (error: any) {
    console.error("Category handling error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handleCategories;
