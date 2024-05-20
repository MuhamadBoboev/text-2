import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@models/IUser'
import { UserAuthResponse } from '../../interfaces/UserAuthResponse'
import { Headers } from 'next/dist/compiled/@edge-runtime/primitives/fetch'
import axios from 'axios'

interface UserState {
  user: IUser | null
  token: string | null
  status: 'fulfilled' | 'pending' | 'rejected' | 'normal'
}

const initialState: UserState = {
  user: null,
  token: null,
  status: 'normal',
}

export const userAuth = createAsyncThunk(
  'user/auth',
  async (result: UserAuthResponse) => {
    // localStorage.setItem('user', JSON.stringify(result.user))
    localStorage.setItem('token', result.token)

    return result
  },
)

export const checkUserAuth = createAsyncThunk('user/checkAuth', async () => {
  const token: string | null = localStorage.getItem('token')
  if (token) {
    try {
      const requestOptions: RequestInit = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/web/me`,
        requestOptions,
      )
      const userResponse = await response.json()

      return userResponse.data
    } catch (e) {
      return null
    }
  }

  return null
})

export const userLogOut = createAsyncThunk('user/userLogOut', async () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      userAuth.fulfilled,
      (state, action: PayloadAction<UserAuthResponse>) => {
        state.user = action.payload.user
        state.token = action.payload.token
      },
    )
    builder.addCase(checkUserAuth.pending, (state) => {
      state.status = 'pending'
    })
    builder.addCase(checkUserAuth.rejected, (state) => {
      state.status = 'rejected'
    })
    builder.addCase(
      checkUserAuth.fulfilled,
      (state, action: PayloadAction<IUser | null>) => {
        state.status = 'fulfilled'
        state.user = action.payload
      },
    )
    builder.addCase(userLogOut.fulfilled, (state) => {
      state.user = null
    })
  },
})
