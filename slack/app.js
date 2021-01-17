
require('dotenv').config();

//const { createServer } = require('http');
//const { InstallProvider } = require('@slack/oauth');
const { RTMClient } = require('@slack/rtm-api');
const { WebClient } = require('@slack/web-api');

const SLACK_OAUTH_TOKEN = 'xoxb-1628208345143-1641047531589-QhmWl3Lud5UlHTbIeRsS25lP';
//const CLIENT_ID = "1628208345143.1667973409392";
//const CLIENT_SECRET = "10073a38ef2f45f8d52b24da0f306a75";

//onst USER_TOKEN = "xoxp-1628208345143-1649438806708-1656764936657-9016c28cdb0529c152b601e1bfbea6c1"

const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);


/*
// initialize the installProvider
const installer = new InstallProvider({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  stateSecret: 'my-state-secret',
  authVersion: 'v1' //required for classic Slack apps
});

installer.generateInstallUrl({
    // Add the scopes your app needs
    scopes: ['channels:read'],
    redirectUri: '/slack/oauth_redirect'
})



const server = createServer((req, res) =>  {
  // our redirect_uri is /slack/oauth_redirect
  if (req.url === '/slack/oauth_redirect') {
    // call installer.handleCallback to wrap up the install flow
    installer.handleCallback(req, res);
  }
})

server.listen(3000);*/



rtm.start()
  .catch(console.error);

rtm.on('ready', async () => {
    console.log('bot started')

    //sendMessage("general", "HELLO");
    //sendMessageT(USER_TOKEN, "general", "This message was sent by a bot");

});

rtm.on('slack_event', async (eventType, event) => {
    
    if (event && event.type === 'message'){
        
        var user = await getUserName(event.user);
        var channel = await getChannelName(event.channel);

        if(user != undefined && channel != undefined) {
            sendMessage("bot-msgs", user + ' says "' + event.text + '" in #' + channel);


        }
        
    }

})



async function getUserName(userId) {

    try {
        const result = await web.users.info({
            user: userId
        });

        return result.user.profile.real_name;
    }
    catch (error) {
        console.error(error);
    }

}

async function getChannelName(channeId) {

    try {
        const result = await web.conversations.info({
            channel: channeId
        });

        return result.channel.name;
    }
    catch (error) {
        console.error(error);
    }

}

async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}

async function sendMessageT(token, channel, message) {
    await web.chat.postMessage({
        token: token,
        channel: channel,
        text: message,
    })
}


