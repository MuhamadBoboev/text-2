import { useRef } from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import TabTracker from '@ui/Tabs/TabHeader/TabTracker/TabTracker'
import classes from './TabHeader.module.scss'

interface TabHeaderProps {
  tabs: {
    id: number
    title: string
  }[]
  activeId: number
  onSelect: (id: number) => void
  classNames?: {
    header?: string
    list?: string
    item?: string
    button?: string
    activeButton?: string
    tracker?: string
  }
}

function TabHeader({ tabs, activeId, onSelect, classNames }: TabHeaderProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const headerClasses: string[] = [classes.Header]
  const listClasses: string[] = [classes.List]
  const itemClasses: string[] = [classes.Item]
  if (classNames?.header) headerClasses.push(classNames.header)
  if (classNames?.list) listClasses.push(classNames.list)
  if (classNames?.item) itemClasses.push(classNames.item)

  // console.log(activeId)

  return (
    <header className={headerClasses.join(' ')}>
      <AnimateSharedLayout>
        <ul className={listClasses.join(' ')}>
          {tabs.map(({ id, title }, index) => (
            <li
              key={id}
              className={itemClasses.join(' ')}
            >
              <button
                type="button"
                ref={id === activeId ? buttonRef : null}
                onClick={() => {
                  onSelect(id)
                }}
                className={`${classes.Button} ${classNames?.button ? classNames.button : ''} ${activeId === id ? `${classes.Active} ${classNames?.activeButton ? classNames?.activeButton : ''}` : ''}`}
              >
                {title}
              </button>
              {activeId === id && (
                <TabTracker
                  isStart={index === 0}
                  isEnd={tabs.length - 1 === index}
                  className={classNames?.tracker}
                />
              )}
            </li>
          ))}
        </ul>
      </AnimateSharedLayout>
    </header>
  )
}

export default TabHeader
