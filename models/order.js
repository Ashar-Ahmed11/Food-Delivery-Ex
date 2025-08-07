const mongoose = require('mongoose')


const { Schema } = mongoose;

const orderSchema = new Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    products: [{

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        quantity: {
            type: Number
        }
    }],
    status: {
        type: "String"
    },
    date:
    {
        type: Date,
        default: Date.now
    },

});


const orderModel = mongoose.model('order', orderSchema)
orderModel.createIndexes()
module.exports = orderModel