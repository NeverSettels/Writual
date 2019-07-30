const Draft = require('../models/Drafts')

exports.getAllDrafts = (req, res, next) => {
  Draft.find()
    .then(drafts => res.status(200).json({ drafts }))
    .catch(err => res.status(500).json(err))
}

exports.getOneDraft = (req, res, next) => {
  const { id } = req.params
  Draft.findById(id)
    .then(draft => res.status(200).json({ draft }))
    .catch(err => res.status(500).json(err))
}

exports.createDraft = (req, res, next) => {
  Draft.create({ ...req.body })
    .then(draft => res.status(201).json({ draft }))
    .catch(err => res.status(500).json(err))
}

exports.updateDraft = (req, res, next) => {
  const { id } = req.params
  Draft.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then(draft => res.status(200).json({ draft }))
    .catch(err => res.status(500).json(err))
}

exports.deleteDraft = (req, res, next) => {
  const { id } = req.params
  Draft.findByIdAndDelete(id)
    .then(draft => res.status(200).json({ draft, msg: 'draft deleted' }))
    .catch(err => res.status(500).json(err))
}
