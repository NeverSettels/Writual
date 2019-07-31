const express = require('express')
const router = express.Router()
const { createComment, getComments, updateComment } = require('../controllers/commentControllers')
const { verifyToken } = require('../config/jwt')

/* GET home page */
//create
router.post('/comments', createComment)
//read
router.get('/comments/:id', getComments)

router.patch('/comments/:id', updateComment)
//delete
//router.delete('/posts/:id', deleteComments)

module.exports = router
