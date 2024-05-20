import { IProduct } from '@models/product/IProduct'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  addToFavorite,
  fetchProductsFavorite,
  removeFromFavorite,
} from '@store/reducers/favoriteSlice/helpers'

interface FavoriteState {
  products: IProduct[]
}

const initialState: FavoriteState = {
  products: [],
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    // addProductToFavorites(state, action: PayloadAction<IProduct>) {
    //   if (!state.products.some(product => product.id === action.payload.id)) {
    //     state.products.push(action.payload)
    //   }
    // },
    // removeProductInFavorites(state, action: PayloadAction<number>) {
    //   state.products = state.products.filter(product => product.id !== action.payload)
    // },
    // clearProductsInFavorites(state) {
    //   state.products = []
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(
      addToFavorite.fulfilled,
      (state, action: PayloadAction<IProduct>) => {
        if (
          state.products.every((product) => product.id !== action.payload.id)
        ) {
          state.products.push(action.payload)
        }
      },
    )
    builder.addCase(
      removeFromFavorite.fulfilled,
      (state, action: PayloadAction<string>) => {
        const index = state.products.findIndex(
          (product) => product.slug === action.payload,
        )

        if (index > -1) {
          state.products.splice(index, 1)
        }
      },
    )

    builder.addCase(
      fetchProductsFavorite.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload
      },
    )
  },
})

export default favoriteSlice.reducer
