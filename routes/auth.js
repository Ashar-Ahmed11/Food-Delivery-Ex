const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'ashar.2day@karachi'
const { body, validationResult } = require('express-validator')
const fetchUser = require('../middleware/fetchUser')
router.post('/createuser',
    [
        [

            body("email").isEmail().withMessage("Please enter a valid e-mail address"),
            body("firstName").notEmpty().withMessage("Please enter your first name"),
            body("lastName").notEmpty().withMessage("Please enter your last name"),
            body("phoneNumber").notEmpty().withMessage("Please enter your phone number"),
            body("password").notEmpty().withMessage("Please enter a password"),
        ],
    ]
    , async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let userExist = await User.findOne({ email: req.body.email })
            if (userExist) {
                return res.send({ errors: [{ msg: "A user with this email already exists!" }] })
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(req.body.password, salt)
            const data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hash,
            }

            const user = await User.create(data)
            user.save()

            const authData = {
                user: user._id
            }
            const authToken = jwt.sign(authData, JWT_SECRET)
            res.json({ authToken })

        } catch (error) {
            // res.send(error)
            console.log(error.message)
            res.status(500).send("Some Internal Server Error")

        }


    })

router.post('/login', async (req, res) => {
    const email = req.body.email
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.send({ errors: [{ msg: "Please enter correct credentials" }, { msg: "Please enter correct credentials" }] })
    }
    const pass = await bcrypt.compare(req.body.password, user.password)
    if (!pass) {
        return res.send({ errors: [{ msg: "Please enter correct credentials" }] })
    }
    const data = {
        user: user._id
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({ authToken })

})
router.get('/getUser', fetchUser, async (req, res) => {
    const user = req.user;
    const userDetails = await User.findById(user).select('-password').populate({ path: "orders", populate: [{ path: "products.product" }] }).populate("favourites")
    return res.json(userDetails)

})



module.exports = router