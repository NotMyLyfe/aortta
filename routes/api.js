const express = require('express');
const router = express.Router();
const msalApi = require("./api/msalApi.js");
const slackApi = require("./api/slackApi.js");
router.use("/msal", msalApi);
router.use("/slack", slackApi);

module.exports = router;