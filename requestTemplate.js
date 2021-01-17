//template request
require("dotenv").config();
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
})

vonage.verify.request({
    number: 14161234567,
    brand: "Vonage"
  }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const verifyRequestId = result.request_id;
      console.log('request_id', verifyRequestId);
    }   
    console.log(result);
  });