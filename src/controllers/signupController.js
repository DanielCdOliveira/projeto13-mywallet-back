import db from "../db.js";
import bcrypt from "bcrypt";
import joi from "joi";

const userSchema = joi.object({
  name: joi.string().min(1).required(),
  email: joi.string().min(1).required(),
  password: joi.string().min(1).required(),
  repPassword: joi.string().min(1).required(),
});

export default async function signUp(req, res) {
  const user = req.body;
//   verificar se senhas sao iguais
  const { error } = userSchema.validate(user, { abortEarly: false });
  if (error) {
    res.status(422).send(error.details.map((detail) => detail.message));
  }
  try {
    const doesExist = await db.collection("users").findOne({ email: user.email });
    if (doesExist) return res.sendStatus(409);
    delete user.repPassword
    user.password = bcrypt.hashSync(user.password, 10);
    await db.collection("users").insertOne(user)
    res.sendStatus(201)
  } catch (error) {
      res.sendStatus(500)
  }
}
