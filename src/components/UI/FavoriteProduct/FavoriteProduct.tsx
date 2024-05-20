import classes from './FavoriteProduct.module.scss'
import { IProduct } from '@models/product/IProduct'
import Image from 'next/image'
import ProductCounter from '@ui/ProductCounter/ProductCounter'
import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { calculateDiscount } from '@utils/helpers/calculateDiscount/calculateDiscount'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'
import {
  addToCart,
  changeAttributesProductCart,
  changeQuantityProductCart,
  removeFromCart,
} from '@store/reducers/cartSlice/helpers'
import Tag from '@ui/Tag/Tag'
import { removeFromFavorite } from '@store/reducers/favoriteSlice/helpers'
import Radio from '@ui/RadioButton/Radio'
import Link from 'next/link'
import { defaultImg } from '@utils/constants/product'
import { openMenu, toMenuAddresses } from '@store/reducers/menuSlice'
import { CartLocalKey } from '@store/reducers/cartSlice'
import { sortObjectKeys } from '@utils/helpers/sortObjectKeys'

interface ProductCard2Props extends IProduct {}

function FavoriteProduct({
  id,
  name,
  image,
  price,
  discount,
  quantity,
  slug,
  isNew,
  discount_percent,
  is_only_on_retail_store,
  categories,
  attributes,
  ...keys
}: ProductCard2Props) {
  const [counter, setCounter] = useState(1)
  const dispatch = useAppDispatch()
  const { products } = useAppSelector((state) => state.cart)
  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)

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

  const firstVolume = attributes.find(
    (attribute) => attribute.type.slug === 'obyom',
  )
  const firstSize = attributes.find(
    (attribute) => attribute.type.slug === 'size',
  )
  const firstColor = attributes.find(
    (attribute) => attribute.type.slug === 'color',
  )

  const [activeVolume, setActiveVolume] = useState<number | undefined>(
    firstVolume?.id,
  )
  const [activeSize, setActiveSize] = useState<number | undefined>(
    firstSize?.id,
  )
  const [activeColor, setActiveColor] = useState<number | undefined>(
    firstColor?.id,
  )
  const productKey: CartLocalKey = sortObjectKeys({
    id,
    selectedVolume: activeVolume,
    selectedColor: activeColor,
    selectedSize: activeSize,
  })

  const hasInCart = products.some((product) => {
    const cartKey: CartLocalKey = sortObjectKeys({
      id: product.id,
      selectedColor: product.selectedColor,
      selectedSize: product.selectedSize,
      selectedVolume: product.selectedVolume,
    })
    return JSON.stringify(productKey) === JSON.stringify(cartKey)
  })

  useEffect(() => {
    dispatch(changeQuantityProductCart({ key: productKey, quantity: counter }))
  }, [counter])

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

  useEffect(() => {
    dispatch(
      changeAttributesProductCart({
        slug,
        attributes: {
          selectedColor: color?.id,
          selectedSize: size?.id,
          selectedVolume: volume?.id,
        },
      }),
    )
  }, [volume, size, color])

  const productId = id

  return (
    <article className={classes.Card}>
      <button
        className={classes.Delete}
        aria-label="Удалить из избранное"
        onClick={() => dispatch(removeFromFavorite(slug))}
      >
        <HandySvg
          src="/assets/icons/close.svg"
          width={10}
          height={10}
        />
      </button>
      <div className={classes.ImgWrapper}>
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
              color="green"
            >
              {discount.name}
            </Tag>
          )}
        </div>
        <div className={classes.Img}>
          <Image
            onError={(error: any) => {
              setIsErrorImg(true)
              error.target.style.display = 'none'
            }}
            src={image}
            alt={name}
            width={212}
            height={212}
          />
          {isErrorImg && (
            <Image
              src={defaultImg}
              alt={name}
              width={212}
              height={212}
            />
          )}
        </div>
        <div className={classes.InfoMobile}>
          {categories[0] && (
            <h4 className={classes.CategoryMobile}>{categories[0].name}</h4>
          )}
          <Link
            href={`/product/${slug}`}
            className={classes.LinkName}
          >
            <h3 className={classes.NameMobile}>{name}</h3>
          </Link>
        </div>
      </div>
      <div className={classes.Info}>
        <Link
          href={`/product/${slug}`}
          className={classes.LinkName}
        >
          <h3 className={classes.Name}>{name}</h3>
        </Link>

        <div className={classes.Attributes}>
          {activeVolume && (
            <div className={classes.Attribute}>
              <p className={classes.AttributeTitle}>Объём</p>
              <ul className={classes.AttributeList}>
                {volumes.map(({ id, name }) => (
                  <li className={classes.AttributeItem}>
                    <Radio
                      className={classes.RadioLabel}
                      classNames={{
                        radio: classes.Radio,
                        input: classes.RadioInput,
                        text: classes.RadioText,
                      }}
                      defaultChecked={id === activeVolume}
                      name={productId + 'volume'}
                      onChange={() => setActiveVolume(id)}
                      value={name}
                    >
                      {name}
                    </Radio>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeSize && (
            <div className={classes.Attribute}>
              <p className={classes.AttributeTitle}>Размер</p>
              <ul className={classes.AttributeList}>
                {sizes.map(({ id, name }) => (
                  <li className={classes.AttributeItem}>
                    <Radio
                      className={classes.RadioLabel}
                      classNames={{
                        radio: classes.Radio,
                        input: classes.RadioInput,
                        text: classes.RadioText,
                      }}
                      defaultChecked={id === activeSize}
                      name={productId + 'size'}
                      onChange={() => setActiveSize(id)}
                      value={name}
                    >
                      {name}
                    </Radio>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeColor && (
            <div className={classes.Attribute}>
              <p className={classes.AttributeTitle}>Цвет</p>
              <ul className={classes.AttributeList}>
                {sizes.map(({ id, name }) => (
                  <li className={classes.AttributeItem}>
                    <Radio
                      className={classes.RadioLabel}
                      classNames={{
                        radio: classes.Radio,
                        input: classes.RadioInput,
                        text: classes.RadioText,
                      }}
                      onChange={() => setActiveColor(id)}
                      defaultChecked={id === activeColor}
                      name={productId + 'color'}
                      value={name}
                    >
                      {name}
                    </Radio>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {!is_only_on_retail_store && (
          <div className={classes.CounterWrapper}>
            <p className={classes.CounterTitle}>Количество: </p>
            <ProductCounter
              classNames={{
                counter: classes.Counter,
                input: classes.InputCounter,
                increment: classes.IncrementCounter,
                decrement: classes.DecrementCounter,
              }}
              counter={counter}
              setCounter={setCounter}
              min={1}
              max={
                color?.quantity ||
                volume?.quantity ||
                size?.quantity ||
                quantity
              }
            />
          </div>
        )}

        {!!is_only_on_retail_store && (
          <p className={classes.ProductStatus}>
            Товар доступен только в розничном магазине
          </p>
        )}
        <div className={classes.Bottom}>
          {!is_only_on_retail_store && (
            <button
              className={classes.ToCart}
              onClick={(event: any) => {
                event.preventDefault()
                if (
                  !hasInCart &&
                  (color?.quantity ||
                    size?.quantity ||
                    volume?.quantity ||
                    quantity)
                ) {
                  dispatch(
                    addToCart({
                      categories,
                      selectedQuantity: counter,
                      selectedVolume: volume?.id,
                      selectedColor: color?.id,
                      selectedSize: size?.id,
                      name,
                      price,
                      id,
                      attributes,
                      image,
                      quantity,
                      slug,
                      is_only_on_retail_store,
                      discount,
                      discount_percent,
                      ...keys,
                    }),
                  )
                } else {
                  dispatch(removeFromCart(productKey))
                }
              }}
            >
              <HandySvg
                src="/assets/icons/cart-bold.svg"
                width={16}
                height={16}
              />
              {hasInCart ? 'Убрать' : 'В корзину'}
            </button>
          )}
          {!!is_only_on_retail_store && (
            <button
              className={classes.ToCart}
              onClick={(event: any) => {
                event.preventDefault()
                dispatch(openMenu())
                dispatch(toMenuAddresses())
              }}
            >
              Наши магазины
            </button>
          )}

          <p className={classes.PriceWrapper}>
            <span
              className={clsx(
                classes.Price,
                discount_percent !== null &&
                  discount_percent !== 0 &&
                  classes.Strike,
              )}
            >
              {Math.round(
                volume?.price || color?.price || size?.price || price,
              ) * counter}{' '}
              с.
            </span>
            {discount_percent !== null && discount_percent !== 0 && (
              <span className={clsx(classes.Price, classes.Discount)}>
                {Math.round(
                  calculateDiscount(
                    (volume?.price || color?.price || size?.price || price) *
                      counter,
                    discount_percent || 0,
                  ),
                )}{' '}
                с.
              </span>
            )}
          </p>
        </div>
      </div>
    </article>
  )
}

export default FavoriteProduct
