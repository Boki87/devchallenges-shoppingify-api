const express = require('express')
const {protect} = require('../middleware/auth')
const { createItem } = require('../controllers/items')

const router = express.Router()

router.route('').post(protect, createItem)

module.exports = router