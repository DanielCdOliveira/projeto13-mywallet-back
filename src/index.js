import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import joi from "joi";
import { stripHtml } from "string-strip-html";
import db from "./db.js";
// CONTROLLERS
import signUp from "./controllers/signupController.js"
import logIn from "./controllers/loginController.js";
import postTransaction from "./controllers/transactionController.js";
// INICIALIZATION
const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.post("/", logIn)

app.post("/signup",signUp)

app.get("/home")

app.post("/transaction", postTransaction)


const port = process.env.PORT;
app.listen(port, () =>
  console.log(chalk.bold.green(`Servidor em pé na porta ${port}`))
);