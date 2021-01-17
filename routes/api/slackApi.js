require('dotenv').config();
const express = require('express');

const { WebClient } = require('@slack/web-api');
const SLACK_OAUTH_TOKEN = process.env.SLACK_TOKEN;
const web = new WebClient(SLACK_OAUTH_TOKEN);

const router = express.Router();

router.post('/userToken', async (req, res, next) => {

  var accessToken = req.body[0].access_token;

  console.log(accessToken);
  console.log(getUserInfo(accessToken));

  if(accessToken != undefined) {
      await sendMessageT(req.body[0].access_token, "general", "I have allowed Aortta to control me")
        .then(response => {console.log(accessToken)})
        .catch(err => {next(err);});
  }

  res.sendStatus(200);

})

router.post('/sendMessage', async (req, res, next) => {

  //{ user_token, channel, message } 

  var r = req.body;

  if(r.user_token != undefined && r.channel != undefined && r.message != undefined) {
    await sendMessageT(r.user_token, r.channel, r.message)
      .then(response => {
        console.log(r.user_token);
        console.log(r.channel);
        console.log(r.message);
      
      })
      .catch(err => {next(err);});

  }

  res.sendStatus(200);

})



async function getUserInfo(user_token) {

  try {
    
    const result = await web.users.profile.get({
      token: user_token
    });
  
    const nextResult = await web.users.lookupByEmail({
      email: result.profile.email
    });
    
    console.log(nextResult);

  }
  catch (error) {
    console.error(error);
  }

}

async function sendMessageT(token, channel, message) {

  web.chat.postMessage({
      token: token,
      channel: channel,
      text: message,
  })

}

module.exports = router;
