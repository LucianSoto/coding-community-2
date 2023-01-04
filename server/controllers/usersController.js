const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')

const searchUsers = asyncHandler(async (req, res) => {
  // console.log(req.body.search)
  if(!req.body.search){
    res.status(400)
    throw new Error('Input empty')
  }
  const users = await User.find({ "username": req.body.search })
  const userRef = {
    username: users[0].username,
    email: users[0].email,
    id: users[0]._id,
  }
  res.status(200).json({
    message: 'success',
    data: userRef,
  })
})

const userPosts = asyncHandler(async (req, res) => {
  console.log('in controller userposts')
  const posts = await Post.find(req.params) 
  console.log(posts)
})

module.exports = {
  searchUsers,
  userPosts,
}