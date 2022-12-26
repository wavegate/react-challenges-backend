import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config({ path: path.resolve(__dirname, "../.env") });
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  throw Error("MONGODB_URI not defined in environmental variables.");
}

import cors from "cors";
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://unique-mochi-478698.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

import ChallengeRouter from "./routers/ChallengeRouter";
app.use("/challenges", ChallengeRouter);

app.all("*", (req: Request, res: Response) => {
  return res.json({ message: "Catch-all" });
});

export default app;
