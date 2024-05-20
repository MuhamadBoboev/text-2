import { createSlice } from '@reduxjs/toolkit'

interface SignUpState {
  isOpen: boolean
}

const initialState: SignUpState = {
  isOpen: false,
}

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    modalSignUpOpen(state) {
      state.isOpen = true
    },
    modalSignUpClose(state) {
      state.isOpen = false
    },
    modalSignUpToggle(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const { modalSignUpOpen, modalSignUpClose, modalSignUpToggle } =
  signUpSlice.actions

export default signUpSlice.reducer
