import classes from './Colors.module.scss'
import clsx from 'clsx'
import { ReactNode, useState } from 'react'

interface ColorProps {
  slug?: string
  name: string
  classNames?: any
}

function Color({ name, classNames, slug }: ColorProps) {
  const [isActive, setIsActive] = useState(false)
  return (
    <>
      <span
        style={{
          background: slug?.startsWith('#') ? slug : `#${slug}`,
        }}
        className={clsx(classes.Name, classNames?.name)}
      >
        {name}
        <Chip>{name}</Chip>
      </span>
    </>
  )
}

export default Color

function Chip({ children }: { children: ReactNode }) {
  return <span className={classes.Chip}>{children}</span>
}
