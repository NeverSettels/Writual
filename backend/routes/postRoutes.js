const express = require('express')
const router = express.Router()
const { getAllPosts, getOnePost, createPost, updatePost, deletePost } = require('../controllers/postControllers')

/* GET home page */
//create
router.post('/posts', createPost)
//read
router.get('/posts', getAllPosts)
router.get('/posts/:id', getOnePost)

//update
router.patch('/posts/:id', updatePost)

//delete
router.delete('/posts/:id', deletePost)

module.exports = router
