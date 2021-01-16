//template request
require("dotenv").config();
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "b0b8d41d",
  apiSecret: "5aRYUP19waVBuw3B"
})

vonage.verify.request({
    number: 12267573475,
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