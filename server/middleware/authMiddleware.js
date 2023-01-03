const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if(
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // console.log(decoded, 'decoded')
      // Get user from token
      req.user = await User.findById(decoded.id).select('-password')
      // console.log(req.user, 'at middleware')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Nor authorized, no token')
  }
})

module.exports = { protect }