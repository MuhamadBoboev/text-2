import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'
import { IBrowsedProduct } from '@models/IBrowsedProduct'

import { IProduct } from '@models/product/IProduct'

interface BrowsedState {
  products: IBrowsedProduct[]
}

const initialState: BrowsedState = {
  products: [],
}

export const fetchProduct = createAsyncThunk(
  'browsed/fetchProduct',
  async (slug: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`,
    )
    const product = await response.json()
    return product.data
  },
)

export const browseProduct = createAsyncThunk(
  'browsed/browseProduct',
  async (product: IProduct) => {
    const localProductsString = localStorage.getItem('browsed')
    let resultBrowsed: { date: number; slug: string }[] = []

    const date = Date.now()

    if (localProductsString) {
      resultBrowsed = JSON.parse(localProductsString)
      const index = resultBrowsed.findIndex(({ slug }) => slug === product.slug)
      if (index === -1) {
        resultBrowsed.push({ slug: product.slug, date })
      } else {
        resultBrowsed[index] = { slug: product.slug, date }
      }
      resultBrowsed.sort((a, b) => (a.date < b.date ? 1 : -1))
      if (resultBrowsed.length >= 12) {
        resultBrowsed.length = 12
      }
    } else {
      resultBrowsed.push({ slug: product.slug, date })
    }
    localStorage.setItem('browsed', JSON.stringify(resultBrowsed))

    return { ...product, browsedDate: date }
  },
)

export const getBrowsedProducts = createAsyncThunk(
  'browsed/getBrowsedProducts',
  async () => {
    const browsedProductsString = localStorage.getItem('browsed')
    const products: IBrowsedProduct[] = []

    if (browsedProductsString) {
      const localProducts: { date: number; slug: string }[] = JSON.parse(
        browsedProductsString,
      )

      for (const browsed of localProducts) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/product/${browsed.slug}`,
          )
          const productData: { data: IProduct } = await response.json()
          const product = productData.data

          if (!products.some(({ slug }) => slug === product.slug)) {
            products.push({ ...product, browsedDate: browsed.date })
          }
        } catch (e) {}
      }
    }

    return products
  },
)

export const browsedSlice = createSlice({
  name: 'browsed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getBrowsedProducts.fulfilled,
      (state, action: PayloadAction<IBrowsedProduct[]>) => {
        state.products = action.payload
      },
    )

    builder.addCase(
      browseProduct.fulfilled,
      (state, action: PayloadAction<IBrowsedProduct>) => {
        const index = state.products.findIndex(
          (product) => product.slug === action.payload.slug,
        )
        let sortedProduct: IBrowsedProduct[] = JSON.parse(
          JSON.stringify(state.products),
        )

        if (index === -1) {
          sortedProduct.push(action.payload)
        } else {
          sortedProduct[index] = action.payload
        }

        sortedProduct.sort((a, b) => (a.browsedDate < b.browsedDate ? 1 : -1))
        if (sortedProduct.length >= 12) {
          sortedProduct.length = 12
        }
        state.products = sortedProduct
      },
    )
  },
})

export default browsedSlice.reducer
