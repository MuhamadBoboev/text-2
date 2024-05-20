import { createSlice } from '@reduxjs/toolkit'

interface ProfileSliceState {
  isOpen: boolean
}

const initialState: ProfileSliceState = {
  isOpen: false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    openProfile(state) {
      state.isOpen = true
    },
    closeProfile(state) {
      state.isOpen = false
    },
    toggleProfile(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const { openProfile, closeProfile, toggleProfile } = profileSlice.actions
