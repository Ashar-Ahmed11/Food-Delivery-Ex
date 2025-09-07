const mongoose = require('mongoose')

const URI = 'mongodb+srv://asharahmd11_db_user:e9AKme0rHxW4AIP5@cluster0.nxztxig.mongodb.net/foodDelivery'

mongoose.set("strictQuery", false);
const connectToMongo = () => mongoose.connect(URI, () => {
    console.log("Connected to Mongo Successfully")
})

module.exports = connectToMongo