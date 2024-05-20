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
import { useContext, useEffect } from 'react'
import BackButton from '@ui/BackButton/BackButton'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import { useWindowSize } from 'usehooks-ts'
import Link from 'next/link'
import BackMobile from '@ui/BackMobile/BackMobile'

interface StoresAddressesProps {
  store: IStoreCategory
  toStores: () => void
}

function StoresAddresses({ store, toStores }: StoresAddressesProps) {
  const dispatch = useAppDispatch()
  const { renderButton } = useContext(HeaderLeftButtonContext)
  const { width } = useWindowSize()
  const { isOpen, pages } = useAppSelector((state) => state.menu)
  const breadcrumbsList: breadcrumbType[] = [
    {
      text: 'Меню',
      onClick: () => dispatch(toMainMenu()),
    },
    {
      text: 'Контакты',
      onClick: () => dispatch(toMenuContacts()),
    },
    {
      text: 'Адреса магазинов',
      onClick: toStores,
    },
  ]

  useEffect(() => {
    if (width <= 480 && store) {
      renderButton(<BackButton onClick={toStores} />)
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
              className={classes.Item}
              key={store.id}
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

      <ModalBack onClick={toStores} />
    </>
  )
}

export default StoresAddresses
