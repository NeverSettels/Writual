const express = require('express')
const router = express.Router()
const { getAllDrafts, getOneDraft, createDraft, updateDraft, deleteDraft } = require('../controllers/draftControllers')
const { verifyToken } = require('../config/jwt')
/* GET home page */
//create
router.post('/drafts', verifyToken, createDraft)
//read
router.get('/drafts', getAllDrafts)
router.get('/drafts/:id', getOneDraft)

//update
router.patch('/drafts/:id', updateDraft)

//delete
router.delete('/drafts/:id', deleteDraft)

module.exports = router
