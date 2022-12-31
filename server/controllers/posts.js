const getPosts = (req, res) => {
  res.status(200).json({ message: 'Get goals'})
}

const setPost = (req, res) => {

  req.status(200).json({ message: 'setgoal'})
}

const updatePost = (req, res) => {
  console.log(req.body)
}

const deletePost = (req, res) => {
  console.log(req.body)
}
module.exports = { getPosts, setPost, updatePost, deletePost }