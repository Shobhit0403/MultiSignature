const db = require("../Models/index");
const { updateTotalApprovals } = require('./approvalController')

const Approval = db.approval;


//Create approval 
const createApproval = async (process_id, approverId, isApproved) => {
    try {
        const approval = await Approval.create({
            approverId,
            processId: process_id,
            isApproved,
        });

        return { success: true, approval };
    } catch (error) {
        return { success: false, error: error.message };
    }
};


//put api call
const approveProcess = async (req, res) => {
    const processId = req.body.processId;
    const approverId = req.body.approverId;
    try {
        const updatedApproval = await Approval.update(
            { isApproved: true },
            {
                where: {
                    approverId: approverId,
                    processId: processId
                }
            }
        );
        updateTotalApprovals(processId);
        return updatedApproval;
    } catch (error) {
        throw new Error(error);
    }
}

const uploadPhoto = async (req, res) => {
    const processId = req.body.processId;
    const imageUrl = req.body.processId;
    const approverId = req.body.approverId;
    try {
        const updatedApproval = await Approval.update(
            { photoURL: imageUrl },
            {
                where: {
                    approverId: approverId,
                    processId: processId
                }
            }
        );

        return updatedApproval;
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = {
    createApproval,
};