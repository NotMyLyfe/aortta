const express = require('express');
const router = express.Router();
const msalApi = require("./api/msalApi.js");
const slackApi = require("./api/slackApi.js");
const vonageApi = require("./api/vonageApi.js");
router.use("/msal", msalApi);
router.use("/slack", slackApi);
router.use("/vonage",vonageApi);

module.exports = router;