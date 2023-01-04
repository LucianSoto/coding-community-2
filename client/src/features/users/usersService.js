import axios from 'axios'

// can use process.env as well to hide route. or use proxy
const API_URL = 'http://localhost:9000/api/users/'

const searchUsers = async (search, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, {search: search}, config)
  // condition depending on response
  return response.data.data
}

const userPosts = async (id, token) => {
  console.log('in userposts service')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + `${id}`, config )
  console.log(response.data, 'at userposts service')
  return response.data
}

const usersService = {
  searchUsers,
  userPosts,
}

export default usersService