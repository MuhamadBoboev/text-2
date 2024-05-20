import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SecondCategoryState {
  isOpen: boolean
  activeCategoryId: number | null
  activeSubCategory: number | null
}

const initialState: SecondCategoryState = {
  isOpen: false,
  activeCategoryId: null,
  activeSubCategory: null,
}

export const secondCategorySlice = createSlice({
  name: 'secondCategory',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<number>) {
      if (action.payload === state.activeCategoryId) {
        state.isOpen = false
        state.activeCategoryId = null
      } else {
        state.isOpen = true
        state.activeCategoryId = action.payload
      }
    },
    open(state, action: PayloadAction<number>) {
      state.isOpen = true
      state.activeCategoryId = action.payload
    },
    close(state) {
      state.isOpen = false
      state.activeCategoryId = null
    },
    clearState(state) {},
  },
})
