require("dotenv").config();
const express = require("express");
const msal = require('@azure/msal-node');
const router = express.Router();
const http = require('http');
const pg = require('pg');

const config = {
    auth : {
        clientId: process.env.MSAL_CLIENT_ID,
        authority: "https://login.microsoftonline.com/common",
        clientSecret: process.env.MSAL_CLIENT_SECRET
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    },
    /*cache : {
        cachePlugin
    }*/
};

const beforeCacheAccess = async(cacheContext) => {
    return new Promise(async(resolve, reject) => {
        // Insert read from cache table
    });
};

const afterCacheAccess = async(cacheContext) => {
    if(cacheContext.cacheHasChanged) {
        // write to cache
    }
}

const cachePlugin = {
    beforeCacheAccess,
    afterCacheAccess
};


const cca = new msal.ConfidentialClientApplication(config);
const tokenCache = cca.getTokenCache();

router.get('/', (req, res, next) => {
    const authCodeUrlParameters = {
        scopes: ["user.read"],
        redirectUri: "http://localhost:8080/msal/redirect"
    };

    cca.getAuthCodeUrl(authCodeUrlParameters).then((response) => {res.redirect(response)}).catch((err) => console.log(JSON.stringify(err)));
});

router.get('/redirect', (req, res, next) => {
    const tokenRequest = {
        code: req.query.code,
        scopes: ["user.read"],
        redirectUri: "http://localhost:8080/msal/redirect"
    };

    cca.acquireTokenByCode(tokenRequest).then((response) => {
        console.log("\nResponse: \n:", response);
        //req.session.homeAccountId = response.account.homeAccountId;
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    })
});

router.get("/graphCall", async (req, res) => {
    const account = await msalTokenCache.getAccountByHomeId(req.session.homeAccountId);

    const silentRequest = {
        account: account,
        scopes : ["user.read"]
    }

    cca.acquireTokenSilent(silentRequest).then((response) => {
        console.log("\nSuccess:\n" + response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.status(500).send(error);
    })
});

module.exports = router;