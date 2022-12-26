import { Request, Response, NextFunction } from "express";

export default function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (token) {
    return next();
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
}
