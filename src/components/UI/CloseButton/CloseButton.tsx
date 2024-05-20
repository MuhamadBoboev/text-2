import classes from './CloseButton.module.scss'
import { HTMLAttributes } from 'react'

interface CloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string
}

function CloseButton({ className, ...attrs }: CloseButtonProps) {
  return (
    <button
      className={`${classes.Close} ${className || ''}`}
      {...attrs}
    />
  )
}

export default CloseButton
