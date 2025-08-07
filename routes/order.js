const express = require('express')
const router = express.Router()
const User = require("../models//user")
const  Order = require("../models/order")

router.post('/createOrder', async (req, res) => {
        try {
            


            const order = await Order.create(req.body)
            const userOrder = await User.findByIdAndUpdate(req.body.recipient,{$push:{orders:[order]}},{new:true})

            return res.send(order)

        } catch (error) {
            // res.send(error)
            console.log(error.message)
            res.status(500).send("Some Internal Server Error")

        }


    })
router.get('/order/:id', async (req, res) => {
    try {

        const orderID = req.params.id
        const order = await Order.findById(orderID).populate("recipient","-password").populate("products.product")
        return res.send(order)

    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})
router.get('/orders', async (req, res) => {
    try {
     
            const orders = await Order.find({}).populate("recipient","-password").populate("products.product")
            return res.send(orders)
        
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})
router.put('/editOrder/:id', async (req, res) => {
    try {

        const orderID = req.params.id
        const order = await Order.findByIdAndUpdate(orderID, { $set: req.body }, { new: true })
        return res.send(order)
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})




module.exports = router