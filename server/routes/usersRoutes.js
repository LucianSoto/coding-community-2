const express = require('express')
const router = express.Router()
const {
  searchUsers,
  userPosts,
} = require('../controllers/usersController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, searchUsers)
router.route('/:id').get(protect, userPosts)
// not actually id butname instead
module.exports = router