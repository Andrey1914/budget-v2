import { NextApiRequest, NextApiResponse } from "next";

const apiRouter = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(404).json({ error: "Not found" });
};

export default apiRouter;
