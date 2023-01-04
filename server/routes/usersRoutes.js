const express = require('express')
const router = express.Router()
const {
  searchUsers,
} = require('../controllers/usersController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect, searchUsers)
// not actually id butname instead
module.exports = router