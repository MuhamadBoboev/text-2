import { createSlice } from '@reduxjs/toolkit'

interface SignInState {
  isOpen: boolean
  method: 'password' | 'code'
}

const initialState: SignInState = {
  isOpen: false,
  method: 'code',
}

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
    modalSignInOpen(state) {
      state.isOpen = true
    },
    modalSignInClose(state) {
      state.isOpen = false
    },
    modalSignInToggle(state) {
      state.isOpen = !state.isOpen
    },
    modalSignInPassword(state) {
      state.method = 'password'
    },
    modalSignInCode(state) {
      state.method = 'code'
    },
    modalSignInMethodToggle(state) {
      state.method = state.method === 'code' ? 'password' : 'code'
    },
  },
})

export const {
  modalSignInPassword,
  modalSignInClose,
  modalSignInToggle,
  modalSignInCode,
  modalSignInOpen,
  modalSignInMethodToggle,
} = signInSlice.actions

export default signInSlice.reducer
