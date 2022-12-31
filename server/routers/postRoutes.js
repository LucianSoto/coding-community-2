const express = require('express')
const router  = express.Router()
const {  
  getPosts
} = require(require('../controllers/posts'))

router.get('/', getPosts)

router.post('/', setPost)

router.put('/:id', updatePost)

router.delete('/:id', deletePost)