import classes from './Accordion.module.scss'
import { ReactNode, useRef, useState } from 'react'
import clsx from 'clsx'
import { useOnClickOutside } from 'usehooks-ts'
import { AnimatePresence, motion } from 'framer-motion'

interface AccordionProps {
  title: string
  children: ReactNode
  className?: string
  onClick?: () => void
  isActive?: boolean
  classNames?: {
    title?: string
    content?: string
  }
  onClickOutside?: boolean
  clickOnButton?: boolean
  noContent?: boolean
}

function Accordion({
  children,
  classNames,
  className,
  title,
  onClick,
  isActive,
  onClickOutside = true,
  clickOnButton = false,
  noContent,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(isActive)
  const ref = useRef(null)

  // useOnClickOutside(ref, () => {
  //   onClickOutside && setIsOpen(false)
  // })

  return (
    <div
      className={clsx(classes.Accordion, className)}
      ref={ref}
    >
      <div
        className={clsx(classes.Title, classNames?.title)}
        onClick={() => {
          if (!noContent) {
            setIsOpen(!isOpen)
          }
        }}
      >
        <button
          className={classes.Button}
          onClick={(event) => {
            if (clickOnButton) {
              event.stopPropagation()
              event.preventDefault()
            }
            onClick && onClick()
          }}
        >
          {title}
        </button>
        {!noContent && (
          <div className={classes.Open}>
            <span className={clsx(classes.Icon, isOpen && classes.OpenIcon)} />
          </div>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
            }}
            animate={{
              height: 'auto',
            }}
            exit={{
              height: 0,
            }}
            className={clsx(classes.Content, classNames?.content)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Accordion
