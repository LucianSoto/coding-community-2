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
  console.log(response.data.data,' in service')
  return response.data.data
}

const usersService = {
  searchUsers,
}

export default usersService