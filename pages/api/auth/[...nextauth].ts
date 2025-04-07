import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/db";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        verificationCode: { label: "Verification Code", type: "text" },
        rememberMe: { label: "Remember Me", type: "text" },
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
          rememberMe: credentials.rememberMe === "true",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 5 * 60,
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          const client = await clientPromise;
          const db = client.db("budget-v2");

          const existingUser = await db
            .collection("users")
            .findOne({ email: user.email });

          if (!existingUser) {
            const newUser = {
              name: user.name,
              email: user.email,
              image: user.image,
              isVerified: true,
              createdAt: new Date(),
              currency: user.currency,
            };
            const inserted = await db.collection("users").insertOne(newUser);
            token.id = inserted.insertedId.toString();
            token.sub = inserted.insertedId.toString();
            token.currency = user.currency;
            token.isVerified = true;
          } else {
            token.id = existingUser._id.toString();
            token.sub = existingUser._id.toString();
            token.currency = existingUser.currency || user.currency;
            token.isVerified = existingUser.isVerified ?? true;
          }

          // Google doesn't support rememberMe, default to 7 days
          const now = Math.floor(Date.now() / 1000);
          token.iat = now;
          token.exp = now + 7 * 24 * 60 * 60;
        } else {
          // Credentials provider
          token.id = user.id;
          token.sub = user.id;
          token.currency = user.currency;
          token.isVerified = user.isVerified;

          token.rememberMe = user.rememberMe;
          const now = Math.floor(Date.now() / 1000);
          token.iat = now;
          token.exp = now + (user.rememberMe ? 7 * 24 * 60 * 60 : 20 * 60);
        }

        token.name = user.name;
        token.image = user.image;
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
      session.expires = new Date((token.exp as number) * 1000).toISOString();

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
