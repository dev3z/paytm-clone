// backend/routes/account.js
const express = require('express');
const auth = require("./middleware");
const router = express.Router();

router.get("/balance",auth, async (req, res) => {
  const account = await Account.findone({
    userId: req.userId
  });

  res.json({
    balance: account.balance
  });
})


router.post("/transfer", auth, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount , to} = req.body;

   const account = await Account.findOne({userId: req.userId}).session(session);

   if(!account || account.balance<amount){
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance"
    })
}

const toAccount = await Account.findOne({userId: to}).session(session);
if(!toAccount){
  await session.abortTransaction();
  return res.status(400).json({
    message: "No such user"
  })
}

await account.updateOne({$inc: {balance: -amount}}).session(session);
await toAccount.updateOne({$inc: {balance: amount}}).session(session);

await session.commitTransaction();
res.json({
  message: "Transfer successful"
})
})

module.exports = router;