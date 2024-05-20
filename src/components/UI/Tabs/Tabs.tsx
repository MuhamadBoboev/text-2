import React, { ReactNode, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TabHeader from '@ui/Tabs/TabHeader/TabHeader'
import { getMinId } from '@utils/helpers/getMinId/getMinId'
import classes from './Tabs.module.scss'
import clsx from 'clsx'

interface TabsProps {
  children: ReactNode
  className?: string
  classNames?: {
    tracker?: string
    header?: string
    list?: string
    item?: string
    button?: string
    activeButton?: string
  }
  defaultActive?: number
  active?: number | null
  setActive?: (id: number) => void
}

function Tabs({
  children,
  classNames,
  defaultActive,
  className,
  active,
  setActive,
}: TabsProps) {
  const tabsHeader: { id: number; title: string }[] = useMemo(
    () =>
      Array.isArray(children)
        ? children.map(({ props: { title, id } }) => {
            return { title, id }
          })
        : [],
    [children],
  )

  const findId: number | undefined = tabsHeader.find(
    (item) => item.id === defaultActive,
  )?.id

  const [activeId, setActiveId] = useState(
    active || findId || getMinId(tabsHeader.map((tabs) => tabs.id)),
  )

  const onSelect = (id: number) => {
    if (setActive) {
      setActive(id)
    } else {
      setActiveId(id)
    }
  }

  return (
    <div className={clsx(classes.Tabs, className)}>
      <TabHeader
        tabs={tabsHeader}
        activeId={active || activeId}
        onSelect={onSelect}
        classNames={classNames}
      />
      <AnimatePresence>
        <motion.div
          initial={{
            x: -50,
          }}
          transition={{
            duration: 0.5,
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: -50,
          }}
        >
          {Array.isArray(children) &&
            children.find(({ props: { id } }) => id === (active || activeId))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Tabs
