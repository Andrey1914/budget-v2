import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

const secret = process.env.JWT_SECRET;

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = await getToken({ req, secret });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = new ObjectId(token);

  const { name, avatar, baseCurrency } = req.body;

  console.log("Received body:", req.body);

  if (!name || !avatar) {
    return res
      .status(400)
      .json({ error: "Missing required fields", data: { name, avatar } });
  }

  try {
    const client = await clientPromise;
    const db = client.db("budget-v2");

    const updateFields: any = {
      name,
      image: avatar,
    };

    if (baseCurrency) {
      updateFields.baseCurrency = baseCurrency;
    }

    const result = await db.collection("users").updateOne(
      { email: token.email },

      {
        $set: updateFields,
      }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ error: "User not found or no changes made" });
    }

    const reviewResult = await db
      .collection("reviews")
      .updateMany(
        { userId: new ObjectId(userId) },
        { $set: { username: name } }
      );

    if (reviewResult.modifiedCount === 0) {
      console.log("No reviews were updated.");
    }

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : String(error),
    });
  }
};

export default updateProfile;
