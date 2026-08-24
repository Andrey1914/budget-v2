import { NextApiResponse } from "next";
import { getDb } from "@/lib/db";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";

export default withAuth(async function getUser(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const email = (req.query.email as string) || req.user.email;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const db = await getDb();
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({
    name: user.name,
    image: user.image,
    createdAt: user.createdAt,
    baseCurrency: user.baseCurrency || "USD",
  });
});
