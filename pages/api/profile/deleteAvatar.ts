import { NextApiResponse } from "next";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { userService } from "@/services/userService";

export default withAuth(async function handler(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const email = req.user.email;
  if (!email) {
    return res.status(400).json({ error: "Invalid token: email missing" });
  }

  const deleted = await userService.deleteUserAvatar(email);
  if (!deleted) {
    return res.status(404).json({ error: "User not found or no changes made" });
  }

  return res.status(200).json({ message: "Avatar deleted successfully" });
});
