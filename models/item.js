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
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
     createdAt: {
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('Item', ItemSchema)