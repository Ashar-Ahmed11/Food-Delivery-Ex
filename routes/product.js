const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Product = require("../models/product")
const Category = require("../models/category")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'ashar.2day@karachi'
const { body, validationResult } = require('express-validator')
const fetchUser = require('../middleware/fetchUser')
const { findById, findByIdAndUpdate, findByIdAndDelete } = require('../models/order')
router.post('/createProduct',
    [
        [


            body("title").notEmpty().withMessage("Please enter your product title"),
            body("description").notEmpty().withMessage("Please enter product description"),
            body("image").notEmpty().withMessage("Please add product image"),
            body("price").notEmpty().withMessage("Please add product price"),
            body("category").notEmpty().withMessage("Please select a product category")
        ],
    ]
    , async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }


            const product = await Product.create(req.body)


            return res.send(product)

        } catch (error) {
            // res.send(error)
            console.log(error.message)
            res.status(500).send("Some Internal Server Error")

        }


    })
router.get('/product/:id', async (req, res) => {
    try {

        const productID = req.params.id
        const product = await Product.findById(productID).populate("category")
        return res.send(product)

    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})
router.get('/products/:categoryID?', async (req, res) => {
    try {
        const categoryID = req.params.categoryID
        if (categoryID) {
            const products = await Product.find({ category: categoryID }).populate("category")
            return res.send(products)
        }
        else {
            const products = await Product.find({}).populate("category")
            return res.send(products)
        }
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})
router.put('/editProduct/:id', async (req, res) => {
    try {

        const productID = req.params.id
        const product = await Product.findByIdAndUpdate(productID, { $set: req.body }, { new: true }).populate("category")
        return res.send(product)
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})
router.delete('/deleteProduct/:id', async (req, res) => {
    try {

        const productID = req.params.id
        const deletedProduct = await Product.findByIdAndDelete(productID)
        return res.send(deletedProduct)
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})
router.post('/addToFavourite/:productID', fetchUser, async (req, res) => {
    try {
        const user = req.user
        const productID = req.params.productID
        const currentUserState = await User.findById(user)
        let isAlreadyAdded = currentUserState.favourites.find((e) => e == productID)
        if (!isAlreadyAdded) {
            const favouriteUser = await User.findByIdAndUpdate(user, { $push: { favourites: [productID] } }, { new: true })
                .populate("favourites")
                .populate({ path: "orders", populate: [{ path: "products.product" }] })
                .select("-password")


            return res.send(favouriteUser)
        }
        else{
            return res.send("The product is already added to Favourites")
        }
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})

router.delete('/removeFromFavourite/:productID', fetchUser, async (req, res) => {
    try {
        const user = req.user
        const productID = req.params.productID
        const favouriteUser = await User.findByIdAndUpdate(user, { $pull: { favourites: productID } }, { new: true })
            .populate("favourites")
            .populate({ path: "orders", populate: [{ path: "products.product" }] })
            .select("-password")


        return res.send(favouriteUser)
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})




module.exports = router