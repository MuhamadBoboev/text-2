import classes from './Size.module.scss'
import { IAttribute } from '@models/product/attibutes'
import { Fragment } from 'react'
import clsx from 'clsx'

interface SizeProps {
  sizes: IAttribute[]
  activeSize: number
  setActiveSize: (id: number) => void
  className?: string
  classNames?: {
    title?: string
    list?: string
    item?: string
    label?: string
    input?: string
    name?: string
  }
}

function Size({
  setActiveSize,
  activeSize,
  sizes,
  className,
  classNames,
}: SizeProps) {
  return (
    <div className={clsx(classes.Volume, className)}>
      <h3 className={clsx(classes.Title, classNames?.title)}>Размер</h3>

      <ul className={clsx(classes.List, classNames?.list)}>
        {sizes.map(({ id, quantity, name }) => (
          <Fragment key={id}>
            <li
              key={id}
              className={clsx(classes.Item, classNames?.item)}
            >
              <label className={clsx(classes.Label, classNames?.label)}>
                <input
                  disabled={quantity === 0}
                  className={clsx(classes.Radio, classNames?.input)}
                  type="radio"
                  name="size"
                  value={id}
                  checked={activeSize === id}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setActiveSize(id)
                    }
                  }}
                />
                <span className={clsx(classes.Name, classNames?.name)}>
                  {name}
                </span>
              </label>
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export default Size
