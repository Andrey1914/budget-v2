import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const getTotalExpense = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getToken({ req, secret });
    console.log("Full token content:", JSON.stringify(token, null, 2));

    if (!token) {
      console.error("No token found");

      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    const userId = new ObjectId(token.sub);

    console.log("Token user ID (sub):", userId);

    console.log("User ID for total expense calculation:", userId);

    const client = await clientPromise;
    const db = client.db("budget-v2");

    const startDate = new Date(
      Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0)
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

    console.log("Start Date:", startDate.toISOString());
    console.log("End Date:", endDate.toISOString());

    const total = await db
      .collection("expense")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(userId),

            date: {
              $gte: startDate,
              $lte: endDate,
            },
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
    console.log("Total expense - DB:", total);

    const totalExpense = total.length > 0 ? total[0].total : 0;
    console.log("Calculation expense:", totalExpense);

    res.status(200).json({ total: totalExpense });
  } catch (error: any) {
    console.error("Failed to calculate total expense:", error.message);
    console.error("Detailed Error:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Failed to calculate total expense" });
  }
};

export default getTotalExpense;
