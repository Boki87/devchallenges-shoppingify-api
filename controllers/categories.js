const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Category = require('../models/category')

// @desc        Create Category
// @route       POST /api/v1/categories
// @access      Private
exports.createCategory = asyncHandler(async (req, res, next) => {

    const { name } = req.body
    

    if (!name) {
        return next(new ErrorResponse(`Please add category name`, 400))
    }

    //create item
    const category = await Category.create({
        name,
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        data: category
    })

})

// @desc        List all Categories
// @route       GET /api/v1/categories
// @access      Private
exports.getCategories = asyncHandler(async (req, res, next) => {        

    var categories = await Category.find({user: req.user._id})

    res.status(200).json({
        success: true,
        data: categories
    })

})