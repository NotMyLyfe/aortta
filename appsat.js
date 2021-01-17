require("dotenv").config();
const prompt = require('prompt-sync')();
const fs = require('fs');
const pg = require('pg');
const { exit } = require("process");

// Connect to the database.
let config = {
    user: process.env.COCKROACH_USER,
    password: process.env.COCKROACH_PASSWORD,
    host: process.env.COCKROACH_HOST,
    database: process.env.COCKROACH_DATABASE,
    port: process.env.COCKROACH_PORT,
    ssl: {
        ca: fs.readFileSync(process.env.COCKROACH_CA_PATH)
            .toString()
    }
};

var pool = new pg.Pool(config);



async function addUser(fName,lName,pNumber) {
    //success -> added
    //duplicate -> phone number in database
    //error -> error
    let client;
    let x="";
    var res,prevReg;
    try {
        client = await pool.connect()
        await client.query('BEGIN');
        console.log('begin');
        prevReg = await client.query(`SELECT COUNT(1) FROM users WHERE phoneNumber = ${pNumber}`);
        //console.log(prevReg);
        //console.log(prevReg.rows[0]['count'])
        if (prevReg.rows[0]['count'] != '0') x = "duplicate";
        else {
            res = await client.query("INSERT INTO users (firstName,lastName,phoneNumber) VALUES (\'" + `${fName}` + "\', \'" + `${lName}` + "\', " + `${pNumber}` + ")")
            x = "success";   
        }
        await client.query('COMMIT');
    }
    catch (err) {
        console.log(err)
        await client.query('ROLLBACK')
        x = "error";
    }
    client.release();
    return x;
}

async function removeUser(fName,lName,pNumber) {
    //success -> deleted
    //error -> error
    //incorrect -> info provided was incorrect
    let client;
    let x="";
    var res;
    try {
        client = await pool.connect()
        await client.query('BEGIN');
        console.log('begin');
        res = await client.query(`DELETE FROM users WHERE firstName = \'${fName}\' AND lastName = \'${lName}\' AND phoneNumber = ${pNumber}`)
        if (res.rowCount == 0) x = "incorrect";
        else x = "success";
        await client.query('COMMIT');
    }
    catch (err) {
        console.log(err)
        await client.query('ROLLBACK')
        x = "error";
    }
    client.release();
    return x;
}

async function auth(fName,lName,pNumber) {
    //pass the first step of authentication -> provide their First, Last Name, and Phone Number
    //success -> deleted
    //error -> error
    //incorrect -> info provided was incorrect
    let client;
    let x="";
    var res;
    try {
        client = await pool.connect()
        await client.query('BEGIN');
        console.log('begin');
        res = await client.query(`SELECT COUNT(1) FROM users WHERE firstName = \'${fName}\' AND lastName = \'${lName}\' AND phoneNumber = ${pNumber}`)
        if (res.rows[0]['count'] == '0') x = "incorrect";
        else x = "success";
        await client.query('COMMIT');
    }
    catch (err) {
        console.log(err)
        await client.query('ROLLBACK')
        x = "error";
    }
    client.release();
    return x;
}

/*(async () => {
    let x = await addUser('Lily','Ni',65738293774);
    console.log(x);
    //x = await removeUser('Lily','Ni',65738293774);
    //console.log(x);
})()*/

