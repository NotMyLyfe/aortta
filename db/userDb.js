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

async function getUserInfo(phonenumber){
    let client = await pool.connect();
    try{
        await client.query('BEGIN');
        const query = await client.query(`SELECT * FROM users WHERE phonenumber = '${phonenumber}'`);
        if(query.rowCount != 1) throw new Error("Invalid number of queries");  
        await client.query(`COMMIT`);
        client.release();
        return query.rows[0];
    }
    catch(err){
        await client.query('ROLLBACK');
        client.release();
        return Promise.reject(err);
    }
}

async function updateUserInfo(phoneNumber, firstName, lastName){
    let client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(`UPDATE users SET firstname = '${firstName}', lastname = '${lastName}' WHERE phonenumber = '${phoneNumber}'`);
        await client.query(`COMMIT`);
        client.release();
        return;
    }
    catch(err){
        await client.query('ROLLBACK');
        client.release();
        return Promise.reject(err);
    }
}

async function addTeams(phoneNumber, microsoftId){
    let client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(`UPDATE users SET microsoftid = '${microsoftId}' WHERE phonenumber = '${phoneNumber}'`);
        await client.query(`COMMIT`);
        client.release();
        return;
    }
    catch(err){
        await client.query('ROLLBACK');
        client.release();
        return Promise.reject(err);
    }
}

async function addSlack(phoneNumber, slackId){
    let client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(`UPDATE users SET slackid = '${slackId}' WHERE phonenumber = '${phoneNumber}'`);
        await client.query(`COMMIT`);
        client.release();
        return;
    }
    catch(err){
        await client.query('ROLLBACK');
        client.release();
        return Promise.reject(err);
    }
}

module.exports = {addSlack, addTeams, getUserInfo, updateUserInfo};