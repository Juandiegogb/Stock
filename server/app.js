import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/routes.js";
import { DBconnect } from "./db.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./src/.env" });

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(router);

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  DBconnect();
});
