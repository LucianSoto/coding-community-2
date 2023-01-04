const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, 'Please add first name'],
    },
    lastname: {
      type: String,
      required: [true, 'Please add last name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    profilePicture: {
      type: String,
      default: ''
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
// user(s) schema on mongo atlas under the skillspire cluster/db