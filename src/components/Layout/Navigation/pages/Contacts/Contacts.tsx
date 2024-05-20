import classes from './Contacts.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import {
  toMainMenu,
  toMenuAddresses,
  toMenuGuarantees,
  toMenuTelephones,
} from '@store/reducers/menuSlice'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import Button from '@ui/Button/Button'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import { useWindowSize } from 'usehooks-ts'
import { HandySvg } from 'handy-svg'
import ModalBack from '@ui/Modal/ModalBack/ModalBack'
import { modalOpenContacts } from '@store/reducers/contactsSlice'
import BackMobile from '@ui/BackMobile/BackMobile'

function Contacts() {
  const dispatch = useAppDispatch()
  const { isOpen, pages } = useAppSelector((state) => state.menu)

  const breadcrumbsList: breadcrumbType[] = [
    {
      text: 'Меню',
      onClick: () => dispatch(toMainMenu()),
    },
  ]
  const { width } = useWindowSize()
  const { renderButton } = useContext(HeaderLeftButtonContext)

  useEffect(() => {
    if (width <= 480) {
      renderButton(<BackButton onClick={() => dispatch(toMainMenu())} />)
    }
  }, [width])

  return (
    <>
      <BackMobile
        onClick={() => dispatch(toMainMenu())}
        isShow={isOpen && pages.contacts.main}
      />
      <ModalHeader className={classes.ModalHeader}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={breadcrumbsList}
          active={{
            text: 'Контакты и адреса',
          }}
        />
        <H2
          weight={700}
          className={classes.Title}
        >
          Контакты и адреса
        </H2>
        <Divider className={classes.Divider} />
      </ModalHeader>
      <ModalContent className={classes.Content}>
        <ul className={classes.MenuList}>
          {/*<li*/}
          {/*  tabIndex={0}*/}
          {/*  className={classes.Item}*/}
          {/*  onClick={()=> {*/}
          {/*    dispatch(toMenuTelephones())*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <div className={classes.Link}>*/}
          {/*    <h3>Номера телефонов</h3>*/}
          {/*    <p>Все номера телефонов у наших магазинов</p>*/}
          {/*  </div>*/}
          {/*</li>*/}
          <li
            onClick={() => dispatch(toMenuAddresses())}
            tabIndex={0}
            className={classes.Item}
          >
            <h3>Наши магазины</h3>
            <p>Все адреса и контакты наших магазинов</p>
          </li>
          <li
            tabIndex={0}
            className={`${classes.Item} ${classes.Mail}`}
          >
            <Link
              href="mailto:info@lacite.tj"
              className={classes.Link}
            >
              <HandySvg
                aria-hidden={true}
                className={classes.Icon}
                src="/assets/icons/mail.svg"
                alt=""
                width={18}
                height={18}
              />
              <h3>Почта</h3>
              <p>info@lacite.tj</p>
            </Link>
          </li>
          {/*<li*/}
          {/*  onClick={() => dispatch(toMenuAddresses())}*/}
          {/*  tabIndex={0}*/}
          {/*  className={classes.Item}*/}
          {/*>*/}
          {/*  <h3>Адреса магазинов</h3>*/}
          {/*  <p>Все адреса находящихся в городе Душанбе и Худжанд</p>*/}
          {/*</li>*/}
        </ul>
      </ModalContent>
      <ModalBack onClick={() => dispatch(toMainMenu())} />
    </>
  )
}

export default Contacts
