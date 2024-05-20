import classes from './ProductCard.module.scss'
import { IProduct } from '@models/product/IProduct'
import { calculateDiscount } from '@utils/helpers/calculateDiscount/calculateDiscount'
import Tag from '@ui/Tag/Tag'
import Link from 'next/link'
import Button from '@ui/Button/Button'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  addToCart,
  removeFromCart,
  removeProductFromCart,
} from '@store/reducers/cartSlice/helpers'
import clsx from 'clsx'
import CartPlus from '@assets/icons/cart-plus.svg'
import CartMinus from '@assets/icons/cart-minus.svg'
import {
  addToFavorite,
  removeFromFavorite,
} from '@store/reducers/favoriteSlice/helpers'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { HandySvg } from 'handy-svg'
import { defaultImg } from '@utils/constants/product'
import { CartLocalKey } from '@store/reducers/cartSlice'

interface ProductCardProps extends IProduct {
  className?: string
  hideIsUnavailable?: boolean
}

function ProductCard({
  id,
  name,
  image,
  categories,
  images,
  price,
  discount,
  isNew,
  slug,
  brand,
  discount_percent,
  className,
  attributes,
  quantity,
  product_type_id,
  is_only_on_retail_store,
  hideIsUnavailable,
  ...keys
}: ProductCardProps) {
  const dispatch = useAppDispatch()

  const volumes = useMemo(
    () =>
      attributes
        .filter((attribute) => attribute.type.slug === 'obyom')
        .sort((a, b) => (parseFloat(a.name) > parseFloat(b.name) ? 1 : -1)),
    [attributes],
  )
  const sizes = useMemo(
    () =>
      attributes
        .filter((attribute) => attribute.type.slug === 'size')
        .sort((a, b) => (parseFloat(a.name) > parseFloat(b.name) ? 1 : -1)),
    [attributes],
  )
  const colors = useMemo(
    () =>
      attributes
        .filter((attribute) => attribute.type.slug === 'color')
        .sort((a, b) => (parseFloat(a.name) > parseFloat(b.name) ? 1 : -1)),
    [attributes],
  )

  const firstVolume = volumes.find(
    (attribute) => attribute.type.slug === 'obyom',
  )
  const firstSize = sizes.find((attribute) => attribute.type.slug === 'size')
  const firstColor = colors.find((attribute) => attribute.type.slug === 'color')

  const [activeVolume, setActiveVolume] = useState<number | undefined>(
    firstVolume?.id,
  )
  const [activeSize, setActiveSize] = useState<number | undefined>(
    firstSize?.id,
  )
  const [activeColor, setActiveColor] = useState<number | undefined>(
    firstColor?.id,
  )

  const volume = useMemo(
    () => volumes.find((attribute) => attribute.id === activeVolume),
    [activeVolume],
  )
  const size = useMemo(
    () => sizes.find((attribute) => attribute.id === activeSize),
    [activeSize],
  )
  const color = useMemo(
    () => colors.find((attribute) => attribute.id === activeColor),
    [activeColor],
  )

  const { products } = useAppSelector((state) => state.cart)
  const { products: favoriteProducts } = useAppSelector(
    (state) => state.favorite,
  )

  const hasInCart = products.some((product) => product.id === id)
  const hasInFavorites = favoriteProducts.some((product) => product.id === id)
  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)

  const productTypes: any = {
    2: 'Хит',
    4: 'Новинка',
  }

  const productTagColor: any = {
    2: 'hit',
    4: 'new',
  }

  return (
    <Link
      href={`/product/${slug}`}
      className={clsx(
        classes.Link,
        className,
        hideIsUnavailable && quantity <= 0 && classes.WithOpacity,
      )}
    >
      <article className={classes.Card}>
        <div className={classes.Img}>
          <Image
            onError={(error: any) => {
              setIsErrorImg(true)
              error.target.style.display = 'none'
            }}
            src={image}
            alt={name}
            width={200}
            height={200}
          />
          {isErrorImg && (
            <Image
              src={defaultImg}
              alt={name}
              width={200}
              height={200}
            />
          )}
          {!is_only_on_retail_store &&
            (volume?.quantity ||
              color?.quantity ||
              size?.quantity ||
              quantity) > 0 && (
              <Button
                size={100}
                className={classes.Cart}
                onClick={(event: any) => {
                  event.preventDefault()
                  if (!hasInCart) {
                    dispatch(
                      addToCart({
                        id,
                        name,
                        image,
                        categories,
                        images,
                        price,
                        discount,
                        quantity,
                        isNew,
                        slug,
                        brand,
                        discount_percent,
                        selectedColor: color?.id,
                        selectedSize: size?.id,
                        selectedVolume: volume?.id,
                        attributes,
                        is_only_on_retail_store,
                        selectedQuantity: 1,
                        product_type_id,
                        ...keys,
                      }),
                    )
                  } else {
                    dispatch(removeProductFromCart(id))
                  }
                }}
              >
                {hasInCart ? (
                  <>
                    Убрать
                    <CartMinus
                      className={classes.Minus}
                      width={24}
                      height={24}
                    />
                  </>
                ) : (
                  <>
                    В корзину
                    <CartPlus
                      className={classes.Plus}
                      width={24}
                      height={24}
                    />
                  </>
                )}
              </Button>
            )}
          {!is_only_on_retail_store &&
            (volume?.quantity ||
              color?.quantity ||
              size?.quantity ||
              quantity) < 1 && (
              <Button
                size={100}
                className={clsx(classes.Cart, classes.NoneQuantity)}
                onClick={(event: any) => event.preventDefault()}
              >
                Нет в наличии
              </Button>
            )}
          <button
            className={clsx(
              classes.Favorite,
              hasInFavorites && classes.ActiveFavorite,
            )}
            aria-label="В избранное"
            onClick={(event) => {
              // event.preventDefault()
              event.stopPropagation()
              event.preventDefault()
              if (!hasInFavorites) {
                dispatch(
                  addToFavorite({
                    id,
                    name,
                    image,
                    categories,
                    images,
                    price,
                    discount,
                    isNew,
                    slug,
                    brand,
                    discount_percent,
                    attributes,
                    quantity,
                    product_type_id,
                    is_only_on_retail_store,
                    ...keys,
                  }),
                )
              } else {
                dispatch(removeFromFavorite(slug))
              }
            }}
          >
            <HandySvg
              src="/assets/icons/heart-bold.svg"
              width={20}
              height={20}
            />
          </button>
        </div>
        <div className={classes.Tags}>
          {discount_percent !== null && discount_percent !== 0 && (
            <Tag
              className={classes.Tag}
              color="red"
            >
              -{discount_percent}%
            </Tag>
          )}
          {discount && (
            <Tag
              className={classes.Tag}
              color="promotion"
            >
              {discount.name}
            </Tag>
          )}
          {product_type_id && productTypes[product_type_id] && (
            <Tag
              className={classes.Tag}
              color={productTagColor[product_type_id]}
            >
              {productTypes[product_type_id]}
            </Tag>
          )}
        </div>
        <div className={classes.Info}>
          <p className={classes.Brand}>{brand?.name}</p>
          <p className={classes.Name}>{name}</p>
          <div className={classes.PriceAndDiscount}>
            {discount_percent !== null && discount_percent !== 0 && (
              <p className={classes.PriceWithDiscount}>
                {Math.round(
                  calculateDiscount(
                    firstVolume?.price ||
                      firstSize?.price ||
                      firstColor?.price ||
                      price,
                    discount_percent || 0,
                  ),
                )}
                с.
              </p>
            )}
            <p
              className={clsx(
                classes.Price,
                discount_percent !== null &&
                  discount_percent !== 0 &&
                  classes.Strike,
              )}
            >
              {Math.round(
                firstVolume?.price ||
                  firstSize?.price ||
                  firstColor?.price ||
                  price,
              )}{' '}
              с.
            </p>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ProductCard
