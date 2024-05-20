import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  CartLocalKey,
  CartLocalState,
  ProductCartState,
} from '@store/reducers/cartSlice/index'
import { calculateDiscount } from '@utils/helpers/calculateDiscount/calculateDiscount'
import { getProduct, getProductById } from '@utils/requests/getProduct'
import { sortObjectKeys } from '@utils/helpers/sortObjectKeys'

// Получить товаров из LocalStorage
export const getProductFromLocalStorage = (): CartLocalState => {
  const productsRaw = localStorage.getItem('cart')
  if (productsRaw) {
    deleteDeprecatedCartApiItems(productsRaw)
  }
  if (productsRaw) return JSON.parse(productsRaw)
  return {}
}

/**  for new api in cart */
export const deleteDeprecatedCartApiItems = (productsRaw: string) => {
  const localProducts: CartLocalState = JSON.parse(productsRaw)
  Object.keys(localProducts).forEach((key) => {
    try {
      JSON.parse(key)
    } catch (e) {
      delete localProducts[key]
    }
  })
  localStorage.setItem('cart', JSON.stringify(localProducts))
}

export const changeQuantityLocalStorage = (
  key: CartLocalKey,
  quantity: number,
) => {
  const productsRaw = localStorage.getItem('cart')
  const rawKey = JSON.stringify(key)
  if (productsRaw) {
    const products = JSON.parse(productsRaw)
    if (products[rawKey]) {
      products[rawKey] = quantity
    }
    localStorage.setItem('cart', JSON.stringify(products))
  }
}
export const changeAttributesLocalStorage = (
  slug: string,
  attributes: {
    selectedVolume?: number
    selectedSize?: number
    selectedColor?: number
  },
) => {
  const productsRaw = localStorage.getItem('cart')
  if (productsRaw) {
    const products = JSON.parse(productsRaw)
    if (products[slug]) {
      products[slug] = {
        ...products[slug],
        ...attributes,
      }
    }
    localStorage.setItem('cart', JSON.stringify(products))
  }
}

// Добавления или изменения товара в localStorage
export const addToLocalStorage = (product: ProductCartState) => {
  const productsRaw = localStorage.getItem('cart')
  let localProducts: CartLocalState
  const productKey: CartLocalKey = sortObjectKeys({
    id: product.id,
    selectedSize: product.selectedSize,
    selectedVolume: product.selectedVolume,
    selectedColor: product.selectedColor,
  })
  const rawKey = JSON.stringify(productKey)
  if (productsRaw) {
    localProducts = JSON.parse(productsRaw)
    localProducts[rawKey] = product.selectedQuantity
  } else {
    localProducts = {
      [rawKey]: product.selectedQuantity,
    }
  }

  localStorage.setItem('cart', JSON.stringify(localProducts))

  return true
}

// Удаления вариаций из localStorage
export const removeFromLocalStorage = (key: CartLocalKey) => {
  const productsRaw = localStorage.getItem('cart')
  let localProducts: CartLocalState = {}
  if (productsRaw) {
    localProducts = JSON.parse(productsRaw)
    delete localProducts[JSON.stringify(key)]
  }
  localStorage.setItem('cart', JSON.stringify(localProducts))
}

// Удаления товара из localStorage
export const removeProductFromLocalStorage = (id: number) => {
  const productsRaw = localStorage.getItem('cart')
  let localProducts: CartLocalState = {}
  if (productsRaw) {
    localProducts = JSON.parse(productsRaw)
    Object.keys(localProducts).forEach((key) => {
      const cartKey: CartLocalKey = JSON.parse(key)
      if (cartKey.id === id) {
        delete localProducts[key]
      }
    })
    // delete localProducts[JSON.stringify(key)]
  }
  localStorage.setItem('cart', JSON.stringify(localProducts))
}

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product: ProductCartState) => {
    const cartProduct: ProductCartState = {
      ...product,
      selectedQuantity: product.selectedQuantity,
      selectedColor: product.selectedColor,
      selectedSize: product.selectedSize,
      selectedVolume: product.selectedVolume,
    }

    addToLocalStorage(cartProduct)
    return cartProduct
  },
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (key: CartLocalKey) => {
    removeFromLocalStorage(key)
    return key
  },
)

export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async (id: number) => {
    removeProductFromLocalStorage(id)
    return id
  },
)

export const changeQuantityProductCart = createAsyncThunk(
  'cart/changeQuantityProduct',
  async ({ key, quantity }: { key: CartLocalKey; quantity: number }) => {
    changeQuantityLocalStorage(key, quantity)
    return { key, quantity }
  },
)

export const changeAttributesProductCart = createAsyncThunk(
  'cart/changeAttributesProduct',
  async ({
    slug,
    attributes,
  }: {
    slug: string
    attributes: {
      selectedVolume?: number
      selectedSize?: number
      selectedColor?: number
    }
  }) => {
    changeAttributesLocalStorage(slug, attributes)
    return { slug, attributes }
  },
)

// Очистить корзину
export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  localStorage.setItem('cart', '{}')
})

// Для получения цены без скидки

export function calculateTotalPrice(products: ProductCartState[]) {
  return products.reduce((totalPrice: number, product) => {
    const volumes = product.attributes.filter(
      (attribute) => attribute.type.slug === 'obyom',
    )
    const sizes = product.attributes.filter(
      (attribute) => attribute.type.slug === 'size',
    )
    const colors = product.attributes.filter(
      (attribute) => attribute.type.slug === 'color',
    )

    const volume = volumes.find(
      (attribute) => attribute.id === product.selectedVolume,
    )
    const size = sizes.find(
      (attribute) => attribute.id === product.selectedSize,
    )
    const color = colors.find(
      (attribute) => attribute.id === product.selectedColor,
    )

    return (
      totalPrice +
      (size?.price || color?.price || volume?.price || product.price) *
        product.selectedQuantity
    )
  }, 0)
}

// Для получения цены скидки

export function calculateDiscountPrice(products: ProductCartState[]) {
  const totalPrice = calculateTotalPrice(products)
  const totalDiscountPrice = calculateTotalPriceWithDiscount(products)

  return +(totalPrice - totalDiscountPrice).toFixed(2)
}

// Для получения цены со скидкой

export function calculateTotalPriceWithDiscount(products: ProductCartState[]) {
  return products.reduce((totalDiscountPrice: number, product) => {
    const volumes = product.attributes.filter(
      (attribute) => attribute.type.slug === 'obyom',
    )
    const sizes = product.attributes.filter(
      (attribute) => attribute.type.slug === 'size',
    )
    const colors = product.attributes.filter(
      (attribute) => attribute.type.slug === 'color',
    )

    const volume = volumes.find(
      (attribute) => attribute.id === product.selectedVolume,
    )
    const size = sizes.find(
      (attribute) => attribute.id === product.selectedSize,
    )
    const color = colors.find(
      (attribute) => attribute.id === product.selectedColor,
    )

    return +(
      totalDiscountPrice +
      calculateDiscount(
        size?.price || color?.price || volume?.price || product.price,
        product.discount_percent || 0,
      ) *
        product.selectedQuantity
    ).toFixed(2)
  }, 0)
}

export const fetchProductsCart = createAsyncThunk(
  'cart/fetchProductsCart',
  async () => {
    const cartProducts = getProductFromLocalStorage()
    const products: ProductCartState[] = []

    for (let rawKey in cartProducts) {
      const productKey: CartLocalKey = JSON.parse(rawKey)
      const productData = await getProductById(productKey.id, true)
      const product = productData?.data
      if (product) {
        // const localProduct = cartProducts[product.slug]

        const volumes = product.attributes.filter(
          (attribute) => attribute.type.slug === 'obyom',
        )
        const sizes = product.attributes.filter(
          (attribute) => attribute.type.slug === 'size',
        )
        const colors = product.attributes.filter(
          (attribute) => attribute.type.slug === 'color',
        )

        const volume = volumes.find(
          (attribute) => attribute.id === productKey.selectedVolume,
        )
        const size = sizes.find(
          (attribute) => attribute.id === productKey.selectedSize,
        )
        const color = colors.find(
          (attribute) => attribute.id === productKey.selectedColor,
        )

        const checkQuantity = () => {
          if (volume || color || size) {
            // @ts-ignore
            return (
              (volume?.quantity || color?.quantity || size?.quantity || false) >
              0
            )
          } else {
            return product.quantity > 0
          }
        }
        console.log(checkQuantity())

        const selectedQuantity = cartProducts[rawKey]

        if (checkQuantity()) {
          products.push({
            ...product,
            selectedQuantity:
              selectedQuantity >
              (color?.quantity ||
                size?.quantity ||
                volume?.quantity ||
                product.quantity ||
                product.quantity)
                ? color?.quantity ||
                  size?.quantity ||
                  volume?.quantity ||
                  product.quantity ||
                  product.quantity
                : selectedQuantity,
            selectedVolume: productKey.selectedVolume,
            selectedSize: productKey.selectedSize,
            selectedColor: productKey.selectedColor,
          })
        }
      }
    }

    return products
  },
)
