import classes from './CartProduct.module.scss'
import Image from 'next/image'
import ProductCounter from '@ui/ProductCounter/ProductCounter'
import { HandySvg } from 'handy-svg'
import { useAppDispatch } from '@store/hooks'
import { CartLocalKey, ProductCartState } from '@store/reducers/cartSlice'
import Tag from '@ui/Tag/Tag'
import clsx from 'clsx'
import { calculateDiscount } from '@utils/helpers/calculateDiscount/calculateDiscount'
import { useMemo, useState } from 'react'
import {
  changeQuantityProductCart,
  removeFromCart,
} from '@store/reducers/cartSlice/helpers'
import { sortObjectKeys } from '@utils/helpers/sortObjectKeys'

interface CartProductProps extends ProductCartState {}

function CartProduct({
  image,
  categories,
  name,
  quantity,
  price,
  slug,
  discount_percent,
  discount,
  selectedQuantity,
  selectedVolume,
  selectedSize,
  selectedColor,
  attributes,
  ...keys
}: CartProductProps) {
  const dispatch = useAppDispatch()

  const volumes = useMemo(
    () => attributes.filter((attribute) => attribute.type.slug === 'obyom'),
    [attributes],
  )
  const sizes = useMemo(
    () => attributes.filter((attribute) => attribute.type.slug === 'size'),
    [attributes],
  )
  const colors = useMemo(
    () => attributes.filter((attribute) => attribute.type.slug === 'color'),
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
    selectedVolume,
  )
  const [activeSize, setActiveSize] = useState<number | undefined>(selectedSize)
  const [activeColor, setActiveColor] = useState<number | undefined>(
    selectedColor,
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

  const productKey: CartLocalKey = sortObjectKeys({
    id: keys.id,
    selectedVolume: activeVolume,
    selectedSize: activeSize,
    selectedColor: activeColor,
  })

  return (
    <article className={classes.Product}>
      <button
        className={classes.Close}
        onClick={() => dispatch(removeFromCart(productKey))}
      >
        <HandySvg
          src="/assets/icons/close.svg"
          width={10}
          height={10}
        />
      </button>
      <div className={classes.Left}>
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
        <Image
          className={classes.Img}
          src={image}
          alt=""
          width={120}
          height={120}
        />
      </div>
      <div className={classes.Right}>
        {categories[0] && (
          <p className={classes.Category}>{categories[0].name}</p>
        )}
        <p className={classes.Name}>{name}</p>
        <div className={classes.Attributes}>
          {selectedVolume && (
            <p className={classes.Attribute}>
              <>
                Объём:{' '}
                {
                  attributes.find(
                    (attribute) => attribute.id === selectedVolume,
                  )?.name
                }
              </>
            </p>
          )}
          {selectedSize && (
            <p className={classes.Attribute}>
              <>
                Размер:{' '}
                {
                  attributes.find((attribute) => attribute.id === selectedSize)
                    ?.name
                }
              </>
            </p>
          )}
          {selectedColor && (
            <p className={classes.Attribute}>
              <>
                Цвет:{' '}
                {
                  attributes.find((attribute) => attribute.id === selectedColor)
                    ?.name
                }
              </>
            </p>
          )}
        </div>
        <div className={classes.CounterAndPrice}>
          <div className={classes.CounterWrapper}>
            <p className={classes.CounterTitle}>Количество: </p>
            <ProductCounter
              classNames={{
                counter: classes.Counter,
                input: classes.InputCounter,
                increment: classes.IncrementCounter,
                decrement: classes.DecrementCounter,
              }}
              counter={selectedQuantity}
              setCounter={(quantity: number) => {
                dispatch(
                  changeQuantityProductCart({
                    key: productKey,
                    quantity: quantity,
                  }),
                )
              }}
              min={1}
              max={
                volume?.quantity ||
                size?.quantity ||
                color?.quantity ||
                quantity
              }
            />
          </div>
          <div className={classes.Prices}>
            <p
              className={clsx(
                classes.Price,
                discount_percent && classes.Strike,
              )}
            >
              {Math.round(
                volume?.price || size?.price || color?.price || price,
              ) * selectedQuantity}{' '}
              с.
            </p>
            {discount_percent !== null && discount_percent !== 0 && (
              <p className={classes.Price}>
                {Math.round(
                  calculateDiscount(
                    (volume?.price || size?.price || color?.price || price) *
                      selectedQuantity,
                    discount_percent || 0,
                  ),
                )}{' '}
                с.
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default CartProduct
