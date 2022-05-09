import db from "../db.js";
import dayjs from "dayjs";
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
  const data = req.body;
  const token = authorization?.replace("Bearer ", "");
  console.log(token);
  console.log(data);
}

function round(n) {
  return (Math.round(n * 100) / 100).toFixed(2);
}
