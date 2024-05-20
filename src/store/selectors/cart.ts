import { AppState } from '@store/store'

export const selectCart = (state: AppState) => state.cart
export const selectCartProducts = (state: AppState) => state.cart.products
export const selectCartProductsLength = (state: AppState) =>
  state.cart.products.length
