import classes from './ModalContent.module.scss'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
interface ModalContentProps {
  children: ReactNode
  className?: string

  [key: string]: any

  isForm?: boolean
}

function ModalContent({
  children,
  className,
  isForm,
  ...attrs
}: ModalContentProps) {
  if (isForm) {
    return (
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={clsx(classes.Content, className)}
        {...attrs}
      >
        {children}
      </motion.form>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={clsx(classes.Content, className)}
        {...attrs}
      >
        {children}
      </motion.div>
      <div className={classes.Shadow} />
    </>
  )
}

export default ModalContent
