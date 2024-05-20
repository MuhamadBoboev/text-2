import classes from './ModalCartShop.module.scss'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import {
  selectShop,
  toCartConfirm,
  toCartMain,
  toCartPayment,
  toCartShop,
  toCartFetch,
} from '@store/reducers/cartSlice'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useContext, useEffect, useMemo, useState } from 'react'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'
import Button from '@ui/Button/Button'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import { useWindowSize } from 'usehooks-ts'
import BackButton from '@ui/BackButton/BackButton'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import BackMobile from '@ui/BackMobile/BackMobile'
import StoresAddresses from './StoresAddresses/StoresAddresses'

function ModalCartShop() {
  const [activeStoreId, setActiveStoreId] = useState<number | null>(null)
  const dispatch = useAppDispatch()
  const [activeShop, setActiveShop] = useState<string>('')
  const { shop } = useAppSelector((state) => state.cart.pages)
  const { pages, isOpen } = useAppSelector((state) => state.cart)

  const { renderButton } = useContext(HeaderLeftButtonContext)

  const { width } = useWindowSize()

  const { stores } = useAppSelector((state) => state.modalCall)

  useEffect(() => {
    if (width <= 480 && shop) {
      renderButton(
        <BackButton
          onClick={() => {
            dispatch(toCartPayment())
          }}
        />,
      )
    }
  }, [pages, width])

  const activeStore = useMemo(
    () => stores?.find((store) => store.id === activeStoreId),
    [activeStoreId],
  )

  if (!shop) return null
  if (!stores) return null

  if (activeStore)
    return (
      <StoresAddresses
        store={activeStore}
        toStores={() => setActiveStoreId(null)}
      />
    )

  return (
    <>
      <BackMobile
        onClick={() => {
          dispatch(toCartPayment())
        }}
        isShow={isOpen && pages.shop}
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
          Выберите магазин
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent>
        {!activeStoreId && (
          <ul className={classes.MenuList}>
            {stores.map((store) => (
              <li
                key={store.id}
                className={classes.Item}
                title={store.name}
                onClick={() => {
                  setActiveStoreId(store.id)
                }}
              >
                <img
                  className={classes.Img}
                  src={store.logo}
                  alt={store.name}
                />
                {/*<h3>{store.name}</h3>*/}
              </li>
            ))}
          </ul>
        )}
      </ModalContent>
      <ModalBack onClick={() => dispatch(toCartPayment())} />
      <ModalFooter>
        <Button
          type="submit"
          className={classes.SendButton}
          size={100}
          disabled={!activeShop}
          onClick={() => {
            dispatch(toCartFetch())
            dispatch(selectShop(activeShop))
          }}
        >
          Дальше
        </Button>
        {/*<Button*/}
        {/*  type="button"*/}
        {/*  className={classes.CloseButton}*/}
        {/*  size={100}*/}
        {/*  background="transparent"*/}
        {/*  color="black"*/}
        {/*  onClick={() => dispatch(toCartConfirm())}*/}
        {/*>Назад</Button>*/}
      </ModalFooter>
    </>
  )
}

export default ModalCartShop
