import db from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export default async function logIn(req, res) {
  const { password, email } = req.body;
  try {
    const user = await db.collection("users").findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
    //   att a session
      await db.collection("sessions").insertOne({
        userId: user._id,
        token,
      });
      res.send({token, name:user.name})
    } else {
      res.sendStatus(404);
    }
  } catch {
    res.sendStatus(500);
  }
}
