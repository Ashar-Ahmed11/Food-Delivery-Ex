const mongoose = require('mongoose')


const { Schema } = mongoose;

const productSchema = new Schema({

    title: {
        type: "String",
        required: true
    },
    description: {
        type: "String",
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    image: {
        type: "String",
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    date:
    {
        type: Date,
        default: Date.now
    },

});


const productModel = mongoose.model('product', productSchema)
productModel.createIndexes()
module.exports = productModel