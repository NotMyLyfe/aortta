require("dotenv").config();
const path = require('path')
const express = require('express');
const router = express.Router();


const Vonage = require('@vonage/server-sdk');
const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_BRAND_NAME = process.env.VONAGE_BRAND_NAME;


let verifyRequestId = null;
let verifyRequestNumber = null;



const vonage = new Vonage({
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET,
    },
    {debug: true,}
);

router.post('/verify', (req, res) => {
    // Start the verification process
    console.log(req.body);
    verifyRequestNumber = req.body.number;
    console.log(req.body.number);
    vonage.verify.request(
        {
            number: verifyRequestNumber,
            brand: "Aortta",
        },
        (err, result) => {
            if (err) console.error(err);
            else {
                verifyRequestId = result.request_id;
                console.log(`request_id: ${verifyRequestId}`);
            }
        }
    );
    res.send(200);
});

router.post('/check-code', (req, res) => {
    console.log(req.body.code);
    vonage.verify.check(
        {
            request_id: verifyRequestId,
            code: req.body.code,
        },
        (err, result) => {
            if (err) {
                console.error(err);
            } else {
                if (result.status == 0) {
                    req.session.user = {
                        number: verifyRequestNumber,
                    };
                }
            }
            res.redirect('/');
        }
    );
});

module.exports = router;
