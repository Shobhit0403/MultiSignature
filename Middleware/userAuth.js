const express = require("express");
const db = require("../Model/index");
const User = db.users;



//Will check is the phone number is unique or not, other wise good to go

const saveUser = async (req, res, next) => {
    try {
        const phoneNumberCheck = await User.findOne({
            where: {
                phone: req.body.phone,
            },
        });
        if (phoneNumberCheck) {
            return res.json(409).send("Phone Number already taken");
        }

        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (emailcheck) {
            return res.json(409).send("Authentication failed");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};


module.exports = { saveUser };