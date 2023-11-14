import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import * as submissionController from "./controllers/submissionController";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/submission/validate", submissionController.validate);

app.use("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
