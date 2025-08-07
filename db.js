const mongoose = require('mongoose')

const URI = 'mongodb://localhost:27017/foodDelivery'

mongoose.set("strictQuery", false);
const connectToMongo = () => mongoose.connect(URI, () => {
    console.log("Connected to Mongo Successfully")
})

module.exports = connectToMongo