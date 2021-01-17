const msal = require('@azure/msal-node');
const fs = require('fs');
const {retrieveCache, writeToCache} = require("./cacheDb.js");

const beforeCacheAccess = async(cacheContext) => {
    return new Promise(async(resolve, reject) => {
        retrieveCache()
            .then(response => {
                cacheContext.tokenCache.deserialize(JSON.stringify(response));
                resolve();
            })
            .catch(err => reject(err));
    });
};

const afterCacheAccess = async(cacheContext) => {
    //console.log(cacheContext.tokenCache.serialize());
    if(cacheContext.cacheHasChanged) {
        await writeToCache(JSON.parse(cacheContext.tokenCache.serialize())).then(response => {}).catch(err => console.log(err));
    }
}

const cachePlugin = {
    beforeCacheAccess,
    afterCacheAccess
};

const config = {
    auth : {
        clientId: process.env.MSAL_CLIENT_ID,
        authority: "https://login.microsoftonline.com/common",
        clientSecret: process.env.MSAL_CLIENT_SECRET
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                //console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    },
    cache : {
        cachePlugin
    }
};

const cca = new msal.ConfidentialClientApplication(config);
const tokenCache = cca.getTokenCache();

exports.cca = cca, exports.tokenCache = tokenCache;