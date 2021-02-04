const express = require('express')
const {protect} = require('../middleware/auth')
const { createCategory, getCategories } = require('../controllers/categories')

const router = express.Router()

router.route('').post(protect, createCategory)
router.route('').get(protect, getCategories)

module.exports = router