import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postSlice'
import usersReducer from '../features/users/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    users: usersReducer,
  },
})
