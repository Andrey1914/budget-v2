import { NextApiResponse } from "next";
import { withAuth, AuthenticatedNextApiRequest } from "@/lib/withAuth";
import { userService } from "@/services/userService";

export default withAuth(async function updateProfile(
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // const { name, avatar, baseCurrency } = req.body;
  const { name, avatar, currency } = req.body;
  // if (!name || !avatar) {
  //   return res
  //     .status(400)
  //     .json({ error: "Missing required fields", data: { name, avatar } });
  // }
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Name is required" });
  }

  const email = req.user.email;
  // const updated = await userService.updateProfile(req.user.userId, email, {
  //   name,
  //   avatar,
  //   // baseCurrency,
  //   currency,
  // });
  const updated = await userService.updateProfile(req.user.userId, email, {
    name: name.trim(),
    avatar: avatar !== undefined ? avatar : "",
    currency,
  });

  if (!updated) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.status(200).json({ message: "Profile updated successfully" });
});
