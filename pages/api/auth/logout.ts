import { NextApiRequest, NextApiResponse } from "next";
import { getSession, signOut } from "next-auth/react";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    await signOut({ callbackUrl: "/" });
    res.status(200).json({ message: "Successfully logged out" });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
};

export default logout;
