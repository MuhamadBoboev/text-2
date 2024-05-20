import classes from './CatalogAccordion.module.scss'
import { ReactNode, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

interface CatalogAccordionProps {
  title: string
  children: ReactNode
  link?: number
  onClose: () => void
}

function CatalogAccordion({
  children,
  title,
  link,
  onClose,
}: CatalogAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={classes.Accordion}>
      {link ? (
        <Link
          href={`/products?main_category_id=${link}`}
          className={clsx(classes.Title, isOpen && classes.Open)}
          onClick={onClose}
        >
          {title}
        </Link>
      ) : (
        <p
          className={clsx(classes.Title, isOpen && classes.Open)}
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </p>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={classes.Content}
            initial={{
              height: 0,
            }}
            animate={{
              height: 'auto',
              transition: {
                type: 'tween',
              },
            }}
            exit={{
              height: 0,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CatalogAccordion
