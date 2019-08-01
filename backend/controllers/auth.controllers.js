const User = require('../models/User')
const { signToken, verifyToken } = require('../config/jwt')

exports.signup = (req, res, next) => {
  User.register({ ...req.body, role: 'USER' }, req.body.password)
    .then(user => res.status(201).json({ user }))
    .catch(err => res.status(500).json({ err }))
}

exports.login = (req, res, next) => {
  const [header, payload, signature] = signToken(req.user)
  res.cookie('headload', `${header}.${payload}.`, {
    // quitar comentarios cuando este en producción para máxima seguridad
    // maxAge: 1000 * 60 * 60 * 6,
    // secure: true
  })
  res.cookie('signature', signature, {
    // quitar comentarios cuando este en producción para máxima seguridad
    // httpOnly: true,
    // secure: true
  })
  res.status(200).json({ user: req.user })
}

exports.logout = (req, res, next) => {
  res.clearCookie('headload')
  res.clearCookie('signature')
  res.status(200).json({ msg: 'Bye bye' })
}

exports.profile = (req, res, next) => {
  User.findById(req.user._id, { hash: 0, salt: 0 })
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(401).json({ err }))
}
exports.update = (req, res, next) => {
  const { id } = req.params
  User.findByIdAndUpdate(id, { ...req.body }, { new: true })
    .then(post => res.status(200).json({ post }))
    .catch(err => res.status(500).json(err))
}

exports.getProfile = (req, res, next) => {
  const { id } = req.params
  User.findOne({ _id: id }).populate('posts').populate('bookmarked')
    .then(user => res.status(200).json({ user }))
    .catch(err => res.status(401).json({ err }))
}