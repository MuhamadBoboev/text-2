import { AppState } from '@store/store'

export const selectFavorites = (state: AppState) => state.favorite
export const selectFavoritesProducts = (state: AppState) =>
  state.favorite.products
export const selectFavoritesProductsLength = (state: AppState) =>
  state.favorite.products.length
