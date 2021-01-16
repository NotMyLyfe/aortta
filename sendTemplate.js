//template send

const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "b0b8d41d",
  apiSecret: "5aRYUP19waVBuw3B"
})

const from = 12504487460
const to = 12267573475
const text = 'A text message sent using the Vonage SMS API'

vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})