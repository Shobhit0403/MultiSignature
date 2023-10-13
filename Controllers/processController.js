const db = require("../Model/index");
const jwt = require("jsonwebtoken");
const bcryprt = require("bcrypt");
const { Op } = require('sequelize');
const { sendEmail } = require('./emailServiceController')
const { createApproval } = require('./approvalController')
const { userDetails } = require('./userController')




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
            isApproved: false,
        });


        if (selectedUsers.length > 5) {
            //Do we need to throw error from BE
            console.log("More than 5 users are Selected");
        }
        const finalSelectedUses = selectedUsers.push(creatorId);
        const processId = createdProcess.id;
        const userDetailsMap = userDetails(finalSelectedUses);
        //Create approvals for each of the user and send mail
        let n = Math.min(5, selectedUsers.length);

        for (let i = 0; i < n; i++) {
            if (!selectedUsers[i]) {
                return res.status(400).send("Less than 5 users are selected");
            }
            createApproval(processId, selectedUsers[i], false);
            // sendEmail(userDetailsMap.get(creatorId).email, userDetailsMap.get(selectedUsers[i]).email)
            console.log(`Email sent to: ${selectedUsers[i]}`);
        }
        return res.status(200).json(createProcess);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
};

const updateTotalApprovals = async (processId) => {
    try {
        const [updatedRows] = await Process.update(
            {
                totalApprovals: sequelize.literal('totalApprovals + 1'),
                isApproval: sequelize.literal('totalApprovals + 1 >= 5')
            },
            { where: { id: processId } }
        );

        return updatedRows;
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = {
    createProcess,
    updateTotalApprovals,
};