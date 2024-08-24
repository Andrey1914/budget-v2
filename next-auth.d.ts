import NextAuth, { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       accessToken: string;
//     } & DefaultSession["user"];
//   }
// }

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    token?: string; // Добавляем token к типу Session
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }

  interface JWT {
    id: string;
    sub: string;
  }
}
