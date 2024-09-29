import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    token: string;
    isVerified: boolean;
  }
  interface Session {
    token?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string;
      token?: string | null;
      isVerified: boolean;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    token: string;
    sub: string;
  }
}
