const express = require('express')
const router  = express.Router()
const {  
  getPosts,
  setPost,
  deletePost,
  editPost,
} = require('../controllers/postsController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPosts).post(protect, setPost)
router.route('/:id').delete(protect, deletePost).put(protect, editPost)

module.exports = router