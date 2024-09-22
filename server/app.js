import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/routes.js";
import { DBconnect } from "./db.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

if (process.env.enviromment !== "production") {
  dotenv.config({ path: "./src/.env" });
}

const origin = process.env.allowedOrigin;

const app = express();
app.use(cors({ credentials: true, origin: origin }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  DBconnect();
});
