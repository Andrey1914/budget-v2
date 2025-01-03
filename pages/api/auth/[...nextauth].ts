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

        // if (user.currency) {
        //   console.log("Currency found:", user.currency);
        // } else {
        //   console.log("Currency not found for user");
        // }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          currency: user.currency,
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
        token.name = user.name;
        token.image = user.image;
        token.currency = user.currency;
        token.token = user.token;
        token.isVerified = user.isVerified;
      } else {
        const client = await clientPromise;
        const db = client.db("budget-v2");

        const dbUser = await db
          .collection("users")
          .findOne({ email: token.email });

        if (dbUser) {
          token.name = dbUser.name;
          token.image = dbUser.image;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.currency = token.currency as string;

        session.user.token = token.token as string;
        session.user.isVerified = token.isVerified as boolean;
      }
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
