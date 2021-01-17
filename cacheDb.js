require("dotenv").config();
const pg = require('pg');

let config = {
    user: process.env.COCKROACH_USER,
    password: process.env.COCKROACH_PASSWORD,
    host: process.env.COCKROACH_HOST,
    database: process.env.COCKROACH_DATABASE,
    port: process.env.COCKROACH_PORT,
    ssl: {
        ca: process.env.COCKROACH_CA
    }
};
var pool = new pg.Pool(config);

async function retrieveCache(){
    let cacheObj = {
        "Account" : {

        },
        "IdToken" : {

        },
        "AccessToken":{

        },
        "RefreshToken":{

        },
        "AppMetadata":{

        }
    };
    let client = await pool.connect();
    try{
        await client.query('BEGIN');
        const accountQuery = await client.query(`SELECT * FROM account_msal_cache`);
        const idTokenQuery = await client.query(`SELECT * FROM id_token_msal_cache`);
        const accessTokenQuery = await client.query(`SELECT * FROM access_token_msal_cache`);
        const refresh_token_query = await client.query(`SELECT * FROM refresh_token_msal_cache`);
        const app_metadata_query = await client.query(`SELECT * FROM app_metadata_cache`);
        await client.query('COMMIT');
        client.release();
        accountQuery.rows.forEach(element => {
            cacheObj.Account[element.key] = element.jsondata;
        });
        idTokenQuery.rows.forEach(element => {
            cacheObj.IdToken[element.key] = element.jsondata;
        });
        accessTokenQuery.rows.forEach(element => {
            cacheObj.AccessToken[element.key] = element.jsondata;
        });
        refresh_token_query.rows.forEach(element => {
            cacheObj.RefreshToken[element.key] = element.jsondata;
        });
        app_metadata_query.rows.forEach(element => {
            cacheObj.AppMetadata[element.key] = element.jsondata;
        });
        console.log(cacheObj);
        return cacheObj;
    }
    catch(err){
        client.release();
        return Promise.reject(err);
    }
}

async function writeToCache(serializedCache){
    let client = await pool.connect();
    try {
        await client.query('BEGIN');
        Object.entries(serializedCache.Account).forEach(element => {
            client.query(`INSERT INTO account_msal_cache (key, jsondata) VALUES ('${element[0]}','${JSON.stringify(element[1])}') ON CONFLICT (key) DO UPDATE SET jsondata = EXCLUDED.jsondata`);
        });
        Object.entries(serializedCache.IdToken).forEach(element => {
            client.query(`INSERT INTO id_token_msal_cache (key, jsondata) VALUES ('${element[0]}','${JSON.stringify(element[1])}') ON CONFLICT (key) DO UPDATE SET jsondata = EXCLUDED.jsondata`);
        });
        Object.entries(serializedCache.AccessToken).forEach(element => {
            client.query(`INSERT INTO access_token_msal_cache (key, jsondata) VALUES ('${element[0]}','${JSON.stringify(element[1])}') ON CONFLICT (key) DO UPDATE SET jsondata = EXCLUDED.jsondata`);
        });
        Object.entries(serializedCache.RefreshToken).forEach(element => {
            client.query(`INSERT INTO refresh_token_msal_cache (key, jsondata) VALUES ('${element[0]}','${JSON.stringify(element[1])}') ON CONFLICT (key) DO UPDATE SET jsondata = EXCLUDED.jsondata`);
        });
        Object.entries(serializedCache.AppMetadata).forEach(element => {
            client.query(`INSERT INTO app_metadata_msal_cache (key, jsondata) VALUES ('${element[0]}','${JSON.stringify(element[1])}') ON CONFLICT (key) DO UPDATE SET jsondata = EXCLUDED.jsondata`);
        });
        await client.query('COMMIT');
        client.release();
        return;
    }
    catch(err){
        await client.query('ROLLBACK');
        client.release();
        return Promise.reject(err);
    }
}

/*(async() => {
    let client = await pool.connect();
    await client.query('BEGIN');
    await client.query('ALTER TABLE account_msal_cache ADD CONSTRAINT keyName UNIQUE (key)');
    await client.query('ALTER TABLE id_token_msal_cache ADD CONSTRAINT keyName UNIQUE (key)');
    await client.query('ALTER TABLE access_token_msal_cache ADD CONSTRAINT keyName UNIQUE (key)');
    await client.query('ALTER TABLE refresh_token_msal_cache ADD CONSTRAINT keyName UNIQUE (key)');
    await client.query('ALTER TABLE app_metadata_cache ADD CONSTRAINT keyName UNIQUE (key)');
    await client.query('COMMIT');
    client.release();
})();
*/
module.exports = {retrieveCache, writeToCache};