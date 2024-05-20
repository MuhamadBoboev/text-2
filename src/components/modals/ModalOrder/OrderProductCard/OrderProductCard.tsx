import classes from './OrderProductCard.module.scss'
import Image from 'next/image'
import ProductCounter from '@ui/ProductCounter/ProductCounter'
import { HandySvg } from 'handy-svg'
import { useAppDispatch } from '@store/hooks'
import {
  changeQuantityProductCart,
  removeFromCart,
} from '@store/reducers/cartSlice/helpers'
import Tag from '@ui/Tag/Tag'
import clsx from 'clsx'
import { calculateDiscount } from '@utils/helpers/calculateDiscount/calculateDiscount'
import { useMemo, useState } from 'react'

interface OrderProductCardProps {
  className?: string
  attribute_name: string
  attribute_id: number
  id: number
  item_id: number
  item_name: string
  item_price: number
  item_quantity: number
  order_id: number
  product?: {
    id: number
    image: string
    name: string
    slug: string
    discount_percent: null | number
  }
}

function OrderProductCard({
  order_id,
  product,
  id,
  item_name,
  attribute_name,
  attribute_id,
  item_quantity,
  item_price,
  item_id,
  className,
}: OrderProductCardProps) {
  const dispatch = useAppDispatch()

  if (!product) return null

  return (
    <article className={clsx(classes.Product, className)}>
      <div className={classes.Left}>
        <div className={classes.Tags}>
          {/*{(discount_percent !== null) && (discount_percent !== 0) && (*/}
          {/*  <Tag className={classes.Tag} color="red">-{discount_percent}%</Tag>*/}
          {/*)}*/}
          {/*{discount && (*/}
          {/*  <Tag className={classes.Tag} color="green">{discount.name}</Tag>*/}
          {/*)}*/}
        </div>
        <Image
          className={classes.Img}
          src={product?.image}
          alt=""
          width={120}
          height={120}
        />
      </div>
      <div className={classes.Right}>
        {<p className={classes.Category}>Категория</p>}
        <p className={classes.Name}>{product?.name}</p>
        <div className={classes.Attributes}>
          {attribute_name && (
            <p className={classes.Attribute}>{attribute_name}</p>
          )}
        </div>
        <div className={classes.CounterAndPrice}>
          <div className={classes.CounterWrapper}>
            <p className={classes.CounterTitle}>Количество: {item_quantity}</p>
          </div>
          <div className={classes.Prices}>
            <p
              className={clsx(
                classes.Price,
                product.discount_percent && classes.Strike,
              )}
            >
              {item_price} с.
            </p>
            {product.discount_percent !== null &&
              product.discount_percent !== 0 && (
                <p className={classes.Price}>
                  {Math.round(
                    calculateDiscount(
                      item_price,
                      product.discount_percent || 0,
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

export default OrderProductCard
