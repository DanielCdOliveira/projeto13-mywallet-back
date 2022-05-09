import express, { json } from "express";
import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
// ROUTES
import router from "./routers/routes.js";
// INICIALIZATION
const app = express();
app.use(cors());
app.use(json());
dotenv.config();
app.use(router);

const port = process.env.PORT;
app.listen(port, () =>
  console.log(chalk.bold.green(`Servidor em pé na porta ${port}`))
);
