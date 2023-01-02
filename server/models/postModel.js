const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    likes: {
      type: Array,
      default: [],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', postSchema)
// Posts with an S colleciton not Post