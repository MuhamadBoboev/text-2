import classes from './Tag.module.scss'
import { HTMLAttributes, ReactNode } from 'react'

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color: 'red' | 'green' | 'hit' | 'promotion' | 'new'
  className?: string
  children: ReactNode
}

function Tag({ children, className, color, ...attrs }: TagProps) {
  const cls = [classes.Tag]

  if (className) cls.push(className)

  switch (color) {
    case 'green':
      cls.push(classes.Green)
      break
    case 'red':
      cls.push(classes.Red)
      break
    case 'hit':
      cls.push(classes.Hit)
      break
    case 'new':
      cls.push(classes.New)
      break
    case 'promotion':
      cls.push(classes.Promotion)
      break
  }

  return (
    <span
      className={cls.join(' ')}
      {...attrs}
    >
      {children}
    </span>
  )
}

export default Tag
