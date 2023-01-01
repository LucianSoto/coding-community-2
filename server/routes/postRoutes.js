const express = require('express')
const router  = express.Router()
const {  
  getPosts,
  setPost,
  updatePost,
  deletePost,
} = require('../controllers/posts')

router.get('/', getPosts)

router.post('/', setPost)

router.put('/:id', updatePost)

router.delete('/:id', deletePost)

module.exports = router