const Post = require('../models/Posts')
const User = require('../models/User')

exports.getAllPosts = (req, res, next) => {
  Post.find()
    .populate('postedBy')
    .then(posts => res.status(200).json({ posts }))
    .catch(err => res.status(500).json(err))
}
exports.getByCategory = (req, res, next) => {
  const { category } = req.params
  Post.find({ categories: category })
    .populate('postedBy')
    .then(posts => res.status(200).json({ posts }))
    .catch(err => res.status(500).json(err))
}

exports.getOnePost = (req, res, next) => {
  const { id } = req.params
  Post.findById(id)
    .populate('postedBy')
    .then(post => res.status(200).json({ post }))
    .catch(err => res.status(500).json(err))
}

exports.createPost = (req, res, next) => {
  Post.create({ ...req.body })
    .then(({ _id }) => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: _id } }).then(res => res.status(201).json({ yolo }))
    })
    .catch(err => res.status(500).json(err))
}

exports.updatePost = (req, res, next) => {
  const { id } = req.params
  Post.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then(post => res.status(200).json({ post }))
    .catch(err => res.status(500).json(err))
}

exports.deletePost = (req, res, next) => {
  const { id } = req.params
  Post.findByIdAndDelete(id)
    .then(post => res.status(200).json({ post, msg: 'Post deleted' }))
    .catch(err => res.status(500).json(err))
}
