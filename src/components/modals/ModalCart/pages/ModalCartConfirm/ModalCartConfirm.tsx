import classes from './ModalCartConfirm.module.scss'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import {
  setUserData,
  toCartDelivery,
  toCartMain,
  toCartPayment,
} from '@store/reducers/cartSlice'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import Button from '@ui/Button/Button'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import { useContext, useEffect } from 'react'
import BackButton from '@ui/BackButton/BackButton'
import Burger from '@ui/Burger/Burger'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import { useWindowSize } from 'usehooks-ts'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import BackMobile from '@ui/BackMobile/BackMobile'
import { getTotalPriceWithPromoCode } from '@utils/helpers/setPromoCodeForProducts'

function ModalCartConfirm() {
  const dispatch = useAppDispatch()
  const { confirm } = useAppSelector((state) => state.cart.pages)
  const pages = useAppSelector((state) => state.cart.pages)
  const { isOpen, data } = useAppSelector((state) => state.cart)
  const { totalPrice, totalDiscountPrice, products, totalPriceWithDiscount } =
    useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.user)

  const { renderButton } = useContext(HeaderLeftButtonContext)

  const { width } = useWindowSize()

  useEffect(() => {
    if (user) {
      dispatch(setUserData(user))
    }
  }, [user])

  useEffect(() => {
    if (width <= 480 && confirm) {
      renderButton(
        <BackButton
          onClick={() => {
            dispatch(toCartDelivery())
          }}
        />,
      )
    }
    if (!isOpen) {
      renderButton(<Burger className={classes.Burger} />)
    }
  }, [isOpen, pages, width])

  const prices = getTotalPriceWithPromoCode(products, data?.promoCode)

  if (!confirm) return null

  return (
    <>
      <BackMobile
        onClick={() => {
          dispatch(toCartDelivery())
        }}
        isShow={isOpen}
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
          Подтверждение покупки
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.Content}>
        <ul className={classes.List}>
          <li className={classes.Item}>
            <span className={classes.Title}>Заказчик</span>
            <span className={classes.Value}>{user?.name}</span>
          </li>
          <li className={classes.Item}>
            <span className={classes.Title}>Номер телефона</span>
            <span className={classes.Value}>+{user?.phone}</span>
          </li>
          <li className={classes.Item}>
            <span className={classes.Title}>Адрес доставки</span>
            <span className={classes.Value}>{data?.address}</span>
          </li>
          <li className={classes.Item}>
            <span className={classes.Title}>Сумма заказа</span>
            <span className={classes.Value}>{Math.round(totalPrice)} с.</span>
          </li>
          {/*<li className={classes.Item}>*/}
          {/*  <span className={classes.Title}>Скидки real</span>*/}
          {/*  <span className={classes.Value}>{totalDiscountPrice === 0 ? 0 : `-${Math.round(totalDiscountPrice)}`} с.</span>*/}
          {/*</li>*/}
          <li className={classes.Item}>
            <span className={classes.Title}>Скидки</span>
            <span className={classes.Value}>
              {totalDiscountPrice === 0
                ? `${Math.round(prices.discountPrice)}`
                : `${Math.round(prices.discountPrice)}`}{' '}
              с.
            </span>
          </li>
          <li className={classes.Item}>
            <span className={classes.Title}>Всего товаров</span>
            <span className={classes.Value}>{products.length} шт.</span>
          </li>
          {/*<li className={classes.Item}>*/}
          {/*  <span className={classes.Title}>Итого к оплате real</span>*/}
          {/*  <span className={classes.Value}>{Math.round(totalPriceWithDiscount)} с.</span>*/}
          {/*</li>*/}
          <li className={classes.Item}>
            <span className={classes.Title}>Итого к оплате</span>
            <span className={classes.Value}>{Math.round(prices.total)} с.</span>
          </li>
          {data?.comment && (
            <li className={classes.Item}>
              <span className={classes.Title}>Комментария</span>
              <span className={classes.Value}>{data?.comment || null}</span>
            </li>
          )}
        </ul>
      </ModalContent>
      <ModalBack
        onClick={() => {
          dispatch(toCartDelivery())
        }}
      />
      <ModalFooter>
        <Button
          type="submit"
          className={classes.SendButton}
          size={100}
          onClick={() => {
            dispatch(toCartPayment())
          }}
        >
          Перейти к оплате
        </Button>
      </ModalFooter>
    </>
  )
}

export default ModalCartConfirm
