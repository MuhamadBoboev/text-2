import { HandySvg } from 'handy-svg'
import classes from './ModalCartFetch.module.scss'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import Button from '@ui/Button/Button'
import { closeCart } from '@store/reducers/cartSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useContext, useEffect, useState } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import { useWindowSize } from 'usehooks-ts'
import Burger from '@ui/Burger/Burger'
import Spinner from '@ui/spinners/Spinner/Spinner'
import clsx from 'clsx'
import { clearCart } from '@store/reducers/cartSlice/helpers'
import { getTotalPriceWithPromoCode } from '@utils/helpers/setPromoCodeForProducts'
import { IOrder } from '@models/IOrder'

function ModalCartFetch() {
  const dispatch = useAppDispatch()
  const { fetch: fetchPage } = useAppSelector((state) => state.cart.pages)
  const {
    pages,
    userData,
    data,
    totalPrice,
    totalPriceWithDiscount,
    products,
  } = useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.user)
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'rejected'>(
    'pending',
  )
  const { renderButton } = useContext(HeaderLeftButtonContext)
  const [isSent, setIsSent] = useState<boolean>(false)
  const { width } = useWindowSize()
  const [orderData, setOrderData] = useState<{ data: IOrder } | null>(null)

  useEffect(() => {
    const prices = getTotalPriceWithPromoCode(products, data?.promoCode)
    let delivery = 0
    if (data?.delivery === 'express') {
      delivery = 30
    } else if (data?.delivery === 'standard') {
      delivery = 15
    }

    if (fetchPage) {
      const createOrder = async () => {
        const formData: any = {
          user_id: userData?.id || user?.id,
          payment_method_id: data?.paymentMethodId,
          shipping_type: data?.delivery,
          discount: data?.promoCode?.value || 0,
          discount_type: data?.promoCode?.type || 'percent',
          shipping_address: data?.address || null,
          total: totalPrice + delivery,
          sub_total: Math.round(prices.total) + delivery,
          promo_code: data?.promoCode?.code || null,
          products: products.map((product) => {
            return {
              item_id: product.id,
              item_name: product.name,
              item_quantity: product.selectedQuantity,
              item_price:
                product.attributes.find(
                  (attribute) => attribute.id === product.selectedSize,
                )?.price ||
                product.attributes.find(
                  (attribute) => attribute.id === product.selectedColor,
                )?.price ||
                product.attributes.find(
                  (attribute) => attribute.id === product.selectedVolume,
                )?.price,
              attribute_id:
                product.selectedSize ||
                product.selectedColor ||
                product.selectedVolume,
              attribute_name:
                product.attributes.find(
                  (attribute) => attribute.id === product.selectedSize,
                )?.name ||
                product.attributes.find(
                  (attribute) => attribute.id === product.selectedColor,
                )?.name ||
                product.attributes.find(
                  (attribute) => attribute.id === product.selectedVolume,
                )?.name,
            }
          }),
        }

        if (data?.comment) {
          formData.comment = data.comment
        }

        if (data?.paymentMethodId && +data.paymentMethodId === 3) {
          formData.store_detail_id = data.shop
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/web/orders`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
              body: JSON.stringify(formData),
            },
          )
          const result = await response.json()
          if (response.status === 201) {
            setStatus('fulfilled')
            setOrderData(result)
            dispatch(clearCart())
          } else {
            setStatus('rejected')
          }
        } catch (e) {
          setStatus('rejected')
        }
        setIsSent(true)
      }
      if (!isSent) {
        createOrder()
      }
    }
  }, [fetchPage])

  useEffect(() => {
    renderButton(<Burger className={classes.Burger} />)
  }, [pages, width])

  if (!fetchPage) return null

  return (
    <>
      {status === 'pending' && (
        <div className={classes.Spinner}>
          <Spinner size={56} />
        </div>
      )}
      <ModalContent className={classes.Content}>
        <div className={classes.Center}>
          {status !== 'pending' && (
            <>
              <HandySvg
                src={
                  status === 'fulfilled'
                    ? '/assets/icons/ok-icon.svg'
                    : '/assets/icons/error-icon.svg'
                }
                width={100}
                height={100}
                className={clsx(
                  classes.Icon,
                  status === 'fulfilled'
                    ? classes.SuccessIcon
                    : classes.ErrorIcon,
                )}
              />
              <p className={classes.Title}>
                {status === 'fulfilled'
                  ? 'Успешно,спасибо за покупку'
                  : 'Произошла ошибка'}
              </p>
              {status !== 'rejected' && (
                <>
                  <p className={classes.Subtitle}>
                    Номер вашего заказа:
                    <span className={classes.Code}>{orderData?.data.id}</span>
                  </p>
                  <p className={classes.Text}>
                    В ближайшее время наш менеджер свяжется с вами.
                  </p>
                  <p className={classes.Note}>
                    Рабочее время: понедельник-пятница (9:00 - 18:00)
                  </p>
                  <a
                    className={classes.Link}
                    href="tel:+992711848484"
                  >
                    +992 711 84 84 84
                  </a>
                  <p className={classes.Text}></p>
                </>
              )}
            </>
          )}
          {status !== 'pending' && (
            <div className={classes.Footer}>
              <Button
                tagName="link"
                href="/dashboard"
                className={classes.SendButton}
                size={100}
                onClick={() => dispatch(closeCart())}
              >
                История покупок
              </Button>
              <Button
                tagName="link"
                href="/"
                className={classes.CloseButton}
                size={100}
                background="transparent"
                color="black"
                onClick={() => dispatch(closeCart())}
              >
                На главную
              </Button>
            </div>
          )}
        </div>
      </ModalContent>
    </>
  )
}

export default ModalCartFetch
