import classes from './Volume.module.scss'
import { IAttribute } from '@models/product/attibutes'
import { Fragment } from 'react'
import clsx from 'clsx'

interface VolumeProps {
  volumes: IAttribute[]
  activeVolume: number
  setActiveVolume: (id: number) => void
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

function Volume({
  volumes,
  activeVolume,
  setActiveVolume,
  classNames,
  className,
}: VolumeProps) {
  return (
    <div className={clsx(classes.Volume, className)}>
      <h3 className={clsx(classes.Title, classNames?.title)}>Объем</h3>

      <ul className={clsx(classes.List, classNames?.list)}>
        {volumes.map(({ id, name, quantity }) => (
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
                  name="volume"
                  value={id}
                  checked={activeVolume === id}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setActiveVolume(id)
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

export default Volume
