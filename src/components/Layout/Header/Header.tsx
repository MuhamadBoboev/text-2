import classes from './Header.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import Link from 'next/link'
import HamburgerMiniIcon from '@assets/icons/hamburger-mini.svg'
import SearchInput from '@ui/SearchInput/SearchInput'
import TopHeader from '@components/Layout/Header/TopHeader/TopHeader'
import CertificateIcon from '@assets/icons/certificate.svg'
import HeartIcon from '@assets/icons/heart.svg'
import CartIcon from '@assets/icons/cart.svg'
import EnterIcon from '@assets/icons/enter.svg'
import SecondCategoryNav from '@components/Layout/Header/SecondCategoryNav/SecondCategoryNav'
import Navigation from '@components/Layout/Navigation/Navigation'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  closeMenu,
  openMenu,
  toMenuGuarantees,
} from '@store/reducers/menuSlice'
import { useEffect, useState } from 'react'
import { modalSignInClose, modalSignInOpen } from '@store/reducers/signInSlice'
import { modalSignUpClose } from '@store/reducers/signUpSlice'
import { modalCallClose } from '@store/reducers/modalCall'
import { openCart, closeCart } from '@store/reducers/cartSlice'
import Catalog from '@components/Layout/Header/Catalog/Catalog'
import { useWindowSize } from 'usehooks-ts'
import { AnimatePresence } from 'framer-motion'
import { closeCatalog } from '@store/reducers/catalogSlice'
import clsx from 'clsx'
import SearchMobile from '@ui/SearchMobile/SearchMobile'
import { HandySvg } from 'handy-svg'
import { useRouter } from 'next/router'
import Burger from '@ui/Burger/Burger'
import { ICatalogMenu } from '@models/ICatalogMenu'

function Header() {
  const [logoHide, setLogoHide] = useState(false)
  const dispatch = useAppDispatch()
  const [isOpenCatalog, setIsOpenCatalog] = useState<boolean>(false)
  const { user } = useAppSelector((state) => state.user)
  const isOpenSearch = useAppSelector((state) => state.search.isOpen)
  const { pathname } = useRouter()

  const { width } = useWindowSize()

  useEffect(() => {
    setLogoHide(isOpenSearch)
  }, [isOpenSearch])

  return (
    <div className={classes.Top}>
      <TopHeader />
      <header className={classes.Header}>
        <Wrapper className={classes.Wrapper}>
          <Link
            href="/"
            className={classes.Logo}
            onClick={(event) => {
              dispatch(modalSignInClose())
              dispatch(modalSignUpClose())
              dispatch(modalCallClose())
              dispatch(closeCatalog())
              dispatch(closeCart())
              dispatch(closeMenu())

              if (pathname === '/') {
                event.preventDefault()
              }
            }}
          >
            <img
              src="/assets/img/logo.svg"
              alt="La Cite"
              width={120}
              height={44}
              className={(logoHide && classes.HideHide) || ''}
            />
          </Link>
          <button
            className={classes.ButtonCategory}
            onClick={() => {
              setIsOpenCatalog(!isOpenCatalog)
            }}
            id="catalog-menu-button"
          >
            <HamburgerMiniIcon
              width={20}
              height={20}
            />
            Каталог
          </button>

          <SearchInput
            className={clsx(
              classes.SearchInput,
              !isOpenSearch && classes.HideSearch,
            )}
          />
          <div className={classes.Buttons}>
            <button
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuGuarantees())
              }}
              className={classes.Certificate}
            >
              <CertificateIcon
                width={24}
                height={24}
              />
              Качество
            </button>
            <Link
              href="/favorites"
              className={classes.Favorites}
            >
              <HeartIcon
                width={24}
                height={24}
              />
              Избранное
            </Link>
            <button
              className={classes.Cart}
              onClick={() => dispatch(openCart())}
            >
              <CartIcon
                width={24}
                height={24}
              />
              Корзина
            </button>
            {user ? (
              <Link
                href="/dashboard"
                className={clsx(classes.Login, classes.Profile)}
              >
                <HandySvg
                  src="/assets/icons/user.svg"
                  className={classes.User}
                  width={24}
                  height={24}
                />
                Профиль
              </Link>
            ) : (
              <button
                className={classes.Login}
                onClick={() => dispatch(modalSignInOpen())}
              >
                <EnterIcon
                  width={24}
                  height={24}
                />
                Вход
              </button>
            )}
          </div>
          <div
            className={classes.LeftButton}
            id="header-left-button"
          >
            <Burger />
          </div>
          <div
            className={classes.RightButton}
            id="header-right-button"
          >
            <div>
              <SearchMobile />
            </div>
          </div>
          <Navigation />
        </Wrapper>
      </header>
      <SecondCategoryNav />
      <AnimatePresence>
        {isOpenCatalog && width >= 768 && (
          <Catalog onClose={() => setIsOpenCatalog(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header
