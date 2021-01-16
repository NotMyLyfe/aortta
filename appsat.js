require("dotenv").config();
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

pool.connect(function (err, client, done) {
    // Your code goes here.
    // For more information, see the 'node-postgres' docs:
    // https://node-postgres.com
    if (err) throw(err);
    console.log("Connected!\n");
    pool.query("INSERT INTO users (firstName,lastName,phoneNumber) VALUES ('Mansi','Arora',15199913567)",function(err,result) {
        if (err) throw(err);
        else console.log("User added!");
    })
})