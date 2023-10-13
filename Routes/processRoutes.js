const express = require('express')
const processController = require('../Controllers/processController')
const { createProcess } = processController


const router = express.Router()

router.post('/createProcess', createProcess)

module.exports = router