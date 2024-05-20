import classes from './H2.module.scss'
import { HTMLAttributes, ReactNode } from 'react'

interface H2Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
  className?: string
  weight?: 700 | 800
}

function H2({ className, children, weight = 800, ...attrs }: H2Props) {
  return (
    <h2
      className={`${classes.Title} ${weight === 700 ? classes.Lite : ''} ${className || ''}`}
      {...attrs}
    >
      {children}
    </h2>
  )
}

export default H2
