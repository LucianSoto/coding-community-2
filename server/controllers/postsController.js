const asyncHandler = require('express-async-handler')

const Post = require('../models/postModel')
const User = require('../models/userModel')

// Worry about getting user feed/timeline after posting posts.

const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id })
  res.status(200).json({ message: 'Get goals'})
})

// const getFeed = asyncHandler(async (req, res) => {
//   try {
    
//   }
// })

// Make a Post
const setPost = asyncHandler(async (req, res) => {
  console.log(req.user, req.body.title)
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
// const setPost = asyncHandler(async (req, res) => {
//   console.log(req.body)
//   if(!req.body.text){
//     res.status(400)
//     throw new Error('Please add a text field')
//   }
//   User.findByIdAndUpdate(id,
//     { $push: {"posts": {
//       post_title: req.body.title,
//       post_body: req.body.body,
//       // post_img: req.body.url
//     }} },
//     {new: true},
//     (err, user) => {
//       if(err) {
//         res.send(err, 'Problem adding exercise')
//       } else {
//         res.status(200).json({message: "success", data: user})
//       }
//     }
//   )
//   req.status(200).json({ message: 'setgoal'})
// })

const updatePost = asyncHandler(async (req, res) => {
  console.log(req.body)
  const post = await Post.find()
})

const deletePost = asyncHandler(async (req, res) => {
  console.log(req.body)
})


module.exports = { getPosts, setPost, updatePost, deletePost }