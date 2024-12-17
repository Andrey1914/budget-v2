import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const getExpenses = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = new ObjectId(token);

  const client = await clientPromise;
  const db = client.db("budget-v2");

  const startDate = new Date(
    Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0)
  );
  const endDate = new Date(
    Date.UTC(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)
  );

  // console.log("Start Date:", startDate.toISOString());
  // console.log("End Date:", endDate.toISOString());

  try {
    const expenses = await db
      .collection("expense")
      .find({
        userId: new ObjectId(userId),
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .toArray();

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

export default getExpenses;
