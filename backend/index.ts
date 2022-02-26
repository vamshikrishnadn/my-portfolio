import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import { MONGODB_URL } from "./config/config";

const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.json({
    limit: "4mb",
  })
);

app.use(bodyParser.urlencoded({ limit: "4mb", extended: true }));
mongoose.connect(MONGODB_URL);

const port: number = 5000;

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});
