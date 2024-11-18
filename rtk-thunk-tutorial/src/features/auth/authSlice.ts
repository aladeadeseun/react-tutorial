import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { client } from '../../api/client'

import { RootState } from '../../app/store'
import { createAppAsyncThunk } from '../../app/withTypes'
import { getUrl } from '../../util'

interface AuthState {
  username: string | null
}

export const login = createAppAsyncThunk(
  'auth/login',
  async (username: string) => {
    await client.post(getUrl("/posts/auth/login"), { username })
    return username
  }
)

export const logout = createAppAsyncThunk('auth/logout', async () => {
  await client.get('/posts/auth/logout', {})
})

const initialState: AuthState = {
  // Note: a real app would probably have more complex auth state,
  // but for this example we'll keep things simple
  username: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // Remove the reducer definitions
  reducers: {
    userLoggedIn(state, {payload}:PayloadAction<string>){
      state.username = payload
    }
  },
  extraReducers: builder => {
    // and handle the thunk actions instead
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload
      })
      .addCase(logout.fulfilled, state => {
        state.username = null
      })
  }
})

// Removed the exported actions

export default authSlice.reducer

export const selectCurrentUsername = (state: RootState)=>state.auth.username

export const {userLoggedIn} = authSlice.actions