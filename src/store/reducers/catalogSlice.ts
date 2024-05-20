import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICatalogMenu } from '@models/ICatalogMenu'

interface CatalogState {
  isOpen: boolean
  catalog: ICatalogMenu[] | null
}

export const initialState: CatalogState = {
  isOpen: false,
  catalog: null,
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCatalogData(state, action: PayloadAction<ICatalogMenu[] | null>) {
      state.catalog = action.payload || null
    },
    openCatalog(state) {
      state.isOpen = true
    },
    toggleCatalog(state) {
      state.isOpen = !state.isOpen
    },
    closeCatalog(state) {
      state.isOpen = false
    },
  },
})

export const { openCatalog, setCatalogData, closeCatalog, toggleCatalog } =
  catalogSlice.actions
