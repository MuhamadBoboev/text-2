import classes from './ModalCartPayment.module.scss'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import {
  selectPaymentMethod,
  toCartCashPayment,
  toCartConfirm,
  toCartDelivery,
  toCartMain,
  toCartMethodOnlinePayment,
  toCartOnlinePayment,
  toCartPayment,
  toCartShop,
} from '@store/reducers/cartSlice'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import Button from '@ui/Button/Button'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import { HandySvg } from 'handy-svg'
import { useContext, useEffect, useState } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import { useWindowSize } from 'usehooks-ts'
import BackButton from '@ui/BackButton/BackButton'
import { IPayment } from '@models/IPayment'
import { toast } from 'react-toastify'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import { toMainMenu } from '@store/reducers/menuSlice'
import BackMobile from '@ui/BackMobile/BackMobile'

function ModalCartPayment() {
  const { payment } = useAppSelector((state) => state.cart.pages)
  const { pages, isOpen } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const [paymentMethods, setPaymentMethods] = useState<IPayment[]>([])

  useEffect(() => {
    async function fetchPaymentMethods() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/web/payment-methods`,
        )
        const paymentMethodsData: { data: IPayment[] } = await response.json()

        setPaymentMethods(paymentMethodsData.data.slice(0, 3))
      } catch (e) {
        toast.error('Что-то пошло не так')
      }
    }

    if (paymentMethods.length === 0) {
      fetchPaymentMethods()
    }
  }, [])

  const { renderButton } = useContext(HeaderLeftButtonContext)

  const { width } = useWindowSize()

  useEffect(() => {
    if (width <= 480 && payment) {
      renderButton(
        <BackButton
          onClick={() => {
            dispatch(toCartConfirm())
          }}
        />,
      )
    }
  }, [pages, width])

  if (!payment) return null

  return (
    <>
      <BackMobile
        onClick={() => {
          dispatch(toCartConfirm())
        }}
        isShow={isOpen && pages.payment}
      />
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={[
            {
              text: 'Корзина',
              onClick: () => dispatch(toCartMain()),
            },
            { text: 'Доставка', isActive: false },
            { text: 'Оплата', isActive: true },
          ]}
        />
        <H2
          weight={700}
          className={classes.ModalTitle}
        >
          Оплата
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.Content}>
        <ul className={classes.MenuList}>
          {paymentMethods.map(({ name, caption, id, key }) => (
            <li
              key={id}
              tabIndex={0}
              className={`${classes.Item}`}
              onClick={() => {
                dispatch(selectPaymentMethod(id))

                switch (id) {
                  case 1:
                    dispatch(toCartMethodOnlinePayment())
                    break
                  case 2:
                    dispatch(toCartCashPayment())
                    break
                  case 3:
                    dispatch(toCartShop())
                    break
                }
              }}
            >
              <h3>{name}</h3>
              <p>{caption}</p>
              <HandySvg
                src="/assets/icons/arrow-right.svg"
                width={7}
                height={14}
                className={classes.Next}
              />
            </li>
          ))}
          {/*<li*/}
          {/*  tabIndex={0}*/}
          {/*  className={`${classes.Item}`}*/}
          {/*  onClick={() => {*/}
          {/*    dispatch(toCartCashPayment())*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <h3>Оплата наличными</h3>*/}
          {/*  <p>Оплатите заказ наличными при доставке курьером</p>*/}
          {/*  <HandySvg*/}
          {/*    src="/assets/icons/arrow-right.svg"*/}
          {/*    width={7}*/}
          {/*    height={14}*/}
          {/*    className={classes.Next}*/}
          {/*  />*/}
          {/*</li>*/}
          {/*<li*/}
          {/*  onClick={() => {*/}
          {/*    dispatch(toCartShop())*/}
          {/*  }}*/}
          {/*  tabIndex={0}*/}
          {/*  className={classes.Item}*/}
          {/*>*/}
          {/*  <h3>Забрать заказ в магазине</h3>*/}
          {/*  <p>Заберите и оплатите ваш заказ из наших магазинов</p>*/}
          {/*  <HandySvg*/}
          {/*    src="/assets/icons/arrow-right.svg"*/}
          {/*    width={7}*/}
          {/*    height={14}*/}
          {/*    className={classes.Next}*/}
          {/*  />*/}
          {/*</li>*/}
          {/*<li*/}
          {/*  tabIndex={0}*/}
          {/*  className={`${classes.Item}`}*/}
          {/*  onClick={() => {*/}
          {/*    dispatch(toCartOnlinePayment())*/}
          {/*  }}*/}
          {/*  style={{*/}
          {/*    opacity: 0.5,*/}
          {/*    pointerEvents: 'none'*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <h3>Безналичная оплата</h3>*/}
          {/*  <p>Онлайн оплата заказа в<br/> интернете</p>*/}
          {/*  <HandySvg*/}
          {/*    src="/assets/icons/arrow-right.svg"*/}
          {/*    width={7}*/}
          {/*    height={14}*/}
          {/*    className={classes.Next}*/}
          {/*  />*/}
          {/*</li>*/}
        </ul>
      </ModalContent>
      <ModalBack onClick={() => dispatch(toCartConfirm())} />
    </>
  )
}

export default ModalCartPayment
