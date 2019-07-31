const express = require('express')
const router = express.Router()
const {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  getByCategory,
  getUserPosts
} = require('../controllers/postControllers')
const { verifyToken } = require('../config/jwt')

/* GET home page */
//create
router.post('/posts', verifyToken, createPost)
//read
router.get('/posts', getAllPosts)
router.get('/posts/:userId', getUserPosts)
router.get('/posts/:category', getByCategory)
router.get('/post/:id', getOnePost)

//update
router.patch('/posts/:id', updatePost)

//delete
router.delete('/posts/:id', deletePost)

module.exports = router
