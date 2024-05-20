import classes from './Divider.module.scss'
import { HTMLAttributes } from 'react'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

function Divider({ className, ...attrs }: DividerProps) {
  return (
    <div
      className={`${classes.Divider} ${className || ''}`}
      {...attrs}
    />
  )
}

export default Divider
