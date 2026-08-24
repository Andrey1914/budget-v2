import { NextApiResponse } from "next";
import { getDb } from "@/lib/db";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { ObjectId } from "mongodb";

export default withAuth(async function updateProfile(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, avatar, baseCurrency } = req.body;

  if (!name || !avatar) {
    return res
      .status(400)
      .json({ error: "Missing required fields", data: { name, avatar } });
  }

  const db = await getDb();
  const userId = new ObjectId(req.user.userId);

  const updateFields: Record<string, any> = {
    name,
    image: avatar,
  };

  if (baseCurrency) {
    updateFields.baseCurrency = baseCurrency;
  }

  const result = await db
    .collection("users")
    .updateOne({ _id: userId }, { $set: updateFields });

  if (result.matchedCount === 0) {
    return res.status(404).json({ error: "User not found or no changes made" });
  }

  await db
    .collection("reviews")
    .updateMany({ userId }, { $set: { username: name } });

  return res.status(200).json({ message: "Profile updated successfully" });
});
