const express = require('express')
const commentController = require('../Controllers/commentController')
const { addComment } = commentController


const router = express.Router()

router.post('/addComment', addComment)

module.exports = router