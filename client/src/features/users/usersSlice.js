import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersService from './usersService'

const initialState = {
  users: {
    users: [],
    posts: [],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const searchUsers = createAsyncThunk(
  'users/search',
  async (search, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await usersService.searchUsers(search, token)
    } catch (error) {
      const message = 
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userPosts = createAsyncThunk(
  'users/posts',
  async (id, thunkAPI) => {
    try {
      // console.log('in userslice')
      const token = thunkAPI.getState().auth.user.token
      return await usersService.userPosts(id, token)
    } catch (error) {
      const message = (
        error.response && 
        error.response.data &&
        error.response.data.message 
      ) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(searchUsers.pending, (state) => {
      state.isLoading = true
    })
    .addCase(searchUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.users.users.push(action.payload)
    })
    .addCase(searchUsers.rejected, (state, action ) => {
      state.isLoading = false
      state.isError = true
      state.users = action.payload
    })
    .addCase(userPosts.pending, (state) => {
      state.isLoading = true
    })
    .addCase(userPosts.fulfilled, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.users.posts.push(action.payload)
    })
    .addCase(userPosts.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.users = action.payload
    })
  }
})

export const { reset } = usersSlice.actions
export default usersSlice.reducer