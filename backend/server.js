import express from "express";
import cors from "cors";
import routes from "./Routes/index.js";
import mongoose from "./db/db.js";
import multer from "multer";

import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port 5000`);
});
