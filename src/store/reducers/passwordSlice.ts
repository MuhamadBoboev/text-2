import { createSlice } from '@reduxjs/toolkit'

interface PasswordSliceState {
  isOpen: boolean
}

const initialState: PasswordSliceState = {
  isOpen: false,
}

export const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    openPassword(state) {
      state.isOpen = true
    },
    closePassword(state) {
      state.isOpen = false
    },
    togglePassword(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const { openPassword, closePassword, togglePassword } =
  passwordSlice.actions
