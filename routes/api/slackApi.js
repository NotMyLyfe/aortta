require('dotenv').config();
const express = require('express');
const {createEventAdapter} = require('@slack/events-api');
const {WebClient} = require('@slack/web-api');

const router = express.Router();

//const web = new WebClient(process.env.SLACK_TOKEN);
const slackEvents = createEventAdapter(process.env.SLACK_EVENTS);

router.use('/', slackEvents.expressMiddleware());

/*slackEvents.on('app_mention', async (event) => {
    try {
      console.log(event);
  
    } catch (e) {
      console.log(JSON.stringify(e))
    }
  })
  
slackEvents.on('message', async (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  
    const res = await web.chat.postMessage({ 
      channel: "general", 
      text: 'Hello there' 
    });
  
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  
});*/
  

module.exports = router;