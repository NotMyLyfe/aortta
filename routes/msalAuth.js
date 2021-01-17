require("dotenv").config();
const express = require("express");
const router = express.Router();
const msal = require("../msal.js")

const scope = ["user.read", "Team.ReadBasic.All", "Group.Read.All", "ChannelMessage.Delete", "ChannelMessage.Edit", "ChannelMessage.Read.All", "ChannelMessage.Send", "TeamsActivity.Read"];
const redirectUri = "http://localhost:8080/msal/redirect";

router.get('/', (req, res, next) => {
    const authCodeUrlParameters = {
        scopes: scope,
        redirectUri: redirectUri
    };

    msal.cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {res.redirect(response)}).catch((err) => console.log(JSON.stringify(err)));
});

router.get('/redirect', (req, res, next) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: scope,
        redirectUri: redirectUri
    };

    msal.cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        req.session.homeAccountId = response.account.homeAccountId;
        res.redirect("http://localhost:8080");
    }).catch((err) => {
        console.log(err);
        next(err);
    })
});

module.exports = router;