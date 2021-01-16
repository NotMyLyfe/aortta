const msal = require('@azure/msal-node');
const fs = require('fs');

const cachePath = "./data/example.cache.json";

const beforeCacheAccess = async(cacheContext) => {
    return new Promise(async(resolve, reject) => {
        if (fs.existsSync(cachePath)) {
            fs.readFile(cachePath, "utf-8", (err, data) => {
                if (err) {
                    reject();
                } else {
                    console.log(data);
                    cacheContext.tokenCache.deserialize(data);
                    resolve();
                }
            });
        } else {
            fs.writeFile(cachePath, cacheContext.tokenCache.serialize(), (err) => {
                if (err) {
                    reject();
                }
            });
        }
    });
};

const afterCacheAccess = async(cacheContext) => {
    if(cacheContext.cacheHasChanged) {
        await fs.writeFile(cachePath, cacheContext.tokenCache.serialize(), (err) => {
            if (err) {
                console.log(err);
            }
        });
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
                console.log(message);
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