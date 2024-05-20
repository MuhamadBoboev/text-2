import { IProduct } from '@models/product/IProduct'
import { IPromoCode } from '@models/IPromoCode'
import { ProductCartState } from '@store/reducers/cartSlice'
import { calculatePromoCodePrice } from '@utils/calculatePromoCodePrice'
import { calculateDiscount } from '@utils/helpers/calculateDiscount/calculateDiscount'

interface ProductWithPromoCode extends ProductCartState {
  withPromoCode: boolean
}

export function setPromoCodeForProducts(
  products: ProductCartState[],
  promoCode?: IPromoCode,
): ProductWithPromoCode[] {
  return products.map((product) => {
    let result: boolean
    result = !!promoCode?.main_categories.find(
      (mainCategory) =>
        product.categories_tree.main_category?.id === mainCategory.id,
    )
    if (!result) {
      result = !!promoCode?.categories.find(
        (category) => product.categories_tree.category?.id === category.id,
      )
    }
    if (!result) {
      result = Boolean(
        promoCode?.brands.some((brand) => brand.id === product.brand.id),
      )
    }
    // if (promoCode?.type === 'fixed') {
    //   if (promoCode.value <= (product.price * 2)) {
    //     result = false
    //   }
    // }
    return {
      ...product,
      withPromoCode: result,
    }
  })
}

export function getTotalPriceWithPromoCode(
  products: ProductCartState[],
  promoCode?: IPromoCode,
) {
  const productsPromoCode = setPromoCodeForProducts(products, promoCode)
  console.log(promoCode)
  let priceProductsWithPromCode = 0
  let priceProductsWithoutPromoCode = 0
  let defaultDiscountsPrice = 0
  productsPromoCode.forEach((product) => {
    let price =
      (product.attributes.find(
        (attribute) => attribute.id === product.selectedSize,
      )?.price ||
        product.attributes.find(
          (attribute) => attribute.id === product.selectedColor,
        )?.price ||
        product.attributes.find(
          (attribute) => attribute.id === product.selectedVolume,
        )?.price ||
        product.price) * product.selectedQuantity

    if (product.discount_percent) {
      defaultDiscountsPrice += (price / 100) * product.discount_percent
      price = calculateDiscount(price, product.discount_percent)
    }
    if (product.withPromoCode) {
      priceProductsWithPromCode += price
    } else {
      priceProductsWithoutPromoCode += price
    }
  })

  let discountPrice = 0

  switch (promoCode?.type) {
    case 'percent':
      discountPrice = calculatePriceWithPercent(
        priceProductsWithPromCode,
        promoCode.value,
      )
      break
    case 'fixed':
      if (priceProductsWithPromCode) {
        if (priceProductsWithPromCode >= promoCode.value * 2) {
          discountPrice = priceProductsWithPromCode - promoCode.value
        } else {
          discountPrice = priceProductsWithPromCode
        }
      }
      break
  }

  return {
    discountPrice:
      +(priceProductsWithPromCode - discountPrice).toFixed(1) +
      defaultDiscountsPrice,
    total: discountPrice + priceProductsWithoutPromoCode,
  }
}

export function calculatePriceWithPercent(
  price: number,
  percent: number,
): number {
  const percentPrice = (price / 100) * percent
  return price - percentPrice
}
