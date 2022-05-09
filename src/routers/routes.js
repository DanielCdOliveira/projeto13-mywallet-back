import { Router } from "express";
import signUp from "../controllers/signupController.js";
import logIn from "../controllers/loginController.js";
import {
  postTransaction,
  deleteTransaction,
  editTransaction,
} from "../controllers/transactionController.js";
import getTransactions from "../controllers/homeController.js";
import validRegister from "../middlewares/registerValid.js";
import validSession from "../middlewares/validSession.js";
const router = Router();

router.post("/", logIn);

router.post("/signup", validRegister, signUp);

router.get("/home", validSession, getTransactions);

router.post("/transaction", validSession, postTransaction);

router.delete("/transaction", validSession, deleteTransaction);

router.put("/transaction/:id", validSession, editTransaction);

export default router;
