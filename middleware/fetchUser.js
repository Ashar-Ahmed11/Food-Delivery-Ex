const jwt = require('jsonwebtoken')
const JWT_SECRET = 'ashar.2day@karachi'

const fetchUser = (req, res, next) => {
    try {
        
    const token = req.header('authToken')
    const data = jwt.verify(token, JWT_SECRET)
  
    req.user = data.user
    next()
    
    } catch (error) {
return res.send({ errors: [{ msg: "You are not authorized!" }] })
    }
}

module.exports = fetchUser