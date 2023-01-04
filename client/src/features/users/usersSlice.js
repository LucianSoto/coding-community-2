import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import usersService from './usersService'

const initialState = {
  users: [],
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
      state.users = (action.payload.map(user => user))
    })
    .addCase(searchUsers.rejected, (state, action ) => {
      state.isLoading = false
      state.isError = true
      state.users = action.payload
    })
  }
})

export const { reset } = usersSlice.actions
export default usersSlice.reducer