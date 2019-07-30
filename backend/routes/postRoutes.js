const express = require('express')
const router = express.Router()
const { getAllPosts, getOnePost, createPost, updatePost, deletePost } = require('../controllers/postControllers')
const { verifyToken } = require('../config/jwt')

/* GET home page */
//create
router.post('/posts', verifyToken, createPost)
//read
router.get('/posts', getAllPosts)
router.get('/posts/:id', getOnePost)

//update
router.patch('/posts/:id', updatePost)

//delete
router.delete('/posts/:id', deletePost)

module.exports = router
