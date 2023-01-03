const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')

// Worry about getting user feed/timeline after posting posts.

const getPosts = asyncHandler(async (req, res) => {
  console.log(req.user)
  const posts = await Post.find({ userId: req.user.id })
  res.status(200).json(posts)
})

// const getFeed = asyncHandler(async (req, res) => {
//   try {
    
//   }
// })

// Make a Post
const setPost = asyncHandler(async (req, res) => {
  // console.log(req.user, req.body.title)
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const post = await Post.create({
    title: req.body.title,
    userId: req.user.id,
  })

  res.status(200).json(post)
})



const deletePost = asyncHandler(async (req, res) => {
  // console.log(req.params,'params')
  // console.log(req.user, 'user')
  const post = await Post.findById(req.params.id)

  if(!req.user){
    // console.log('not user')
    res.status(401)
    throw new Error('User not found')
  }
  if(post.userId.toString() !== req.user.id) {
    // console.log('not authoeized')
    res.status(401)
    throw new Error('User not authorized')
  }
  await post.remove()
  res.status(200).json({ id: req.params.id })
})

const editPost = asyncHandler(async (req, res) => {
  console.log(req.user, 'user')
  console.log(req.body)
  // const post = await Post.findById(req.params.id)
})

module.exports = { getPosts, setPost, deletePost, editPost }