const asyncHandler = require('express-async-handler')

// const Post = require('../models/postModel')
const User = require('../models/userModel')

const searchUsers = asyncHandler(async (req, res) => {
  // console.log(req.body.search)
  if(!req.body.search){
    res.status(400)
    throw new Error('Input empty')
  }
  const users = await User.find({ "username": req.body.search })
  console.log(users)
  res.status(200).json({
    message: 'success',
    data: users,
  })
})

module.exports = {
  searchUsers,

}