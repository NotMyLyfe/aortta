const express = require('express');
const path = require('path');
const api = require("./routes/api.js");
const msalAuth = require("./routes/msalAuth.js");
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret'
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api", api);


app.use(express.static(path.join(__dirname, 'build')));

app.use("/msal", msalAuth);

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send(err);
});

app.listen(3000, ()=>{
    console.log("server is up!");
});