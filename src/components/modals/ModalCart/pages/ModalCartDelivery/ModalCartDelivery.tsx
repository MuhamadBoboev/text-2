import classes from './ModalCartDelivery.module.scss'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import {
  selectDeliveryMethod,
  toCartMain,
  toCartPayment,
  toCartFetch,
} from '@store/reducers/cartSlice'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useContext, useEffect, useState } from 'react'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'
import Button from '@ui/Button/Button'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import { useWindowSize } from 'usehooks-ts'
import BackButton from '@ui/BackButton/BackButton'
import { deliveryList } from '../../../../../../data/delivery'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import BackMobile from '@ui/BackMobile/BackMobile'

function ModalCartDelivery() {
  const dispatch = useAppDispatch()
  const { cashPayment } = useAppSelector((state) => state.cart.pages)
  const { pages, data, isOpen } = useAppSelector((state) => state.cart)
  const { user } = useAppSelector((state) => state.user)

  const { renderButton } = useContext(HeaderLeftButtonContext)

  const { width } = useWindowSize()
  useEffect(() => {
    if (width <= 480 && cashPayment) {
      renderButton(
        <BackButton
          onClick={() => {
            dispatch(toCartPayment())
          }}
        />,
      )
    }
  }, [pages, width])

  if (!cashPayment) return null

  return (
    <>
      <BackMobile
        onClick={() => {
          dispatch(toCartPayment())
        }}
        isShow={isOpen && cashPayment}
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
          className={classes.Title}
        >
          Варианты доставки
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        <ul className={classes.List}>
          {deliveryList.map(({ name, id, slug, description }, index) => (
            <li
              key={id}
              tabIndex={0}
              className={`${classes.Item}`}
              onClick={() => {
                dispatch(selectDeliveryMethod(slug))
              }}
            >
              <h3>{name}</h3>
              <p>{description}</p>
              <HandySvg
                src="/assets/icons/ok-icon.svg"
                width={22}
                height={22}
                className={clsx(
                  classes.Icon,
                  slug === data?.delivery && classes.ActiveIcon,
                )}
              />
            </li>
          ))}
        </ul>
      </ModalContent>
      <ModalBack onClick={() => dispatch(toCartPayment())} />
      <ModalFooter>
        <Button
          type="submit"
          className={classes.SendButton}
          size={100}
          disabled={!data?.delivery}
          onClick={() => {
            dispatch(toCartFetch())
          }}
        >
          Дальше
        </Button>
      </ModalFooter>
    </>
  )
}

export default ModalCartDelivery
