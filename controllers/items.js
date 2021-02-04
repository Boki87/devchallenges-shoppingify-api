const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Item = require('../models/item')

// @desc        Register user
// @route       POST /api/v1/items
// @access      Public
exports.createItem = asyncHandler(async (req, res, next) => {

    const { name, note, image, category } = req.body
    

    if (!name || !category) {
        return next(new ErrorResponse(`Please add name and category`, 400))
    }

    //create item
    const item = await Item.create({
        name, user:req.user._id, note, image, category
    })

    res.status(200).json({
        success: true,
        data: item
    })

})