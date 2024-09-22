import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/routes.js";
import { DBconnect } from "./db.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import companyDB from "./src/models/companyModel.js";

if (process.env.enviromment !== "production") {
  dotenv.config({ path: "./src/.env" });
} else {
  console.log("We are in production");
}


const app = express();
app.use(cors({ credentials: true, origin: "*" }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(router);

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
  DBconnect();
});
