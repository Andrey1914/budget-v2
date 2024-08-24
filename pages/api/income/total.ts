import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { startOfMonth, endOfMonth } from "date-fns";
import { ObjectId } from "mongodb";

const getTotalIncome = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const token = await getToken({ req, raw: true });

    if (!token) {
      console.error("No token found");
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    const userId = new ObjectId(token.sub);

    if (!userId) {
      console.error("No user ID found in token");
      return res
        .status(401)
        .json({ error: "Unauthorized - No user ID in token" });
    }

    const client = await clientPromise;
    const db = client.db("budget-v2");

    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());

    const totalIncome = await db
      .collection("income")
      .aggregate([
        {
          $match: {
            userId: userId,
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

    console.log("Total Income Result:", totalIncome);

    if (totalIncome.length === 0) {
      console.warn("No incomes found for the user in the given date range");
      return res.status(200).json({ total: 0 });
    }
    res.status(200).json({ total: totalIncome[0]?.total || 0 });
  } catch (error: any) {
    console.error("Failed to calculate total expense:", error.message);
    console.error("Detailed Error:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Failed to calculate total income" });
  }
};

export default getTotalIncome;
