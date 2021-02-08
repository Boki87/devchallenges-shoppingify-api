const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add item name']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    note: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    category: {
       type: String,
       required: [true, 'Please add category']
    },
     createdAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('Item', ItemSchema)