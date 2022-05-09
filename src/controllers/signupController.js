import db from "../db.js";
import bcrypt from "bcrypt";

export default async function signUp(req, res) {
  const user = req.body;
  try {
    const doesExist = await db
      .collection("users")
      .findOne({ email: user.email });
    if (doesExist) return res.sendStatus(409);
    delete user.repPassword;
    user.password = bcrypt.hashSync(user.password, 10);
    await db.collection("users").insertOne(user);
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
}
