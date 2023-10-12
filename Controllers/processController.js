const db = require("../Models/index");
const jwt = require("jsonwebtoken");
const bcryprt = require("bcrypt");
const { Op } = require('sequelize');
const { sendEmail } = require('./emailServiceController')
const { createApproval } = require('./approvalController')
const { userDetails } = require('./approvalController')




//Create process, we need to create approvals for user ids seleceted, 
//matlab jaise hi process create hue we need to create 5 different approvals



//Creation of Process
//Create approvals
//send mail to each one of them
//if user id selected is more than 5, console error -> more than 5 are selected
//take first 5 users
//create appovals object for them 
//send mail to each of them
//using the email address find by users 

const Process = db.process;

const createProcess = async (req, res) => {
    try {
        const { processName, creatorId, selectedUsers } = req.body;

        const createdProcess = await Process.create({
            processName: processName,
            processUserId: creatorId,
            totalApprovals: 0,
        });


        if (selectedUsers.length > 5) {
            //Do we need to throw error from BE
            console.log("More than 5 users are Selected");
        }
        const finalSelectedUses = selectedUsers.add(creatorId);
        const processId = createdProcess.id;
        const userDetailsMap = userDetails(finalSelectedUses);
        //Create approvals for each of the user and send mail 
        for (let i = 0; i < 5; i++) {
            createApproval(processId, selectedUsers[i], false);
            sendEmail(finalSelectedUses.get(creatorId).email, finalSelectedUses.get(selectedUsers[i]).email)
        }
        res.status(200).json(createProcess);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
};