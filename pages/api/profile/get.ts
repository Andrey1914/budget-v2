import { NextApiResponse } from "next";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { userService } from "@/services/userService";

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

  const user = await userService.getUserByEmail(email);
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
