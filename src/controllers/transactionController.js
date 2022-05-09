import db from "../db.js";
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
export async function postTransaction(req, res) {
  //criar middleware
  const { authorization } = req.headers;
  const data = req.body;
  const token = authorization?.replace("Bearer ", "");
  console.log(token);
  console.log(data);

  if (!token) return res.sendStatus(401);
  const session = await db.collection("sessions").findOne({ token });
  if (!session) return res.sendStatus(401);
  const user = await db.collection("users").findOne({
    _id: session.userId,
  });
  console.log(user);
  if (user) {
    data.date = dayjs().format("DD/MM");
    data.userId = user._id;
    data.value = round(parseFloat(data.value));
    console.log(data.value);
    console.log(data);
    db.collection("transactions").insertOne(data);
    res.sendStatus(201);
  } else {
    res.sendStatus(404);
  }

  // colocar try e catch
}

export async function deleteTransaction(req, res) {
  const { authorization } = req.headers;
  const { idTransaction } = req.body;
  const token = authorization?.replace("Bearer ", "");
  console.log(token);
  console.log(idTransaction);

  if (!token) return res.sendStatus(401);
  const session = await db.collection("sessions").findOne({ token });
  if (!session) return res.sendStatus(401);
  const user = await db.collection("users").findOne({
    _id: session.userId,
  });
  console.log(user);
  if (user) {
    db.collection("transactions").deleteOne({ _id: ObjectId(idTransaction) });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
}

export async function editTransaction(req, res) {
  console.log("entrou");
  const transaction = req.body.data;
  const { authorization } = req.headers;
  const idTransaction = req.params.id;
  const token = authorization?.replace("Bearer ", "");
  console.log(token);
  console.log(idTransaction);
  console.log(transaction);
  if (!token) return res.sendStatus(401);
  const session = await db.collection("sessions").findOne({ token });
  if (!session) return res.sendStatus(401);
  const user = await db.collection("users").findOne({
    _id: session.userId,
  });
  console.log(user);
  if (user) {
    db.collection("transactions").updateOne(
      { _id: ObjectId(idTransaction) },
      {
        $set: {
          value: transaction.value,
          description: transaction.description,
        },
      }
    );
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
}

function round(n) {
  return (Math.round(n * 100) / 100).toFixed(2);
}
