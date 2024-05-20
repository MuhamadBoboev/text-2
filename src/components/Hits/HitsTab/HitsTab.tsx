import classes from './HitsTab.module.scss'
import { AnimateSharedLayout } from 'framer-motion'
import TabTracker from '@ui/Tabs/TabHeader/TabTracker/TabTracker'
import { useMemo, useRef } from 'react'
import { useAppSelector } from '@store/hooks'
import { getMaxId } from '@utils/helpers/getMaxId/getMaxId'
import { getMinId } from '@utils/helpers/getMinId/getMinId'

interface HitsTabProps {
  activeId: number
  onSelect: (id: number) => void
}

function HitsTab({ onSelect, activeId }: HitsTabProps) {
  const { catalog } = useAppSelector((state) => state.catalog)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const headerClasses: string[] = [classes.Header]
  const listClasses: string[] = [classes.List]
  const itemClasses: string[] = [classes.Item]

  if (!catalog) return null

  const ids = useMemo(() => catalog.map((item) => item.id), [])

  return (
    <header className={headerClasses.join(' ')}>
      <AnimateSharedLayout>
        <ul className={listClasses.join(' ')}>
          {catalog.map(({ id, name }, index) => (
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
                className={`${classes.Button} ${activeId === id ? `${classes.Active}` : ''}`}
              >
                {name}
              </button>
              {activeId === id && (
                <TabTracker
                  isStart={getMinId(ids) === activeId}
                  isEnd={getMaxId(ids) === activeId}
                />
              )}
            </li>
          ))}
        </ul>
      </AnimateSharedLayout>
    </header>
  )
}

export default HitsTab
