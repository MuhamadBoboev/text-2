import classes from './Navbar.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import { HandySvg } from 'handy-svg'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  modalSignInClose,
  modalSignInToggle,
} from '@store/reducers/signInSlice'
import { closeCart, toggleCart } from '@store/reducers/cartSlice'
import { closeCatalog, toggleCatalog } from '@store/reducers/catalogSlice'
import clsx from 'clsx'
import { modalSignUpClose } from '@store/reducers/signUpSlice'
import { closeMenu } from '@store/reducers/menuSlice'
import { closeFilter } from '@store/reducers/filterSlice'
import { closeFeedback } from '@store/reducers/feedbackSlice'

function Navbar() {
  const { pathname } = useRouter()
  const isSignInOpen = useAppSelector((state) => state.signIn.isOpen)
  const isSignUpOpen = useAppSelector((state) => state.signUp.isOpen)
  const isCatalogOpen = useAppSelector((state) => state.catalog.isOpen)
  const isCartOpen = useAppSelector((state) => state.cart.isOpen)
  const isOpenMenu = useAppSelector((state) => state.menu.isOpen)
  const dispatch = useAppDispatch()

  const cartLength = useAppSelector((state) => state.cart.products.length)
  const favoriteLength = useAppSelector(
    (state) => state.favorite.products.length,
  )

  const router = useRouter()

  const { user } = useAppSelector((state) => state.user)

  return (
    <div className={classes.Navbar}>
      <Wrapper className={classes.Wrapper}>
        <ul className={classes.List}>
          <li className={classes.Item}>
            <Link
              href="/"
              onClick={(event) => {
                if (pathname === '/') {
                  event.preventDefault()
                }
                dispatch(closeCatalog())
                dispatch(closeCart())
                dispatch(modalSignInClose())
                dispatch(modalSignUpClose())
                dispatch(closeMenu())
                dispatch(closeFilter())
                dispatch(closeFeedback())
              }}
              className={clsx(
                classes.Button,
                pathname === '/' &&
                  !isCatalogOpen &&
                  !isCartOpen &&
                  !isSignInOpen &&
                  !isSignUpOpen &&
                  classes.Active,
              )}
            >
              <HandySvg
                src="/assets/icons/home.svg"
                width={24}
                height={24}
              />
              Главная
            </Link>
          </li>
          <li className={classes.Item}>
            <button
              className={clsx(
                classes.Button,
                isCatalogOpen && classes.Active,
                pathname.startsWith('/products') &&
                  classes.Active &&
                  !isSignInOpen &&
                  !isSignUpOpen &&
                  !isOpenMenu,
              )}
              onClick={() => {
                dispatch(modalSignInClose())
                dispatch(modalSignUpClose())
                dispatch(closeCart())
                dispatch(toggleCatalog())
                dispatch(closeCart())
                dispatch(closeMenu())
                dispatch(closeFilter())
                dispatch(closeFeedback())
              }}
            >
              <HandySvg
                src="/assets/icons/sliders-horizontal.svg"
                width={24}
                height={24}
              />
              Каталог
            </button>
          </li>
          <li className={classes.Item}>
            <button
              className={clsx(
                classes.Button,
                classes.Cart,
                isCartOpen && classes.Active,
              )}
              onClick={() => {
                dispatch(closeCatalog())
                dispatch(modalSignInClose())
                dispatch(modalSignUpClose())
                dispatch(closeMenu())
                dispatch(toggleCart())
                dispatch(closeFilter())
                dispatch(closeFeedback())
              }}
            >
              <div className={classes.IconWrapper}>
                {cartLength !== 0 && !isCartOpen && (
                  <span
                    className={clsx(
                      classes.Counter,
                      cartLength > 99 && classes.CounterSmall,
                    )}
                  >
                    {cartLength > 99 ? '99+' : cartLength}
                  </span>
                )}
                <HandySvg
                  src="/assets/icons/cart-medium.svg"
                  width={24}
                  height={24}
                />
              </div>
              Корзина
            </button>
          </li>
          <li className={classes.Item}>
            <Link
              href="/favorites"
              className={clsx(
                classes.Button,
                pathname === '/favorites' &&
                  !isCatalogOpen &&
                  !isCartOpen &&
                  !isSignInOpen &&
                  !isSignUpOpen &&
                  !isOpenMenu &&
                  classes.Active,
              )}
              onClick={(event) => {
                if (pathname === '/favorites') {
                  event.preventDefault()
                }
                dispatch(closeCatalog())
                dispatch(closeCart())
                dispatch(modalSignInClose())
                dispatch(modalSignUpClose())
                dispatch(closeMenu())
                dispatch(closeFilter())
                dispatch(closeFeedback())
              }}
            >
              <div className={classes.IconWrapper}>
                {favoriteLength !== 0 && !isCartOpen && (
                  <span
                    className={clsx(
                      classes.Counter,
                      favoriteLength > 99 && classes.CounterSmall,
                    )}
                  >
                    {favoriteLength > 99 ? '99+' : favoriteLength}
                  </span>
                )}
                <HandySvg
                  src="/assets/icons/heart-bold.svg"
                  width={20}
                  height={24}
                />
              </div>
              Избранное
            </Link>
          </li>
          <li className={classes.Item}>
            {user ? (
              <button
                className={clsx(
                  classes.Button,
                  (isSignInOpen || isSignUpOpen) && classes.Active,
                )}
                onClick={() => {
                  router.push('/dashboard')
                  dispatch(closeCart())
                  dispatch(closeMenu())
                  dispatch(closeCatalog())
                  dispatch(closeFilter())
                  dispatch(closeFeedback())
                }}
              >
                <HandySvg
                  src="/assets/icons/user-bold.svg"
                  width={24}
                  height={24}
                />
                Профиль
              </button>
            ) : (
              <button
                className={clsx(
                  classes.Button,
                  (isSignInOpen || isSignUpOpen) && classes.Active,
                )}
                onClick={() => {
                  dispatch(modalSignInToggle())
                  if (isSignUpOpen) {
                    dispatch(modalSignUpClose())
                  }
                  dispatch(closeCart())
                  dispatch(closeMenu())
                  dispatch(closeCatalog())
                  dispatch(closeFilter())
                  dispatch(closeFeedback())
                }}
              >
                <HandySvg
                  src="/assets/icons/enter-medium.svg"
                  width={24}
                  height={24}
                />
                Войти
              </button>
            )}
          </li>
        </ul>
      </Wrapper>
    </div>
  )
}

export default Navbar
