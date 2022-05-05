import { MongoClient } from "mongodb";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
try {
  await mongoClient.connect();
  db = mongoClient.db(process.env.DATABASE);
  console.log(chalk.bold.green(`Conexão com o banco de dados estabelecida`));
} catch (e) {
  console.log(chalk.bold.red(`Conexão com o banco de dados deu ruim`, e));
}

export default db;