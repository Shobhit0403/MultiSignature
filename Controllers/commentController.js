const db = require("../Model/index");


const addComment = async (req, res) => {

    const Comment = db.comment;
    const processId = req.body.processId;
    const userId = req.body.approverId;
    const text = req.body.text;
    try {
        const comment = await Comment.create({
            text,
            userId,
            processId,
        });

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).send(error);
    }
}


module.exports = {
    addComment,
};