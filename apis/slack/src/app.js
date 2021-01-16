

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
  });
  