import React from 'react'
import { motion } from 'framer-motion'
import { FC } from 'react'
import classes from './TabTracker.module.scss'

interface TabTrackerProps {
  className?: string
  isStart: boolean
  isEnd: boolean
}

const TabTracker: FC<TabTrackerProps> = ({ className, isEnd, isStart }) => {
  return (
    <motion.div
      className={`${classes.Tracker} ${isStart ? classes.Start : ''} ${isEnd ? classes.End : ''} ${className || ''}`}
      layoutId="tab-tracker"
    />
  )
}

export default TabTracker
