const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errorResponse')
const Item = require('../models/item')

// @desc        Create Item
// @route       POST /api/v1/items
// @access      Private
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

// @desc        Get Items
// @route       GET /api/v1/items
// @access      Private
exports.getItems = asyncHandler(async (req, res, next) => {    
    
    var items = await Item.find({ user: req.user._id })
    .populate({
        path: 'category',
        select: ['name', '_id']
    })

    res.status(200).json({
        success: true,
        data: items
    })

})

// @desc        Update Item
// @route       PUT /api/v1/items/:id
// @access      Private
exports.updateItem = asyncHandler(async (req, res, next) => {    
    
    let item = await Item.findById(req.params.id)

    if (!item) {
        return next(new ErrorResponse(`Item not found with id ${req.params.id}`, 404))        
    }
    console.log(item.user, req.user._id.toString(), req.user._id.toString() !== item.user.toString());
    //make sure user is item owner
    if (item.user.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`User ${req.user._id} is not authorized to delete this recipe`, 401))                
    }

    item = await Item.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: item
    })

})

// @desc        Delete Item
// @route       DELETE /api/v1/items/:id
// @access      Private
exports.deleteItem = asyncHandler(async (req, res, next) => {    
    
    let item = await Item.findById(req.params.id)

    if (!item) {
        return next(new ErrorResponse(`Item not found with id ${req.params.id}`, 404))        
    }
    console.log(item.user, req.user._id.toString(), req.user._id.toString() !== item.user.toString());
    //make sure user is item owner
    if (item.user.toString() !== req.user._id.toString()) {
        return next(new ErrorResponse(`User ${req.user._id} is not authorized to delete this recipe`, 401))                
    }

    item.remove()

    res.status(200).json({
        success: true,
        data: {}
    })

})