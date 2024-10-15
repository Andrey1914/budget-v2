import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/db";

export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse
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

    const client = await clientPromise;
    const db = client.db("budget-v2");

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
        { $set: { isVerified: true }, $unset: { verificationCode: "" } }
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

//----------------this code is work-----------------
// import type { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "@/lib/db";
// // import { v4 as uuidv4 } from "uuid";
// // import bcrypt from "bcrypt";

// export default async function verifyEmail(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { verificationCode } = req.body;
//     console.log(verificationCode);

//     if (!verificationCode) {
//       return res
//         .status(400)
//         .json({ error: "Email and verification code are required" });
//     }

//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     const user = await db
//       .collection("users")
//       .findOne({ verificationCode: verificationCode });
//     console.log(user);

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     //-------------added--------------

//     //--------------------------------

//     if (user.isVerified) {
//       return res
//         .status(200)
//         .json({ message: "Email is already verified", isVerified: true });
//     }

//     if (user.verificationCode === verificationCode) {
//       await db
//         .collection("users")
//         .updateOne(
//           { verificationCode: verificationCode },
//           { $set: { isVerified: true }, $unset: { verificationCode: "" } }
//         );
//       return res.status(200).json({
//         message: "Email verified successfully",
//         email: user.email,
//         password: user.password,
//         // tempPassword, // Временный пароль
//         isVerified: true,
//       });
//     } else {
//       return res
//         .status(400)
//         .json({ error: "Invalid verification code", isVerified: false });
//     }
//   } catch (error) {
//     console.error("Error verifying email:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// }
