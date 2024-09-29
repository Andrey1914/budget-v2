import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/db";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        verificationCode: { label: "Verification Code", type: "text" },
      },
      authorize: async (credentials) => {
        console.log("Credentials received:", credentials);

        if (!credentials) {
          throw new Error("No credentials provided");
        }

        const client = await clientPromise;
        const db = client.db("budget-v2");

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        console.log("User found:", user);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        //--------------Added--------------------
        //---------------------------------------
        if (!user.isVerified) {
          throw new Error("Email not verified. Please verify your email.");
        }

        if (!user.isVerified) {
          if (credentials.verificationCode !== user.token) {
            throw new Error(
              "Invalid verification code. Please check your email."
            );
          }
          await db
            .collection("users")
            .updateOne(
              { email: user.email },
              { $set: { isVerified: true }, $unset: { token: "" } }
            );
          user.isVerified = true;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        //-------------added-----------------

        //-----------------------------------

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          token: user.token,
          isVerified: user.isVerified,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 20 * 60, // 20 минут
  },
  jwt: {
    maxAge: 20 * 60, // 20 минут
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.token = token.token as string;
        session.user.isVerified = token.isVerified as boolean;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
