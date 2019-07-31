const router = require('express').Router()
const { signup, login, logout, profile, update } = require('../controllers/auth.controllers')
const passport = require('../config/passport')
const { verifyToken } = require('../config/jwt')

router.post('/signup', signup)

router.post('/login', passport.authenticate('local'), login)

router.get('/logout', logout)

router.get('/profile', verifyToken, profile)

router.patch('/user/:id', updatePost)

module.exports = router
