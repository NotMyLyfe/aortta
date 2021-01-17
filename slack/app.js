
require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const { WebClient } = require('@slack/web-api');

const SLACK_OAUTH_TOKEN = 'xoxb-1628208345143-1641047531589-QhmWl3Lud5UlHTbIeRsS25lP';


const rtm = new RTMClient(SLACK_OAUTH_TOKEN);
const web = new WebClient(SLACK_OAUTH_TOKEN);



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




