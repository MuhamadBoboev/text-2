import classes from './Stores.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import {
  toMainMenu,
  toMenuAddresses,
  toMenuContacts,
} from '@store/reducers/menuSlice'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import { useWindowSize } from 'usehooks-ts'
import { useContext, useEffect, useMemo, useState } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import StoresAddresses from '@components/Layout/Navigation/pages/Contacts/Stores/StoresAddresses/StoresAddresses'
import { HandySvg } from 'handy-svg'
import BackMobile from '@ui/BackMobile/BackMobile'

function Stores() {
  const [activeStoreId, setActiveStoreId] = useState<number | null>(null)
  const dispatch = useAppDispatch()
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
  ]
  const { width } = useWindowSize()
  const { renderButton } = useContext(HeaderLeftButtonContext)
  const { stores } = useAppSelector((state) => state.modalCall)

  useEffect(() => {
    if (width <= 480) {
      renderButton(<BackButton onClick={() => dispatch(toMenuContacts())} />)
    }
  }, [width])

  const activeStore = useMemo(
    () => stores?.find((store) => store.id === activeStoreId),
    [activeStoreId],
  )

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
        onClick={() => dispatch(toMenuContacts())}
        isShow={isOpen && pages.contacts.addresses}
      />
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={breadcrumbsList}
          active={{
            text: 'Адреса магазинов',
          }}
        />
        <H2
          weight={700}
          className={classes.Title}
        >
          Адреса магазинов
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.Content}>
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

      <ModalBack onClick={() => dispatch(toMenuContacts())} />
    </>
  )
}

export default Stores
