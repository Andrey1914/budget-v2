import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

const IncomeCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db("budget-v2");

  if (req.method === "POST") {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    try {
      const result = await db.collection("income-categories").insertOne({
        name,
        description,
      });

      // Возвращаем только что созданный документ
      res.status(201).json({
        category: {
          _id: result.insertedId,
          name,
          description,
        },
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const categories = await db
      .collection("income-categories")
      .find({})
      .toArray();
    res.status(200).json(categories);
  } else if (req.method === "PUT") {
    const { id, name, description } = req.body;
    if (!id || !name) {
      return res.status(400).json({ error: "Invalid input" });
    }

    try {
      const result = await db
        .collection("income-categories")
        .updateOne({ _id: new ObjectId(id) }, { $set: { name, description } });

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      const result = await db
        .collection("income-categories")
        .deleteOne({ _id: new ObjectId(id) });
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default IncomeCategories;
