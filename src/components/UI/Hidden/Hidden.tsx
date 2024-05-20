import classes from './Hidden.module.scss'
import { HTMLAttributes, ReactNode } from 'react'

interface HiddenProps extends HTMLAttributes<HTMLElement> {
  className?: string
  children: ReactNode
  tagName?: 'div' | 'span'
}

function Hidden({
  tagName = 'div',
  className,
  children,
  ...keys
}: HiddenProps) {
  const Tag = tagName

  return (
    <Tag
      className={`${classes.Hidden} ${className || ''}`}
      {...keys}
    >
      {children}
    </Tag>
  )
}

export default Hidden
