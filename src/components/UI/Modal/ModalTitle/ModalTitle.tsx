import classes from './ModalTitle.module.scss'
import H2 from '@ui/Typography/H2/H2'
import { HTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  className?: string
  children: ReactNode
}

function ModalTitle({ children, className, ...props }: ModalTitleProps) {
  return (
    <H2
      weight={700}
      className={clsx(classes.Title, className)}
      {...props}
    >
      {children}
    </H2>
  )
}

export default ModalTitle
