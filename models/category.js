const mongoose = require('mongoose')


const { Schema } = mongoose;

const categorySchema = new Schema({

    title: {
        type: "String",
        required: true
    },
    icon: {
        type: "String",
        required: true
    },
    

    date:
    {
        type: Date,
        default: Date.now
    },

});


const categoryModel = mongoose.model('category', categorySchema)
categoryModel.createIndexes()
module.exports = categoryModel