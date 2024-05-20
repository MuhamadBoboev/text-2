import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReactNode } from 'react'

interface HeaderState {
  icon: 'burger' | 'back'
  burgerClick: () => void
  onClick: () => void
}

const initialState: HeaderState = {
  icon: 'burger',
  burgerClick: () => {},
  onClick: () => {},
}

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    defaultButton(state) {
      state.icon = 'burger'
      state.onClick = state.burgerClick
    },
    initBurger(state, action: PayloadAction<() => void>) {
      state.icon = 'burger'
      state.burgerClick = action.payload
    },
  },
})

export const { defaultButton, initBurger } = headerSlice.actions

export default headerSlice.reducer
