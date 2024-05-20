import classes from './StoresAddresses.module.scss'
import { IStoreCategory } from '@models/IStore'
import { HandySvg } from 'handy-svg'
import { normalizePhoneNumber } from '@utils/helpers/inputMask'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import { toMainMenu, toMenuContacts } from '@store/reducers/menuSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { useContext, useEffect, useState } from 'react'
import BackButton from '@ui/BackButton/BackButton'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import { useWindowSize } from 'usehooks-ts'
import BackMobile from '@ui/BackMobile/BackMobile'
import {
  selectShop,
  toCartFetch,
  toCartMain,
  toCartShop,
} from '@store/reducers/cartSlice'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import Button from '@ui/Button/Button'
import clsx from 'clsx'

interface StoresAddressesProps {
  store: IStoreCategory
  toStores: () => void
}

function StoresAddresses({ store, toStores }: StoresAddressesProps) {
  const dispatch = useAppDispatch()
  const { renderButton } = useContext(HeaderLeftButtonContext)
  const [activeShop, setActiveShop] = useState<string>('')
  const { width } = useWindowSize()
  const { isOpen, pages } = useAppSelector((state) => state.menu)
  const breadcrumbsList: breadcrumbType[] = [
    {
      text: 'Корзина',
      onClick: () => dispatch(toCartMain()),
    },
    { text: 'Доставка', isActive: false },
    { text: 'Оплата', isActive: false },
  ]

  useEffect(() => {
    if (width <= 480 && store) {
      renderButton(<BackButton onClick={() => dispatch(toCartShop())} />)
    }
  }, [width])

  if (!store) return null

  return (
    <>
      <BackMobile
        onClick={toStores}
        isShow={isOpen && pages.contacts.addresses && !!store}
      />
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={breadcrumbsList}
          active={{
            text: store.name,
          }}
        />
        <H2
          weight={700}
          className={classes.Title}
        >
          {store.name}
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.Content}>
        <ul className={classes.MenuList}>
          {store.details.map((store) => (
            <li
              className={clsx(
                classes.Item,
                activeShop === store.id.toString() && classes.Active,
              )}
              key={store.id}
              onClick={() => setActiveShop(store.id.toString())}
            >
              {/*<Link target="_blank" href="https://goo.gl/maps/zcaxMzu8py9Qo7Xz5" className={classes.Link}>*/}
              <HandySvg
                src="/assets/icons/location.svg"
                width={24}
                height={24}
              />
              <h3>{store.street}</h3>
              <p>
                {store.title}{' '}
                <a
                  className={classes.Phone}
                  href={`tel:${store.phone}`}
                >
                  {normalizePhoneNumber(store.phone)}
                </a>
              </p>
              {/*</Link>*/}
            </li>
          ))}
        </ul>
      </ModalContent>

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
      </ModalFooter>
      <ModalBack onClick={toStores} />
    </>
  )
}

export default StoresAddresses
