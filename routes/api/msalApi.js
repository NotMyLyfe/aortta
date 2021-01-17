require("dotenv").config();
const express = require("express");
const router = express.Router();
const msal = require("../../msal.js");
const axios = require('axios');

async function accessToken(req, res, next, accountId = null){

    if(accountId == null){
        if(req.session.homeAccountId == undefined){
            res.redirect("http://localhost:8080/msal");
        }
        else accountId = req.session.homeAccountId;
    }
    const account = await msal.tokenCache.getAccountByHomeId(accountId);
    
    const silentRequest = {
        account: account,
        scopes : ["user.read"]
    }

    return msal.cca.acquireTokenSilent(silentRequest).then((response) => {
        //console.log("\nSuccess:\n", response);
        return response;
    }).catch((error) => {
        next(error);
    });
}

router.get("/", async (req, res, next) => {
    let accountId = (req.query.homeAccountId == null) ? null : req.query.homeAccountId;
    const response = await accessToken(req, res, next, accountId);
    const options = {
        headers: {
            'Authorization' : 'Bearer ' + response.accessToken
        },
    };

    const resResponse = await axios.default.get("https://graph.microsoft.com/beta/me", options)
        .then(response => {return response.data})
        .catch(err => {next(err);});
    res.json(resResponse);
});

router.get("/getTeams", async (req, res, next) => {
    let accountId = (req.query.homeAccountId == null) ? null : req.query.homeAccountId;
    const response = await accessToken(req, res, next, accountId);
    const options = {
        headers: {
            'Authorization' : 'Bearer ' + response.accessToken
        }
    };
    const resResponse = await axios.default.get("https://graph.microsoft.com/beta/me/joinedTeams", options)
        .then(response => {return response.data})
        .catch(err => {next(err);});
    res.json(resResponse);
});

router.get("/getChannels", async (req, res, next) => {
    let accountId = (req.query.homeAccountId == null) ? null : req.query.homeAccountId;
    if(req.query.teamId == null){
        next(new Error("No Team Id"));
    }
    const response = await accessToken(req, res, next, accountId);
    const options = {
        headers: {
            'Authorization' : 'Bearer ' + response.accessToken
        }
    };
    const resResponse = await axios.default.get(`https://graph.microsoft.com/beta/teams/${req.query.teamId}/channels`, options)
        .then(response => {return response.data})
        .catch(err => {next(err);});
    res.json(resResponse);
});

router.get("/getMessages", async (req, res, next) => {
    let accountId = (req.query.homeAccountId == null) ? null : req.query.homeAccountId;
    if(req.query.teamId == null){
        next(new Error("No Team Id"));
    }
    if(req.query.channelId == null) next(new Error("No Channel Id"));
    const response = await accessToken(req, res, next, accountId);
    const options = {
        headers: {
            'Authorization' : 'Bearer ' + response.accessToken
        }
    };
    const resResponse = await axios.default.get(`https://graph.microsoft.com/beta/teams/${req.query.teamId}/channels/${req.query.channelId}/messages`, options)
        .then(response => {return response.data})
        .catch(err => {next(err);});
    res.json(resResponse);
});

router.get("/getReplies", async (req, res, next) => {
    let accountId = (req.query.homeAccountId == null) ? null : req.query.homeAccountId;
    if(req.query.teamId == null){
        next(new Error("No Team Id"));
    }
    if(req.query.channelId == null) next(new Error("No Channel Id"));
    if(req.query.messageId == null) next(new Error("No Message Id"));
    const response = await accessToken(req, res, next, accountId);
    const options = {
        headers: {
            'Authorization' : 'Bearer ' + response.accessToken
        }
    };
    const resResponse = await axios.default.get(`https://graph.microsoft.com/beta/teams/${req.query.teamId}/channels/${req.query.channelId}/messages/${req.query.messageId}/replies`, options)
        .then(response => {return response.data})
        .catch(err => {next(err);});
    res.json(resResponse);
});

router.post("/postMessages", async (req, res, next) => {
    let accountId = (req.query.homeAccountId == null) ? null : req.query.homeAccountId;
    if(req.query.teamId == null){
        next(new Error("No Team Id"));
    }
    if(req.query.channelId == null) next(new Error("No Channel Id"));
    const response = await accessToken(req, res, next, accountId);
    const options = {
        headers: {
            'Authorization' : 'Bearer ' + response.accessToken
        }
    };
    await axios.default.post(`https://graph.microsoft.com/beta/teams/${req.query.teamId}/channels/${req.query.channelId}/messages`, req.body, options)
        .then(response => {console.log(response.data)})
        .catch(err => {next(err);});
    res.sendStatus(200);
});

router.get("/refresh", accessToken);

module.exports = router;