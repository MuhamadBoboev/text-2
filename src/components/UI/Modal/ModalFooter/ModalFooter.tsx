import classes from './ModalFooter.module.scss'
import { HTMLAttributes, ReactNode } from 'react'

interface ModalFooterProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
}

function ModalFooter({ children, className, ...attrs }: ModalFooterProps) {
  return (
    <footer
      className={`${classes.Footer} ${className || ''}`}
      {...attrs}
    >
      {children}
    </footer>
  )
}

export default ModalFooter
