const express = require('express');
const router = express.Router();

router.post('/verify', (req, res, next) => {
    if(req.body.challenge && req.body.type && req.body.type == "url_verification") {
        res.send(JSON.stringify({
            "challenge" : req.body.challenge
        }));
    }
    else{
        res.sendStatus(400);
    }
});

module.exports = router;