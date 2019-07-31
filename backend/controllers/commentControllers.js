const Comment = require('../models/Comment')

exports.getComments = (req, res, next) => {
  const { id } = req.params
  Comment.find({ postedOn: id })
    .then(posts => res.status(200).json({ posts }))
    .catch(err => res.status(500).json(err))
}
exports.createComment = (req, res, next) => {
  Comment.create({ ...req.body })
    .then(draft => res.status(201).json({ draft }))
    .catch(err => res.status(500).json(err))
}

exports.updateComment = (req, res, next) => {
  const { id } = req.params
  Comment.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then(post => res.status(200).json({ post }))
    .catch(err => res.status(500).json(err))
}
