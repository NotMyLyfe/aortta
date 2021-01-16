require("dotenv").config();
const express = require("express");
const router = express.Router();
const msal = require("../../msal.js");
const https = require('https');

async function accessToken(req, res, next){
    if(req.session.homeAccountId == undefined){
        res.redirect("http://localhost:8080/msal");
    }

    const account = await msal.tokenCache.getAccountByHomeId(req.session.homeAccountId);

    const silentRequest = {
        account: account,
        scopes : ["user.read"]
    }

    msal.cca.acquireTokenSilent(silentRequest).then((response) => {
        console.log("\nSuccess:\n", response);
        return new Promise.resolve(response);
    }).catch((error) => {
        console.log(error);
        next(error);
    })
}

router.get("/", async (req, res, next) => {
    const options = {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + response.accessToken
        }
    }
    const restReq = https.request(new URL("https://graph.microsoft.com/v1.0/me"), options, (resp) => {
        resp.setEncoding('utf8');
        resp.on('data', (chunk) => {
            console.log(chunk);
        });
    });
    restReq.on('error', (err) => {
        next(err);
    });
    restReq.end();
    res.sendStatus(200);
});

router.get("/refresh", accessToken);

module.exports = router;