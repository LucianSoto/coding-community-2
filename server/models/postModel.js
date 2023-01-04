const mongoose = require('mongoose')

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: false,
    },
    imgUrls: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
 
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Post', postSchema)
// Posts with an S colleciton not Post