import classes from './ModalDivider.module.scss'
import Divider from '@ui/Divider/Divider'
import { HTMLAttributes } from 'react'
import clsx from 'clsx'

interface ModalDividerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

function ModalDivider({ className, ...props }: ModalDividerProps) {
  return (
    <Divider
      className={clsx(classes.Divider, className)}
      {...props}
    />
  )
}

export default ModalDivider
