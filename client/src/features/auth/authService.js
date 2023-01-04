import axios from 'axios'

const API_URL = 'http://localhost:9000/api/auth/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    console.log(response.data, 'register user authservice')
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    // console.log(response.data)
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
}

export default authService
