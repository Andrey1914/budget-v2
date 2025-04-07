import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getTokenFromRequest } from "@/utils/getTokenFromRequest";
import { ObjectId } from "mongodb";

const getTotalAmount = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getTokenFromRequest(req);
    if (!token) {
      console.error("No token found");
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    const { type } = req.query;
    if (type !== "income" && type !== "expense") {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    const userId = new ObjectId(token.sub);
    const client = await clientPromise;
    const db = client.db("budget-v2");

    const startDate = new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1)
    );
    const endDate = new Date(
      Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
        23,
        59,
        59
      )
    );

    const total = await db
      .collection(type)
      .aggregate([
        {
          $match: {
            userId,
            date: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ])
      .toArray();

    const totalAmount = total.length > 0 ? total[0].total : 0;
    res.status(200).json({ total: totalAmount });
  } catch (error: any) {
    console.error(
      `Failed to calculate total ${req.query.type}:`,
      error.message
    );
    res
      .status(500)
      .json({ error: `Failed to calculate total ${req.query.type}` });
  }
};

export default getTotalAmount;
