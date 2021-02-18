const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const ShoppingList = require('../models/ShoppingList')

// @desc        Create Shopping List
// @route       POST /api/v1/list
// @access      Private
exports.createShoppingList = asyncHandler(async (req, res, next) => {

    const { name, items, status } = req.body
    

    if (!status) {
        return next(new ErrorResponse(`Please add name and status`, 400))
    }

    //create shopping list
    const shoppingList = await ShoppingList.create({
        name, user:req.user._id, items, status
    })

    res.status(200).json({
        success: true,
        data: shoppingList
    })

})

// @desc        Get SHopping Lists
// @route       GET /api/v1/list
// @access      Private
exports.getShoppingLists = asyncHandler(async (req, res, next) => {

    let shoppingLists = await ShoppingList.find({user: req.user._id})

    res.status(200).json({
        success: true,
        data: shoppingLists
    })

})

// @desc        Get Active Shopping List
// @route       GET /api/v1/list/active
// @access      Private
exports.getActiveShoppingList = asyncHandler(async (req, res, next) => {

    let activeShoppingList = await ShoppingList.findOne({user: req.user._id, status: 'active'}).populate({
        path: 'items',
        populate: {
            path: 'item',
            select: 'name note image category user done quantity'
        }
    })
    
    res.status(200).json({
        success: true,
        data: activeShoppingList
    })

})

// @desc        Get Shopping Lists
// @route       GET /api/v1/list
// @access      Private
exports.getShoppingLists = asyncHandler(async (req, res, next) => {

    let shoppingLists = await ShoppingList.find({user: req.user._id}).select('-items')

    res.status(200).json({
        success: true,
        data: shoppingLists
    })

})

// @desc        Get Shopping List
// @route       GET /api/v1/list/:id
// @access      Private
exports.getShoppingList = asyncHandler(async (req, res, next) => {


    let shoppingList = await ShoppingList.findById(req.params.id)
    .populate({
        path: 'items',
        populate: {
            path: 'item',
            select: 'name note image category user done quantity'
        }
    })

    res.status(200).json({
        success: true,
        data: shoppingList
    })

})

// @desc        Delete Shopping List
// @route       DELETE /api/v1/list/:id
// @access      Private
exports.deleteShoppingList = asyncHandler(async (req, res, next) => {


    let shoppingList = await ShoppingList.findById(req.params.id)
   
    if (!shoppingList) {
        return next(new ErrorResponse(`No shopping list with id ${req.params.id}`, 404))
    }

    if (shoppingList.user.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`User ${req.user._id} does not have permission to delete this shopping list`, 401))
    }

    shoppingList.remove()

    res.status(200).json({
        success: true,
        data: {}
    })

})

// @desc        Update Shopping List
// @route       PUT /api/v1/list/:id
// @access      Private
exports.updateShoppingList = asyncHandler(async (req, res, next) => {


    let shoppingList = await ShoppingList.findById(req.params.id)
   
    if (!shoppingList) {
        return next(new ErrorResponse(`No shopping list with id ${req.params.id}`, 404))
    }

    if (shoppingList.user.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`User ${req.user._id} does not have permission to delete this shopping list`, 401))
    }

    shoppingList = await ShoppingList.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    })
    

    res.status(200).json({
        success: true,
        data: shoppingList
    })

})