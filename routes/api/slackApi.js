require('dotenv').config();
const express = require('express');

const router = express.Router();

router.post('/userToken', async (req, res, next) => {

  //await function(req.body.item, req.body.item2).then()

  console.log(req.body);

  next(new Error("bitch things are messed up"));
})




module.exports = router;