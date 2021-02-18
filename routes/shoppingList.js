const express = require('express')
const {protect} = require('../middleware/auth')
const {createShoppingList, getShoppingLists, getShoppingList, deleteShoppingList, updateShoppingList, getActiveShoppingList} = require('../controllers/shoppingList')

const router = express.Router()

router.route('').post(protect, createShoppingList)
router.route('').get(protect, getShoppingLists)
router.route('/active').get(protect, getActiveShoppingList)
router.route('/:id').get(protect, getShoppingList)
router.route('/:id').delete(protect, deleteShoppingList)
router.route('/:id').put(protect, updateShoppingList)


module.exports = router