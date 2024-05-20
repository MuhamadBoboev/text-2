import classes from './QR.module.scss'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import {
  selectPaymentMethod,
  toCartCashPayment,
  toCartConfirm,
  toCartDelivery,
  toCartMain,
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

function ModalQrCartpayment() {
  const { payment } = useAppSelector((state) => state.cart.pages)
  const { pages, isOpen } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const [paymentMethods, setPaymentMethods] = useState<IPayment[]>([])

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
          Оплата по QR-коду
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.Content}>
        <div className={classes.qr}>
          <img
            className={classes.qrImage}
            src="/assets/all_qr.png"
            alt=""
          />

          <HandySvg
            src="/assets/logo_bank.svg"
            width={284.34}
            height={77.53}
          />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button
          type="submit"
          className={classes.SendButton}
          size={100}
          onClick={() => {
            dispatch(toCartCashPayment())
          }}
        >
          Оплатить
        </Button>
      </ModalFooter>
      <ModalBack onClick={() => dispatch(toCartConfirm())} />
    </>
  )
}

export default ModalQrCartpayment
