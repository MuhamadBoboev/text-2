import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrder } from '@models/IOrder'

interface ModalOrderState {
  isOpen: boolean
  order: IOrder | null
}

const initialState: ModalOrderState = {
  isOpen: false,
  order: null,
}

export const modalOrderSlice = createSlice({
  name: 'modalOrder',
  initialState,
  reducers: {
    modalOrderToggle(state, action: PayloadAction<IOrder>) {
      if (state.isOpen) {
        // state.order = null
      } else {
        state.order = action.payload
      }
      state.isOpen = !state.isOpen
    },
    modalOrderOpen(state, action: PayloadAction<IOrder>) {
      state.isOpen = true
      state.order = action.payload
    },
    modalOrderClose(state) {
      state.isOpen = false
      // state.order = null
    },
    modalOrderClear(state) {
      state.order = null
    },
  },
})

export const {
  modalOrderToggle,
  modalOrderClose,
  modalOrderOpen,
  modalOrderClear,
} = modalOrderSlice.actions

export default modalOrderSlice.reducer
