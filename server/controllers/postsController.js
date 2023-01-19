const asyncHandler = require('express-async-handler')
const Post = require('../models/postModel')
const User = require('../models/userModel')

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ userId: req.user.id })
  res.status(200).json(posts)
})

const setPost = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  const post = await Post.create({
    title: req.body.title,
    imgUrls: req.body.imgUrls,
    userId: req.user.id,
  })
  res.status(200).json(post)
})

const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)

  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }
  if(post.userId.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  await post.remove()
  res.status(200).json({ id: req.params.id })
})

const editPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    res.status(400)
    throw new Error('Post not found')
  }
  if(!req.user){
    res.status(401)
    throw new Error('User not found')
  }
  if(post.userId.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not found')
  }
  const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new:true,
  })
  res.status(200).json(updatePost)
})

module.exports = { getPosts, setPost, deletePost, editPost }