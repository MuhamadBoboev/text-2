import classes from './Burger.module.scss'
import { HTMLAttributes } from 'react'
import HamburgerIcon from '@assets/icons/hamburger.svg'
import { useAppDispatch } from '@store/hooks'
import { openMenu } from '@store/reducers/menuSlice'
import { closeCatalog } from '@store/reducers/catalogSlice'
import { modalSignInClose } from '@store/reducers/signInSlice'
import { modalSignUpClose } from '@store/reducers/signUpSlice'
import { closeCart } from '@store/reducers/cartSlice'
import { closeFilter } from '@store/reducers/filterSlice'

interface BurgerProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
}

function Burger({ className, ...keys }: BurgerProps) {
  const dispatch = useAppDispatch()

  return (
    <button
      className={`${classes.Burger} ${className || ''}`}
      aria-label="Открыть меню"
      onClick={() => {
        dispatch(closeCatalog())
        dispatch(openMenu())
        dispatch(modalSignInClose())
        dispatch(modalSignUpClose())
        dispatch(closeCatalog())
        dispatch(closeCart())
        dispatch(closeFilter())
      }}
      {...keys}
    >
      <HamburgerIcon />
    </button>
  )
}

export default Burger
