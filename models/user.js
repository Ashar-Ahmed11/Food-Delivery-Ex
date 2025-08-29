const mongoose = require('mongoose')


const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: 'String',
        required: 'True',
        unique: true,
        index: true
    },
    firstName: {
        type: 'String',
        required: 'True'
    },
    lastName: {
        type: 'String',
        required: 'True'
    },
    password: {
        type: 'String',
        required: 'True'
    },
    address: {
        type: 'String'
    },
    phoneNumber:{
        type: 'String',
        required:true
    },
    orders:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"order"  
    }],
    favourites:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"product"  
    }],
    date:
    {
        type: Date,
        default: Date.now
    },

});


const userModel = mongoose.model('user', userSchema)
userModel.createIndexes()
module.exports = userModel