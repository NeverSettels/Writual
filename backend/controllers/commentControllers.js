const Comment = require('../models/Comment')

exports.getComments = (req, res, next) => {
  const { id } = req.params
  Comment.findOne({ postedOn: id })
    .then(comment => res.status(200).json({ comment }))
    .catch(err => res.status(500).json(err))
}
exports.createComment = (req, res, next) => {
  Comment.create({ ...req.body })
    .then(comment => res.status(201).json({ comment }))
    .catch(err => res.status(500).json(err))
}

exports.updateComment = (req, res, next) => {
  const { id } = req.params
  Comment.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then(comment => res.status(200).json({ comment }))
    .catch(err => res.status(500).json({ msg: err }))
}
