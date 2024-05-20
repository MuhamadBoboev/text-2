import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStore, IStoreCategory } from '@models/IStore'

interface ModalCallState {
  isOpen: boolean
  stores: IStoreCategory[] | null
}

const initialState: ModalCallState = {
  isOpen: false,
  stores: null,
}

export const fetchStores = createAsyncThunk('modalCall', async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/web/stores`,
    )
    const stores: { data: IStoreCategory[] } = await response.json()
    return stores.data
  } catch (e) {
    return null
  }
})

export const modalCallSlice = createSlice({
  name: 'modalCall',
  initialState,
  reducers: {
    modalCallToggle(state) {
      state.isOpen = !state.isOpen
    },
    modalCallOpen(state) {
      state.isOpen = true
    },
    modalCallClose(state) {
      state.isOpen = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchStores.fulfilled,
      (store, action: PayloadAction<IStoreCategory[] | null>) => {
        store.stores = action.payload
      },
    )
  },
})

export const { modalCallToggle, modalCallClose, modalCallOpen } =
  modalCallSlice.actions

export default modalCallSlice.reducer
