const db = require("../Models/index");


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



module.exports = {
    createApproval,
};