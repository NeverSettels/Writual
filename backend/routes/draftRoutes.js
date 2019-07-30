const express = require('express')
const router = express.Router()
const { getAllDrafts, getOneDraft, createDraft, updateDraft, deleteDraft } = require('../controllers/draftControllers')

/* GET home page */
//create
router.post('/Drafts', createDraft)
//read
router.get('/drafts', getAllDrafts)
router.get('/drafts/:id', getOneDraft)

//update
router.patch('/drafts/:id', updateDraft)

//delete
router.delete('/drafts/:id', deleteDraft)

module.exports = router
