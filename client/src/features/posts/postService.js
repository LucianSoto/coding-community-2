import axios from 'axios'

// can use process.env as well to hide route. or use proxy
const API_URL = 'http://localhost:9000/api/posts/'

// Create new goal
const createPost = async (postData, token) => {
  console.log(postData, token, 'in service')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, postData, config)
  // console.log(response)
  return response.data
}

// get feed
const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user goal
const deletePost = async (postId, token) => {
  // console.log(postId, token, 'in service')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(API_URL + postId, config)
  return response.data
}

const editPost = async (postData, token) => {
  console.log(postData, 'in edit')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
    const response = await axios.put(`${API_URL}/${postData._id}`, postData, config)
    return response.data
}

const postService = {
  createPost,
  getPosts,  
  editPost,
  // get feed
  deletePost,
}

export default postService
