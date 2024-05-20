import { IProduct } from '@models/product/IProduct'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface SearchSliceState {
  isOpen: boolean
  products: null | IProduct[]
  status: 'fulfilled' | 'pending' | 'rejected'
}

const initialState: SearchSliceState = {
  isOpen: false,
  products: null,
  status: 'fulfilled',
}

export const fetchQueryProducts = createAsyncThunk(
  'search/fetchQueryProducts',
  async (q: string): Promise<{ data: IProduct[] }> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?per_page=10&q=${q}`,
    )
    return response.json()
  },
)

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    openSearch(state) {
      state.isOpen = true
    },
    closeSearch(state) {
      state.isOpen = false
    },
    toggleSearch(state) {
      state.isOpen = !state.isOpen
    },
    clearSearchProducts(state) {
      state.products = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQueryProducts.fulfilled, (state, action) => {
      state.products = action.payload.data
      state.status = 'fulfilled'
    })
    builder.addCase(fetchQueryProducts.pending, (state) => {
      state.status = 'pending'
    })
    builder.addCase(fetchQueryProducts.rejected, (state) => {
      state.status = 'rejected'
    })
  },
})

export const { openSearch, clearSearchProducts, closeSearch, toggleSearch } =
  searchSlice.actions
