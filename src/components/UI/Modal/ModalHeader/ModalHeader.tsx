import classes from './ModalHeader.module.scss'
import { HTMLAttributes, ReactNode } from 'react'

interface ModalHeaderProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
}

function ModalHeader({ children, className, ...attrs }: ModalHeaderProps) {
  return (
    <header
      className={`${classes.Header} ${className || ''}`}
      {...attrs}
    >
      {children}
    </header>
  )
}

export default ModalHeader
