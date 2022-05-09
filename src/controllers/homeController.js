import db from "../db.js";

export default async function getTransactions(req, res) {
  const session = res.locals.session;
  const user = await db.collection("users").findOne({
    _id: session.userId,
  });
  if (user) {
    let balance = 0;
    let transactions = await db
      .collection("transactions")
      .find({ userId: user._id })
      .toArray();
    await transactions.map((e) => {
      let value = parseFloat(e.value);
      if (e.type) balance += value;
      else balance -= value;
      delete e.userId;
    });
    balance = round(balance);
    res.send({ transactions, balance });
  } else {
    res.sendStatus(404);
  }
}

function round(n) {
  return (Math.round(n * 100) / 100).toFixed(2);
}
