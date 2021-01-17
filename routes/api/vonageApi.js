require("dotenv").config();
const express = require('express');
const router = express.Router();

const Vonage = require('@vonage/server-sdk');
const {responseIdInsert, responseIdReturn, addNames} = require('../../db/vonageDb.js');
const VONAGE_API_KEY = process.env.VONAGE_API_KEY;
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET;
const VONAGE_BRAND_NAME = process.env.VONAGE_BRAND_NAME;

const vonage = new Vonage({
    apiKey: VONAGE_API_KEY,
    apiSecret: VONAGE_API_SECRET,
    },
    {debug: true,}
);

router.post('/verify', async (req, res, next) => {
    // Start the verification process
    let verifyRequestNumber = "1" + req.body.number;
    vonage.verify.request(
        {
            number: verifyRequestNumber,
            brand: "Aortta",
            workflow_id: 6
        },
        async (err, result) => {
            if (err) next(err);
            else {
                await responseIdInsert(result.request_id, verifyRequestNumber).then(resp => {}).catch(error => next(error));
            }
        }
    );
    res.sendStatus(200);
});

router.post('/check-code', async (req, res, next) => {
    let phoneNumber = req.body.number;
    let verifyRequestId = await responseIdReturn(phoneNumber).catch(error => next(error));
    vonage.verify.check(
        {
            request_id: verifyRequestId,
            code: req.body.code,
        },
        (err, result) => {
            if (err) {
                next(err);
            } else {
                if (result.status == 0) {
                    req.session.number = phoneNumber;
                    await addNames(req.body.firstname, req.body.lastname);
                } else{
                    next(new Error("Invalid code"));
                }
            }
            res.redirect('/messaging');
        }
    );
});

module.exports = router;
