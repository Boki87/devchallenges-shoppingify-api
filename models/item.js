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
        type: String        
    },
    image: {
        type: String        
    },
    category: {
        type: String        
    }

})

module.exports = mongoose.model('Item', ItemSchema)