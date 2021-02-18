const mongoose = require('mongoose')

const ShoppingListSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    items: [{
        item: {
            type: mongoose.Schema.ObjectId,
            ref: 'Item'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        done: {
            type: Boolean,
            default: false
        }
    }],

    status: {
        type: String,
        enum: ['active', 'completed', 'canceled'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, { timestamps: true })

module.exports = mongoose.model('ShoppingList', ShoppingListSchema)