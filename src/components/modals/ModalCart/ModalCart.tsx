import classes from './ModalCart.module.scss'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import Modal from '@ui/Modal/Modal'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  CartLocalKey,
  clearCartState,
  closeCart,
  toCartDelivery,
} from '@store/reducers/cartSlice'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import CartProduct from '@components/modals/ModalCart/CartProduct/CartProduct'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import Button from '@ui/Button/Button'
import clsx from 'clsx'
import { useContext, useEffect } from 'react'
import ModalCartRegister from '@components/modals/ModalCart/pages/auth/ModalCartRegister/ModalCartRegister'
import { checkUserAuth } from '@store/reducers/userSlice'
import ModalCartConfirm from '@components/modals/ModalCart/pages/ModalCartConfirm/ModalCartConfirm'
import ModalCartPayment from '@components/modals/ModalCart/pages/ModalCartPayment/ModalCartPayment'
import ModalCartShop from '@components/modals/ModalCart/pages/ModalCartShop/ModalCartShop'
import ModalCartFetch from '@components/modals/ModalCart/pages/ModalCartFetch/ModalCartFetch'
import Burger from '@ui/Burger/Burger'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import ModalCartDelivery from '@components/modals/ModalCart/pages/ModalCartDelivery/ModalCartDelivery'
import ModalCartRegisterConfirm from '@components/modals/ModalCart/pages/auth/ModalCartRegisterConfirm/ModalCartRegisterConfirm'
import BackButton from '@ui/BackButton/BackButton'
import { useWindowSize } from 'usehooks-ts'
import ModalQrCartpayment from './pages/ModalQrCartPayment/ModalQrCartpayment'
import ModalMethodOnlineCartPayment from './pages/ModalMethodOnlineCartPayment/ModalMethodOnlineCartPayment'
import { isMainMenu } from '@store/reducers/menuSlice/helpers'
import BackMobile from '@ui/BackMobile/BackMobile'
import ModalCartOnlinePayment from '@components/modals/ModalCart/pages/ModalCartOnlinePayment/ModalCartOnlinePayment'

function ModalCart() {
  const {
    isOpen,
    products,
    totalPrice,
    totalDiscountPrice,
    totalPriceWithDiscount,
    pages,
  } = useAppSelector((state) => state.cart)
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(closeCart())
  const { width } = useWindowSize()
  const { renderButton } = useContext(HeaderLeftButtonContext)

  const breadcrumbsList: breadcrumbType[] = [
    { text: 'Корзина', isActive: true },
    { text: 'Доставка', isActive: false },
    { text: 'Оплата', isActive: false },
  ]

  useEffect(() => {
    dispatch(checkUserAuth())
  }, [])

  useEffect(() => {
    if (width <= 480) {
      if (isOpen && pages.main) {
        renderButton(<BackButton onClick={onClose} />)
      }
    }
  }, [isOpen, pages, width])

  return (
    <Modal
      classNames={{ modal: classes.Modal }}
      isOpen={isOpen}
      onUnmount={() => {
        dispatch(clearCartState())
        renderButton(<Burger className={classes.Burger} />)
      }}
      onClose={onClose}
    >
      <BackMobile
        onClick={onClose}
        isShow={isOpen && pages.main}
      />
      {pages.delivery && <ModalCartRegister />}
      {pages.delivery && <ModalCartRegisterConfirm />}
      {pages.confirm && <ModalCartConfirm />}
      {pages.payment && <ModalCartPayment />}
      {pages.shop && <ModalCartShop />}
      {pages.cashPayment && <ModalCartDelivery />}
      {pages.fetch && <ModalCartFetch />}
      {pages.onlinePayment && <ModalCartOnlinePayment />}
      {pages.qrPayment && <ModalQrCartpayment />}
      {pages.methodOnlinePayment && <ModalMethodOnlineCartPayment />}
      {pages.main && (
        <>
          <ModalHeader className={classes.ModalHeader}>
            <Breadcrumbs
              className={classes.Breadcrumbs}
              list={breadcrumbsList}
            />
            <div className={classes.TitleAndCount}>
              <H2
                weight={700}
                className={classes.Title}
              >
                Корзина
              </H2>
              {products.length > 0 && (
                <p className={classes.Count}>{products.length} шт.</p>
              )}
            </div>
            <Divider className={classes.Divider} />
          </ModalHeader>
          <ModalContent className={classes.Content}>
            {products.length === 0 && (
              <div className={classes.Empty}>
                <p className={classes.EmptyTitle}>Корзина пуста</p>
                <Button
                  className={classes.EmptyButton}
                  tagName="link"
                  href="/products"
                  onClick={() => {
                    dispatch(closeCart())
                  }}
                >
                  Посмотреть товары
                </Button>
              </div>
            )}
            <ul className={classes.List}>
              {products.map((product) => (
                <li
                  key={JSON.stringify({
                    id: product.id,
                    selectedVolume: product.selectedVolume,
                    selectedSize: product.selectedSize,
                    selectedColor: product.selectedColor,
                  } as CartLocalKey)}
                  className={classes.Item}
                >
                  <CartProduct {...product} />
                </li>
              ))}
            </ul>
          </ModalContent>
          <ModalFooter className={classes.Footer}>
            {products.length !== 0 && (
              <div className={classes.Info}>
                <p className={classes.InfoItem}>
                  <span className={classes.InfoTitle}>Всего</span>
                  <span className={clsx(classes.InfoValue)}>
                    {Math.round(totalPrice)} c.
                  </span>
                </p>
                <p className={classes.InfoItem}>
                  <span className={classes.InfoTitle}>Скидки</span>
                  <span className={clsx(classes.InfoValue, classes.Red)}>
                    {totalDiscountPrice === 0
                      ? 0
                      : `-${Math.round(totalDiscountPrice)} c.`}
                  </span>
                </p>
                <p className={classes.InfoItem}>
                  <span className={classes.InfoTitle}>Итого к оплате</span>
                  <span className={clsx(classes.InfoValue, classes.Green)}>
                    {Math.round(totalPriceWithDiscount)} с.
                  </span>
                </p>
              </div>
            )}
            {products.length !== 0 && (
              <Button
                type="button"
                className={classes.SendButton}
                onClick={() => dispatch(toCartDelivery())}
                size={100}
              >
                Дальше
              </Button>
            )}
          </ModalFooter>
        </>
      )}
    </Modal>
  )
}

export default ModalCart
