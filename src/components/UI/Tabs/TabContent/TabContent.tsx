import { motion } from 'framer-motion'
import { FC, ReactNode } from 'react'
import classes from './TabContent.module.scss'

interface TabContentProps {
  id: number
  title: string
  children: ReactNode
}

const TabContent: FC<TabContentProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={classes.Body}
    >
      {children}
    </motion.div>
  )
}

export default TabContent
