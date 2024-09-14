import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const getTotalIncome = async (req: NextApiRequest, res: NextApiResponse) => {
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

    if (!userId) {
      console.error("No user ID found in token");
      return res
        .status(401)
        .json({ error: "Unauthorized - No user ID in token" });
    }

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
      .collection("income")
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
    console.log("Total income - DB:", total);
    const totalIncome = total.length > 0 ? total[0].total : 0;
    console.log("Calculation income:", totalIncome);

    res.status(200).json({ total: totalIncome });
  } catch (error: any) {
    console.error("Failed to calculate total income:", error.message);
    console.error("Detailed Error:", JSON.stringify(error, null, 2));
    res.status(500).json({ error: "Failed to calculate total income" });
  }
};

export default getTotalIncome;
