import classes from './Button.module.scss'
import { FC, forwardRef, ReactNode } from 'react'
import Link from 'next/link'

interface ButtonProps {
  children: ReactNode
  className?: string
  tagName?: 'a' | 'button' | 'link'
  background?: 'transparent' | 'white' | 'primary' | 'more'
  color?: 'white' | 'black' | 'secondary'
  size?: 100 | 'default'
  padding?: 16 | 12 | 10
  withBorder?: 'white' | 'primary' | 'black' | 'gray' | 'secondary'

  [key: string]: any
}

const Button: FC<ButtonProps> = forwardRef(
  (
    {
      tagName: Tag = 'button',
      padding = 16,
      size = 'default',
      background = 'primary',
      color = 'white',
      children,
      className,
      withBorder,
      ...keys
    },
    ref: any,
  ) => {
    const cls = [classes.Button]

    if (className) cls.push(className)

    switch (background) {
      case 'transparent':
        cls.push(classes.Transparent)
        break
      case 'more':
        cls.push(classes.More)
        break
      case 'white':
        cls.push(classes.White)
        break
    }

    switch (color) {
      case 'black':
        cls.push(classes.BlackColor)
        break
      case 'secondary':
        cls.push(classes.SecondaryColor)
        break
    }

    if (size === 100) cls.push(classes.Grow)

    switch (padding) {
      case 12:
        cls.push(classes.Padding12)
        break
      case 10:
        cls.push(classes.Padding10)
        break
    }

    if (withBorder) {
      cls.push(classes.Border)
    }

    switch (withBorder) {
      case 'white':
        cls.push(classes.BorderWhite)
        break
      case 'primary':
        cls.push(classes.BorderPrimary)
        break
      case 'black':
        cls.push(classes.BorderBlack)
        break
      case 'gray':
        cls.push(classes.BorderGray)
        break
      case 'secondary':
        cls.push(classes.BorderSecondary)
        break
    }

    if (Tag === 'link') {
      return (
        <Link
          href={keys.href || '/'}
          className={cls.join(' ')}
          ref={ref}
          {...keys}
        >
          {children}
        </Link>
      )
    }

    return (
      <Tag
        className={cls.join(' ')}
        ref={ref}
        {...keys}
      >
        {children}
      </Tag>
    )
  },
)

export default Button
