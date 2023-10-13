const express = require('express')
const approvalController = require('../Controllers/approvalController')
const { approveProcess, uploadPhoto } = approvalController


const router = express.Router()

router.put('/approveProcess', approveProcess)

router.put('/uploadPhoto', uploadPhoto)

module.exports = router