const express = require('express')
const router = express.Router()
const Category = require("../models/category")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'ashar.2day@karachi'
const { body, validationResult } = require('express-validator')
const fetchUser = require('../middleware/fetchUser')
router.post('/createCategory',
    [
        [


            body("title").notEmpty().withMessage("Please enter your category title"),
            body("icon").notEmpty().withMessage("Please add your category icon"),
            
        ],
    ]
    , async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }


            const category = await Category.create(req.body)


            return res.send(category)

        } catch (error) {
            // res.send(error)
            console.log(error.message)
            res.status(500).send("Some Internal Server Error")

        }


    })
router.get('/category/:id', async (req, res) => {
    try {

        const categoryID = req.params.id
        const category = await Category.findById(categoryID)
        return res.send(category)

    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})
router.get('/categories', async (req, res) => {
    try {
    
            const categories = await Category.find({})
            return res.send(categories)
    
    
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})
router.put('/updateCategory/:id', async (req, res) => {
    try {

        const categoryID = req.params.id
        const category = await Category.findByIdAndUpdate(categoryID, { $set: req.body }, { new: true })
        return res.send(category)
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})
router.delete('/deleteCategory/:id', async (req, res) => {
    try {

        const categoryID = req.params.id
        const deletedcategory = await Category.findByIdAndDelete(categoryID)
        return res.send(deletedcategory)
    } catch (error) {
        // res.send(error)
        console.log(error.message)
        return res.status(500).send("Some Internal Server Error")

    }
})




module.exports = router