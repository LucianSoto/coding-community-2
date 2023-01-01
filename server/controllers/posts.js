const asyncHandler = require('express-async-handler')


const getPosts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get goals'})
})

const setPost = asynchHandler(async (req, res) => {
  console.log(req.body)
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
  }
  req.status(200).json({ message: 'setgoal'})
})

const updatePost = asyncHandler(async (req, res) => {
  console.log(req.body)
})

const deletePost = asyncHandler(async (req, res) => {
  console.log(req.body)
})


module.exports = { getPosts, setPost, updatePost, deletePost }