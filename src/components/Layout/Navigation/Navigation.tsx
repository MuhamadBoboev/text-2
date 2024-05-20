import classes from './Navigation.module.scss'
import Modal from '@ui/Modal/Modal'
import ModalHeader from '@ui/Modal/ModalHeader/ModalHeader'
import Divider from '@ui/Divider/Divider'
import Button from '@ui/Button/Button'
import ModalFooter from '@ui/Modal/ModalFooter/ModalFooter'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  clearMenuState,
  closeMenu,
  toMenuAbout,
  toMenuAddresses,
  toMenuContacts,
  toMenuDeliveryGroup,
} from '@store/reducers/menuSlice'
import ModalContent from '@ui/Modal/ModalContent/ModalContent'
import Link from 'next/link'
import { isMainMenu } from '@store/reducers/menuSlice/helpers'
import { modalSignUpOpen } from '@store/reducers/signUpSlice'
import { modalSignInOpen } from '@store/reducers/signInSlice'
import BackMobile from '@ui/BackMobile/BackMobile'
import { selectMenu } from '@store/selectors/menu'
import NavigationList from '@components/Layout/Navigation/NavigationList'
import { selectUserData } from '@store/selectors/user'
import ModalDivider from '@ui/Modal/ModalDivider/ModalDivider'
import ModalTitle from '@ui/Modal/ModalTitle/ModalTitle'

function Navigation() {
  const { isOpen, pages } = useAppSelector(selectMenu)
  const dispatch = useAppDispatch()
  const onClose = () => dispatch(closeMenu())

  return (
    <Modal
      onUnmount={() => {
        dispatch(clearMenuState())
      }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <NavigationList />
      {isMainMenu(pages) && (
        <>
          <AuthBlock />
          <ModalHeader className={classes.ModalHeader}>
            <ModalTitle>Меню</ModalTitle>
            <ModalDivider />
          </ModalHeader>
          <ModalContent>
            <nav>
              <ul className={classes.List}>
                <li className={classes.Item}>
                  <Link
                    onClick={onClose}
                    href="/promotions"
                    className={classes.Link}
                  >
                    Акции
                  </Link>
                </li>
                <li className={classes.Item}>
                  <Link
                    onClick={onClose}
                    href="/products?type=4"
                    className={classes.Link}
                  >
                    Новинки
                  </Link>
                </li>
                <li className={classes.Item}>
                  <Link
                    onClick={onClose}
                    href="/brands"
                    className={classes.Link}
                  >
                    Все бренды
                  </Link>
                </li>
                <li className={classes.Item}>
                  <button
                    onClick={() => dispatch(toMenuDeliveryGroup())}
                    className={classes.Link}
                  >
                    Условия покупки
                  </button>
                </li>
                <li className={classes.Item}>
                  <button
                    onClick={() => dispatch(toMenuContacts())}
                    className={classes.Link}
                  >
                    Контакты
                  </button>
                </li>
                <li className={classes.Item}>
                  <Link
                    href="/reviews"
                    onClick={onClose}
                    className={classes.Link}
                  >
                    Отзывы
                  </Link>
                </li>
                <li className={classes.Item}>
                  <button
                    onClick={() => dispatch(toMenuAbout())}
                    className={classes.Link}
                  >
                    О нас
                  </button>
                </li>
              </ul>
            </nav>
            <BackMobile
              onClick={onClose}
              isShow={isOpen && isMainMenu(pages)}
            />
          </ModalContent>
          <ModalFooter className={classes.Footer}>
            <Button
              onClick={() => dispatch(toMenuAddresses())}
              className={classes.CloseButton}
              size={100}
            >
              Позвонить
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  )
}

export default Navigation

function AuthBlock() {
  const user = useAppSelector(selectUserData)
  const dispatch = useAppDispatch()

  if (user) return null

  return (
    <div className={classes.Auth}>
      <p className={classes.AuthTitle}>
        <span className={classes.SignUpText}>Зарегистрируйтесь</span>
        или войдите
      </p>
      <Button
        className={classes.SignUp}
        size={100}
        background="primary"
        onClick={() => {
          dispatch(closeMenu())
          dispatch(modalSignUpOpen())
        }}
      >
        Зарегистрироваться
      </Button>
      <Button
        className={classes.SignIn}
        size={100}
        background="transparent"
        withBorder="black"
        color="black"
        onClick={() => {
          dispatch(closeMenu())
          dispatch(modalSignInOpen())
        }}
      >
        Войти
      </Button>
      <Divider className={classes.AuthDivider} />
    </div>
  )
}
