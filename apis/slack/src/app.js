
/*
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

const slackSigningSecret = '18f45f9119fbf777c583d262ef64bead';
const slackToken = 'xoxb-1628208345143-1629093074551-YHuVLVbCushjNGhLVDMRIZly';

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackToken);

const port = 3000;



slackEvents.on('app_mention', (event) => {
    console.log(event);
  });
  
  slackEvents.on('error', console.error);
  
  slackEvents.start(port).then(() => {
    console.log(`Server started on port ${port}`)
  });*/


/*
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');

const token = 'xoxb-1628208345143-1629093074551-YHuVLVbCushjNGhLVDMRIZly';
const slackSigningSecret = '18f45f9119fbf777c583d262ef64bead';

const slackEvents = createEventAdapter(slackSigningSecret);
const port = 3000;



const web = new WebClient(token);


slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  // Listening on path '/slack/events' by default
  console.log(`server listening on port ${port}`);
});



/*
(async () => {
  // See: https://api.slack.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ 
    channel: "general", 
    text: 'Hello there' 
  });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();*/


const express = require('express')
const bodyParser = require('body-parser')
const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')

const port = 3000
const app = express()
const token = 'xoxb-1628208345143-1629093074551-YHuVLVbCushjNGhLVDMRIZly';
const web = new WebClient(token)

const slackEvents = createEventAdapter('18f45f9119fbf777c583d262ef64bead')

app.use('/slack/events', slackEvents.expressMiddleware())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



slackEvents.on('app_mention', async (event) => {
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

});


// Starts server
app.listen(port, function() {
  console.log('Bot is listening on port ' + port)
})

  