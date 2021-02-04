const express = require('express')
const {protect} = require('../middleware/auth')
const { createItem, getItems, deleteItem, updateItem } = require('../controllers/items')

const router = express.Router()

router.route('').post(protect, createItem)
router.route('').get(protect, getItems)
router.route('/:id').put(protect, updateItem)
router.route('/:id').delete(protect, deleteItem)

module.exports = router