import classes from './BackButton.module.scss'
import { HTMLAttributes } from 'react'
import BackIcon from '@assets/icons/back.svg'

interface BackButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
}

function BackButton({ className, ...keys }: BackButtonProps) {
  return (
    <button
      className={`${classes.Back} ${className || ''}`}
      {...keys}
    >
      <BackIcon />
    </button>
  )
}

export default BackButton
