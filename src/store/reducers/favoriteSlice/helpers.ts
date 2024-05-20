// Получить товаров из LocalStorage

import { createAsyncThunk } from '@reduxjs/toolkit'
import { IProduct } from '@models/product/IProduct'
import { getProduct } from '@utils/requests/getProduct'

export const getProductFromLocalStorage = (): string[] => {
  const productsRaw = localStorage.getItem('favorites')
  if (productsRaw) return JSON.parse(productsRaw)
  return []
}

// Добавления или изменения товара в localStorage
export const addToLocalStorage = (slug: string) => {
  const productsRaw = localStorage.getItem('favorites')
  let localProducts: string[]
  if (productsRaw) {
    localProducts = JSON.parse(productsRaw)
    if (!localProducts.includes(slug)) {
      localProducts.push(slug)
    }
  } else {
    localProducts = [slug]
  }

  localStorage.setItem('favorites', JSON.stringify(localProducts))
}

// Удаления товара из localStorage
export const removeFromLocalStorage = (slug: string) => {
  const productsRaw = localStorage.getItem('favorites')
  let localProducts: string[] = []
  if (productsRaw) {
    localProducts = JSON.parse(productsRaw)
    const index = localProducts.findIndex((product) => product === slug)
    if (index > -1) {
      localProducts.splice(index, 1)
    }
  }
  localStorage.setItem('favorites', JSON.stringify(localProducts))
}

export const addToFavorite = createAsyncThunk(
  'favorite/addToFavorite',
  async (product: IProduct) => {
    addToLocalStorage(product.slug)
    return product
  },
)

export const removeFromFavorite = createAsyncThunk(
  'favorite/removeFromFavorite',
  async (slug: string) => {
    removeFromLocalStorage(slug)
    return slug
  },
)

export const fetchProductsFavorite = createAsyncThunk(
  'favorite/fetchProductsFavorite',
  async () => {
    const favoriteProducts: string[] = getProductFromLocalStorage()
    const products: IProduct[] = []

    for (let localSlug of favoriteProducts) {
      const productData = await getProduct(localSlug, true)
      const product = productData?.data
      if (product) {
        products.push(product)
      }
    }

    return products
  },
)
