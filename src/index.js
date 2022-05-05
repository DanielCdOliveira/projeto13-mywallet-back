import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import joi from "joi";
import { stripHtml } from "string-strip-html";
import db from "./db.js";
import signUp from "./controllers/signupController.js"
// INICIALIZATION
const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.post("/signup",signUp)


const port = process.env.PORT;
app.listen(port, () =>
  console.log(chalk.bold.green(`Servidor em pé na porta ${port}`))
);