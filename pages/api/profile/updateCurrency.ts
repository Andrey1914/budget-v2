import { NextApiResponse } from "next";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { userService } from "@/services/userService";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { currency } = req.body;
  const email = req.body.email || req.user.email;

  if (!email || !currency) {
    return res.status(400).json({ error: "Email and currency are required" });
  }

  const updated = await userService.updateUserCurrency(email, currency);
  if (!updated) {
    return res.status(404).json({ error: "User not found or no changes made" });
  }

  return res.status(200).json({ message: "Currency updated successfully" });
});
