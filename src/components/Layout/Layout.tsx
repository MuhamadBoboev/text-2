import classes from './Layout.module.scss'
import { ReactNode } from 'react'
import Modals from '@components/modals/Modals'
import Header from '@components/Layout/Header/Header'
import Footer from '@components/Layout/Footer/Footer'
import Navbar from '@components/Layout/Navbar/Navbar'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { HandySvg } from 'handy-svg'
import clsx from 'clsx'
import { openCart } from '@store/reducers/cartSlice'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import { selectCartProductsLength } from '@store/selectors/cart'
import { selectFavoritesProductsLength } from '@store/selectors/favorites'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className={classes.Content}>{children}</main>
      <Navbar />
      <Footer />
      <LayoutPanel />
      <Modals />
    </>
  )
}

export default Layout

function LayoutPanel() {
  const cartProductsLength = useAppSelector(selectCartProductsLength)
  const favoriteLength = useAppSelector(selectFavoritesProductsLength)
  const router = useRouter()

  const dispatch = useAppDispatch()

  return (
    <div className={classes.Buttons}>
      {/*Favorite Button*/}
      {favoriteLength > 0 && router.pathname !== '/favorites' && (
        <button
          className={classes.PanelButton}
          onClick={() => router.push('/favorites')}
        >
          <HandySvg
            src="/assets/icons/heart-bold.svg"
            width={36}
            height={36}
          />
          <span
            className={clsx(
              classes.Counter,
              favoriteLength.toString().length > 1 && classes.Small,
            )}
          >
            {favoriteLength > 99 ? '99+' : favoriteLength}
          </span>
        </button>
      )}

      {/*CartButton*/}
      {cartProductsLength > 0 && (
        <button
          className={classes.PanelButton}
          onClick={() => dispatch(openCart())}
        >
          <HandySvg
            src="/assets/icons/cart-bold.svg"
            width={36}
            height={36}
          />
          <span
            className={clsx(
              classes.Counter,
              cartProductsLength.toString().length > 1 && classes.Small,
            )}
          >
            {cartProductsLength > 99 ? '99+' : cartProductsLength}
          </span>
        </button>
      )}
    </div>
  )
}
