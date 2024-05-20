import { createSlice } from '@reduxjs/toolkit'

interface FilterSliceState {
  isOpen: boolean
}

const initialState: FilterSliceState = {
  isOpen: false,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    openFilter(state) {
      state.isOpen = true
    },
    closeFilter(state) {
      state.isOpen = false
    },
    toggleFilter(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const { openFilter, closeFilter, toggleFilter } = filterSlice.actions
