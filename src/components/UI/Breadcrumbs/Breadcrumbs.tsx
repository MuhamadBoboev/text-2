import classes from './Breadcrumbs.module.scss'
import Link from 'next/link'
import { HTMLAttributes } from 'react'

export type breadcrumbType = {
  text: string
  link?: string
  onClick?: () => void
  isActive?: boolean
}

interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  className?: string
  active?: breadcrumbType
  list: breadcrumbType[]
}

function Breadcrumbs({ active, list, className, ...attrs }: BreadcrumbsProps) {
  return (
    <ul
      className={`${classes.List} ${className || ''}`}
      {...attrs}
    >
      {list.map(({ link, text, onClick, isActive }, index) => (
        <li
          key={index}
          className={classes.Item}
        >
          <Breadcrumb
            link={link}
            onClick={onClick}
            text={text}
            isActive={isActive}
          />
        </li>
      ))}
      {active && (
        <li className={classes.Item}>
          <Breadcrumb
            isActive={true}
            link={active.link}
            onClick={active.onClick}
            text={active.text}
          />
        </li>
      )}
    </ul>
  )
}

function Breadcrumb({ link, text, onClick, isActive }: breadcrumbType) {
  if (link) {
    return (
      <Link
        href={link}
        className={`${classes.Link} ${isActive ? classes.Active : ''}`}
      >
        {text}
      </Link>
    )
  }
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${classes.Link} ${isActive ? classes.Active : ''}`}
      >
        {text}
      </button>
    )
  }
  return (
    <span className={`${classes.Link} ${isActive ? classes.Active : ''}`}>
      {text}
    </span>
  )
}

export default Breadcrumbs
