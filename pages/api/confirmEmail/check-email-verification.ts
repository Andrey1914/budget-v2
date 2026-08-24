import type { NextApiRequest, NextApiResponse } from "next";
import { getDb } from "@/lib/db";

export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { verificationCode } = req.body;
    console.log("Received verification code:", verificationCode);

    if (!verificationCode) {
      return res.status(400).json({ error: "Verification code is required" });
    }

    const db = await getDb();

    const user = await db
      .collection("users")
      .findOne({ verificationCode: verificationCode });
    console.log("Found user:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isVerified) {
      return res
        .status(200)
        .json({ message: "Email is already verified", isVerified: true });
    }

    await db
      .collection("users")
      .updateOne(
        { verificationCode: verificationCode },
        { $set: { isVerified: true }, $unset: { verificationCode: "" } },
      );

    return res.status(200).json({
      message: "Email verified successfully!",
      email: user.email,
      isVerified: true,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
