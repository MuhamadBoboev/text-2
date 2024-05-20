import classes from './ModalCartOnlinePayment.module.scss'
import { closeCart } from '@store/reducers/cartSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Spinner from '@ui/spinners/Spinner/Spinner'
import { useEffect, useState } from 'react'
import { clearCart } from '@store/reducers/cartSlice/helpers'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import ModalCartOnlineDelivery from '@components/modals/ModalCart/pages/ModalCartOnlinePayment/ModalCartOnlineDelivery/ModalCartOnlineDelivery'
import { PaymentData } from '../../../../../interfaces/PaymentData'
import Button from '@ui/Button/Button'
import { getTotalPriceWithPromoCode } from '@utils/helpers/setPromoCodeForProducts'

function ModalCartOnlinePayment() {
  const dispatch = useAppDispatch()
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'rejected'>(
    'pending',
  )
  const {
    pages,
    userData,
    data,
    totalPrice,
    totalPriceWithDiscount,
    products,
  } = useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.user)
  const [isSent, setIsSent] = useState<boolean>(false)
  const [deliveryType, setDeliveryType] = useState<string | undefined>()
  const [paymentStatus, setPaymentStatus] = useState<'paidFor' | 'notPaid'>(
    'notPaid',
  )
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)

  const prices = getTotalPriceWithPromoCode(products, data?.promoCode)

  let delivery = 0
  if (deliveryType === 'express') {
    delivery = 30
  } else if (deliveryType === 'standard') {
    delivery = 15
  }

  useEffect(() => {
    if (pages.onlinePayment) {
      const createOrder = async () => {
        const formData: any = {
          user_id: userData?.id || user?.id,
          payment_method_id: data?.paymentMethodId,
          shipping_type: deliveryType,
          discount: data?.promoCode?.value || 0,
          discount_type: data?.promoCode?.type || 'percent',
          shipping_address: data?.address || null,
          total: totalPrice + delivery,
          sub_total: Math.round(prices.total + delivery),
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
          setPaymentData(result)
          if (response.status >= 400) {
            setStatus('rejected')
          } else {
            dispatch(clearCart())
            setStatus('fulfilled')
          }
        } catch (e) {
          setStatus('rejected')
        }
        setIsSent(true)
      }
      if (!isSent && deliveryType) {
        createOrder()
      }
    }
  }, [pages, deliveryType])

  if (!deliveryType)
    return (
      <ModalCartOnlineDelivery
        selectDelivery={(value: string) => setDeliveryType(value)}
      />
    )

  if (status === 'pending') {
    return (
      <div className={classes.Spinner}>
        <Spinner size={56} />
      </div>
    )
  }

  console.log(status)

  if (status === 'rejected') {
    return <ErrorView />
  }

  return (
    <>
      <ModalContent className={classes.Content}>
        <div className={classes.Center}>
          {paymentStatus === 'notPaid' && paymentData && (
            <NotPaid
              paymentId={paymentData.data?.payment?.id!}
              paymentLink={paymentData.data?.payment_link}
              tranId={paymentData?.data?.payment?.tran_id!}
              changeStatus={setPaymentStatus}
            />
          )}
          {paymentStatus === 'paidFor' && paymentData && (
            <PaidFor orderId={paymentData?.data?.payment?.id!} />
          )}
        </div>
      </ModalContent>
    </>
  )
}

export default ModalCartOnlinePayment

function NotPaid({
  paymentId,
  tranId,
  paymentLink,
  changeStatus,
}: {
  paymentId: number
  tranId: string
  paymentLink: string
  changeStatus: any
}) {
  const [status, setStatus] = useState<'fulfilled' | 'pending' | 'rejected'>(
    'fulfilled',
  )

  if (status === 'pending') {
    return (
      <div className={classes.Spinner}>
        <Spinner size={56} />
      </div>
    )
  }

  return (
    <>
      <div className={classes.Info}>
        <HandySvg
          src="/assets/icons/clock.svg"
          width={100}
          height={100}
          className={clsx(classes.Icon, classes.NotPaidIcon)}
        />
        <p className={classes.Title}>В ожидании оплаты</p>
        <p className={classes.Subtitle}>
          Ссылка действительна в течении часа
          {/*<span className={classes.Code}>{paymentId}</span>*/}
        </p>
      </div>

      <div className={classes.Buttons}>
        <Button
          size={100}
          tagName="a"
          target="_blank"
          href={paymentLink}
          onClick={() => {}}
        >
          Перейти к оплате
        </Button>

        <button
          className={classes.CheckPayment}
          onClick={async () => {
            try {
              setStatus('pending')
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/web/payment/check/${paymentId}`,
                {
                  method: 'post',
                  body: '',
                },
              )
              const result = await response.json()

              if (result.result_code === 100) {
                changeStatus('paidFor')
              } else {
                // changeStatus('paidFor')
              }
              setStatus('fulfilled')
            } catch (e) {
              setStatus('rejected')
            }
          }}
        >
          Проверить статус оплаты
        </button>
      </div>
    </>
  )
}

function PaidFor({ orderId }: { orderId: number }) {
  const dispatch = useAppDispatch()

  return (
    <>
      <HandySvg
        src="/assets/icons/ok-icon.svg"
        width={100}
        height={100}
        className={clsx(classes.Icon, classes.SuccessIcon)}
      />
      <p className={classes.Title}>Успешно оплачено</p>
      <p className={classes.Subtitle}>
        Номер вашего заказа:&nbsp;
        <span className={classes.Code}>{orderId}</span>
      </p>

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
    </>
  )
}

function ErrorView() {
  const dispatch = useAppDispatch()

  return (
    <>
      <ModalContent className={classes.Content}>
        <div className={classes.Center}>
          <HandySvg
            src="/assets/icons/error-icon.svg"
            width={100}
            height={100}
            className={clsx(classes.Icon, classes.ErrorIcon)}
          />
          <p className={classes.Title}>Произошла ошибка</p>
          <Button
            className={classes.CloseButton}
            size={100}
            background="transparent"
            color="black"
            onClick={() => dispatch(closeCart())}
          >
            Закрыть
          </Button>
        </div>
      </ModalContent>
    </>
  )
}
