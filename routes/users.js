const express = require("express");
const jwt = require('jsonwebtoken');
const {getUserInfo, updateUserInfo} = require('../db/userDb.js');
const router = express.Router();

router.get("/:id", async (req, res, next) => {
    try{
        let decoded = jwt.verify(req.params.id, process.env.JWT_SECRET);
        let phoneNumber = decoded.phoneNumber;
        await getUserInfo(phoneNumber).then(response => {
            if(response.microsoftid) req.session.homeAccountId = response.microsoftid;
            res.status(200).send(JSON.stringify(response));
        }).catch(err => next(err));
    }
    catch(err){
        return next(err);
    }
});

router.post("/:id", async (req, res, next) => {
    try{
        let decoded = jwt.verify(req.params.id, process.env.JWT_SECRET);
        let phoneNumber = decoded.phoneNumber;
        await updateUserInfo(phoneNumber, req.body.firstName, req.body.lastName).then(response => res.status(200)).catch(err => next(err));
    }
    catch(err){
        return next(err);
    }
});

module.exports = router;