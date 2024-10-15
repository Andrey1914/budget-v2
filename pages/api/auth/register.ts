import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import clientPromise from "@/lib/db";
import sendConfirmationEmail from "@/pages/api/confirmEmail/sendConfirmationEmail";

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    const client = await clientPromise;
    const db = client.db("budget-v2");

    try {
      const existingUser = await db.collection("users").findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = generateVerificationCode();

      const result = await db.collection("users").insertOne({
        name,
        email,
        password: hashedPassword,
        verificationCode,
        isVerified: false,
        createdAt: new Date(),
      });

      console.log("User created:", result);

      await sendConfirmationEmail(email, verificationCode);

      res.status(201).json({
        message:
          "User created successfully. Please check your email for the verification code.",
        success: true,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "User creation failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default register;

// ---------------рабочий код---------------
// import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid"; // Импортируем UUID для генерации токена
// import clientPromise from "@/lib/db";
// import sendConfirmationEmail from "@/pages/api/confirmEmail/sendConfirmationEmail";

// const register = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     const { name, email, password } = req.body;

//     const client = await clientPromise;
//     const db = client.db("budget-v2");

//     try {
//       // Проверяем, существует ли пользователь с таким email
//       const existingUser = await db.collection("users").findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: "Email already in use" });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);
//       const token = uuidv4(); // Генерируем уникальный токен для подтверждения

//       const result = await db.collection("users").insertOne({
//         name,
//         email,
//         password: hashedPassword,
//         token,
//         isVerified: false,
//       });

//       console.log("User created:", result);

//       await sendConfirmationEmail(email, token);

//       res.status(201).json({
//         message:
//           "User created successfully. Please check your email to confirm.",
//         success: true,
//       });
//     } catch (error) {
//       console.error("Error creating user:", error);
//       res.status(500).json({ error: "User creation failed" });
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// };

// export default register;
