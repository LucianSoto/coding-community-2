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
//  https://stackoverflow.com/questions/41836552/how-to-find-all-documents-with-only-looking-at-first-letter-of-the-values-in-mon 

// regex to search users more broadly ie excluding upper/lowercase
})

const userPosts = asyncHandler(async (req, res) => {
  const {id} = req.params
  console.log(id, 'in controller userposts')
  const posts = await Post.find({'userId': {$in: id}})
  res.status(200).json({
    message: 'success',
    data: posts,
  })
})

module.exports = {
  searchUsers,
  userPosts,
}