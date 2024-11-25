const NEXTAUTH_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXTAUTH_URL
    : "http://localhost:3000";

export { NEXTAUTH_URL };
