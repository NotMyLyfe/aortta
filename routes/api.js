const express = require('express');
const router = express.Router();
const msalApi = require("./api/msalApi.js");
const slackApi = require("./api/slackApi.js");
const vonageApi = require("./api/vonageApi.js");
const setupUsers = require('./users.js');

router.use(function(req, res, next) {
    if(req.url[0] !== '/' || req.originalUrl[0] !== '/') {
        res.status(404).send('');
    } else {
        next();
    }
});

router.use("/vonage",vonageApi);
router.use("/msal", msalApi);
router.use("/slack", slackApi);
router.use("/user", setupUsers);

module.exports = router;