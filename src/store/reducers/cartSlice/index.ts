import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct } from '@models/product/IProduct'
import {
  addToCart,
  calculateDiscountPrice,
  calculateTotalPrice,
  calculateTotalPriceWithDiscount,
  changeAttributesProductCart,
  changeQuantityProductCart,
  clearCart,
  fetchProductsCart,
  removeFromCart,
  removeProductFromCart,
} from '@store/reducers/cartSlice/helpers'
import { IUser } from '@models/IUser'
import { IPromoCode } from '@models/IPromoCode'
import { sortObjectKeys } from '@utils/helpers/sortObjectKeys'

export interface ProductCartState extends IProduct {
  selectedQuantity: number
  selectedSize?: number
  selectedColor?: number
  selectedVolume?: number
}

export interface CartState {
  isOpen: boolean
  pages: {
    main: boolean
    delivery: boolean
    confirm: boolean
    payment: boolean
    shop: boolean
    cashPayment: boolean
    onlinePayment: boolean
    methodOnlinePayment: boolean
    qrPayment: boolean
    fetch: boolean
  }
  data: {
    address?: string
    paymentMethod?: string
    paymentMethodId?: number
    delivery?: string
    shop?: string
    comment?: string
    promoCode?: IPromoCode
  } | null
  userData: IUser | null
  status: 'pending' | 'normal'
  products: ProductCartState[]
  totalPrice: number
  totalDiscountPrice: number
  totalPriceWithDiscount: number
}

// Тип данных для корзины для localStorage
export interface CartLocalKey {
  id: number
  selectedSize?: number
  selectedColor?: number
  selectedVolume?: number
}

export interface CartLocalState {
  /** @CartLocalKey */
  [key: string]: number
}

const initialState: CartState = {
  isOpen: false,
  pages: {
    main: true,
    delivery: false,
    confirm: false,
    payment: false,
    cashPayment: false,
    qrPayment: false,
    onlinePayment: false,
    methodOnlinePayment: false,
    shop: false,
    fetch: false,
  },
  data: null,
  userData: null,
  status: 'normal',
  products: [],
  totalPrice: 0,
  totalDiscountPrice: 0,
  totalPriceWithDiscount: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
    closeCart(state) {
      state.isOpen = false
    },
    openCart(state) {
      state.isOpen = true
    },
    toCartMain(state) {
      state.pages = {
        main: true,
        delivery: false,
        payment: false,
        qrPayment: false,
        cashPayment: false,
        confirm: false,
        onlinePayment: false,
        methodOnlinePayment: false,
        shop: false,
        fetch: false,
      }
    },
    toCartDelivery(state) {
      state.pages = {
        main: false,
        delivery: true,
        payment: false,
        qrPayment: false,
        cashPayment: false,
        confirm: false,
        onlinePayment: false,
        methodOnlinePayment: false,
        shop: false,
        fetch: false,
      }
    },
    toCartPayment(state) {
      state.pages = {
        main: false,
        delivery: false,
        payment: true,
        qrPayment: false,
        cashPayment: false,
        methodOnlinePayment: false,
        confirm: false,
        onlinePayment: false,
        shop: false,
        fetch: false,
      }
    },
    toCartMethodOnlinePayment(state) {
      state.pages = {
        main: false,
        delivery: false,
        payment: false,
        qrPayment: false,
        cashPayment: false,
        methodOnlinePayment: true,
        confirm: false,
        onlinePayment: false,
        shop: false,
        fetch: false,
      }
    },
    setDeliveryAddress(state, action: PayloadAction<string>) {
      state.data = {
        ...state.data,
        address: action.payload,
      }
    },
    setPromoCode(state, action: PayloadAction<IPromoCode | undefined>) {
      state.data = {
        ...state.data,
        promoCode: action.payload,
      }
    },
    toCartConfirm(state) {
      state.pages = {
        main: false,
        delivery: false,
        payment: false,
        qrPayment: false,
        cashPayment: false,
        confirm: true,
        onlinePayment: false,
        methodOnlinePayment: false,
        shop: false,
        fetch: false,
      }
    },
    toCartCashPayment(state) {
      state.pages = {
        main: false,
        delivery: false,
        payment: false,
        qrPayment: false,
        cashPayment: true,
        confirm: false,
        onlinePayment: false,
        methodOnlinePayment: false,
        shop: false,
        fetch: false,
      }
    },

    toCartQrPayment(state) {
      state.pages = {
        main: false,
        delivery: false,
        payment: false,
        qrPayment: true,
        cashPayment: false,
        confirm: false,
        onlinePayment: false,
        methodOnlinePayment: false,
        shop: false,
        fetch: false,
      }
    },
    toCartOnlinePayment(state) {
      state.pages = {
        main: false,
        delivery: false,
        payment: false,
        qrPayment: false,
        cashPayment: false,
        confirm: false,
        onlinePayment: true,
        methodOnlinePayment: false,
        shop: false,
        fetch: false,
      }
    },
    toCartShop(state) {
      state.pages = {
        main: false,
        delivery: false,
        qrPayment: false,
        payment: false,
        cashPayment: false,
        confirm: false,
        onlinePayment: false,
        methodOnlinePayment: false,
        shop: true,
        fetch: false,
      }
      //
      // state.data = {
      //   address: '',
      //   shop: action.payload
      // }
    },
    selectShop(state, action: PayloadAction<string>) {
      state.data = {
        ...state.data,
        shop: action.payload,
      }
    },
    selectDelivery(state, action: PayloadAction<string>) {
      state.data = {
        ...state.data,
        delivery: action.payload,
      }
    },
    setUserData(state, action: PayloadAction<IUser>) {
      state.userData = action.payload
    },
    clearCartState(state) {
      state.pages = {
        main: true,
        payment: false,
        delivery: false,
        qrPayment: false,
        cashPayment: false,
        confirm: false,
        methodOnlinePayment: false,
        onlinePayment: false,
        shop: false,
        fetch: false,
      }
      if (state.data) {
        state.data.delivery = undefined
        state.data.promoCode = undefined
      }
    },
    toCartFetch(state) {
      state.pages = {
        main: false,
        payment: false,
        qrPayment: false,
        delivery: false,
        cashPayment: false,
        confirm: false,
        onlinePayment: false,
        methodOnlinePayment: false,
        shop: false,
        fetch: true,
      }
    },
    selectPaymentMethod(state, action: PayloadAction<number>) {
      state.data = {
        ...state.data,
        paymentMethodId: action.payload,
      }
    },
    selectDeliveryMethod(state, action: PayloadAction<string>) {
      state.data = {
        ...state.data,
        delivery: action.payload,
      }
    },
    setOrderComment(state, action: PayloadAction<string>) {
      state.data = {
        ...state.data,
        comment: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    //Добавления статуса
    builder.addCase(addToCart.pending, (state) => {
      state.status = 'pending'
    })
    builder.addCase(removeFromCart.pending, (state) => {
      state.status = 'pending'
    })

    // Добавления товара в корзину
    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<ProductCartState>) => {
        state.status = 'normal'
        const { payload } = action

        if (
          !state.products.find((product) => {
            const cartKey: CartLocalKey = sortObjectKeys({
              id: product.id,
              selectedVolume: product.selectedVolume,
              selectedColor: product.selectedColor,
              selectedSize: product.selectedSize,
            })

            const productKey: CartLocalKey = sortObjectKeys({
              id: payload.id,
              selectedVolume: payload.selectedVolume,
              selectedColor: payload.selectedColor,
              selectedSize: payload.selectedSize,
            })
            return JSON.stringify(cartKey) === JSON.stringify(productKey)
          })
        ) {
          state.products.unshift(action.payload)
        } else {
          const index = state.products.findIndex(
            (product) => product.id === action.payload.id,
          )
          if (index) {
            state.products[index] = action.payload
          }
        }
        state.totalPrice = calculateTotalPrice(state.products)
        state.totalDiscountPrice = calculateDiscountPrice(state.products)
        state.totalPriceWithDiscount = calculateTotalPriceWithDiscount(
          state.products,
        )
      },
    )

    //Удаления вариация из корзины
    builder.addCase(
      removeFromCart.fulfilled,
      (state, action: PayloadAction<CartLocalKey>) => {
        state.status = 'normal'

        const index = state.products.findIndex((product) => {
          const productKey: CartLocalKey = sortObjectKeys({
            id: product.id,
            selectedSize: product.selectedSize,
            selectedVolume: product.selectedVolume,
            selectedColor: product.selectedColor,
          })
          return JSON.stringify(productKey) === JSON.stringify(action.payload)
        })
        if (index !== -1) {
          // state.cart.push()
          state.products.splice(index, 1)
        }
        state.totalPrice = calculateTotalPrice(state.products)
        state.totalDiscountPrice = calculateDiscountPrice(state.products)
        state.totalPriceWithDiscount = calculateTotalPriceWithDiscount(
          state.products,
        )
      },
    )

    // Удаления товаров из корзины
    builder.addCase(
      removeProductFromCart.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.status = 'normal'

        const index = state.products.findIndex((product) => {
          return product.id === action.payload
        })
        if (index !== -1) {
          state.products.splice(index, 1)
        }
        state.totalPrice = calculateTotalPrice(state.products)
        state.totalDiscountPrice = calculateDiscountPrice(state.products)
        state.totalPriceWithDiscount = calculateTotalPriceWithDiscount(
          state.products,
        )
      },
    )

    //  Изменения количество товара
    builder.addCase(
      changeQuantityProductCart.fulfilled,
      (
        state,
        action: PayloadAction<{
          key: CartLocalKey
          quantity: number
        }>,
      ) => {
        const index = state.products.findIndex((product) => {
          const productKey: CartLocalKey = sortObjectKeys({
            id: product.id,
            selectedColor: product.selectedColor,
            selectedVolume: product.selectedVolume,
            selectedSize: product.selectedSize,
          })
          return (
            JSON.stringify(productKey) === JSON.stringify(action.payload.key)
          )
        })

        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            selectedQuantity: action.payload.quantity || 1,
          }
        }
        state.totalPrice = calculateTotalPrice(state.products)
        state.totalDiscountPrice = calculateDiscountPrice(state.products)
        state.totalPriceWithDiscount = calculateTotalPriceWithDiscount(
          state.products,
        )
      },
    )

    //  Изменения атритуб товара
    // builder.addCase(
    //   changeAttributesProductCart.fulfilled,
    //   (
    //     state,
    //     action: PayloadAction<{
    //       slug: string
    //       attributes: {
    //         selectedVolume?: number
    //         selectedSize?: number
    //         selectedColor?: number
    //       }
    //     }>,
    //   ) => {
    //     const index = state.products.findIndex(
    //       (product) => product.slug === action.payload.slug,
    //     )
    //
    //     if (index !== -1) {
    //       state.products[index] = {
    //         ...state.products[index],
    //         ...action.payload.attributes,
    //       }
    //     }
    //     state.totalPrice = calculateTotalPrice(state.products)
    //     state.totalDiscountPrice = calculateDiscountPrice(state.products)
    //     state.totalPriceWithDiscount = calculateTotalPriceWithDiscount(
    //       state.products,
    //     )
    //   },
    // )

    builder.addCase(
      fetchProductsCart.fulfilled,
      (state, action: PayloadAction<ProductCartState[]>) => {
        state.products = action.payload
        state.totalPrice = calculateTotalPrice(state.products)
        state.totalDiscountPrice = calculateDiscountPrice(state.products)
        state.totalPriceWithDiscount = calculateTotalPriceWithDiscount(
          state.products,
        )
      },
    )
    builder.addCase(clearCart.fulfilled, (state) => {
      state.products = []
      state.totalPrice = 0
      state.totalDiscountPrice = 0
      state.totalPriceWithDiscount = 0
    })
  },
})

export const {
  openCart,
  closeCart,
  toggleCart,
  toCartMain,
  toCartDelivery,
  toCartPayment,
  clearCartState,
  setUserData,
  toCartConfirm,
  toCartCashPayment,
  toCartOnlinePayment,
  toCartMethodOnlinePayment,
  toCartQrPayment,
  toCartShop,
  selectShop,
  toCartFetch,
  setDeliveryAddress,
  selectPaymentMethod,
  selectDeliveryMethod,
  setOrderComment,
  setPromoCode,
} = cartSlice.actions
