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
      },
      authorize: async (credentials) => {
        if (!credentials) {
          console.error("No credentials provided");
          throw new Error("No credentials provided");
        }

        const client = await clientPromise;
        const db = client.db("budget-v2");
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          console.error("User not found with email:", credentials.email);
          throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          console.error("Invalid password for user:", credentials.email);
          throw new Error("Invalid email or password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sub = user.id;
        // console.log("JWT Callback - User:", user);
        // console.log("JWT Callback - Token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.token = token.sub as string;
      // console.log("Session Callback - Session:", session);
      // console.log("Session Callback - Token:", token);
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
