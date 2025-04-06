import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    token: string;
    currency?: string;
    isVerified: boolean;
    rememberMe?: boolean;
  }
  interface Session {
    token?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string;
      currency?: string;
      token?: string | null;
      isVerified: boolean;
    } & DefaultSession["user"];
  }

  interface JWT {
    name: string;
    email: string;
    image?: string;
    currency?: string;
    token?: string;
    isVerified?: boolean;
    id: string;
    token: string;
    sub: string;
    rememberMe?: boolean;
    iat?: number;
    exp?: number;
  }
}
