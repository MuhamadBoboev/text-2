import { createSlice } from '@reduxjs/toolkit'

interface ForgotPasswordSlice {
  isOpen: boolean
}

const initialState: ForgotPasswordSlice = {
  isOpen: false,
}

export const forgotPasswordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    openForgotPassword(state) {
      state.isOpen = true
    },
    closeForgotPassword(state) {
      state.isOpen = false
    },
    toggleForgotPassword(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const { openForgotPassword, closeForgotPassword, toggleForgotPassword } =
  forgotPasswordSlice.actions
