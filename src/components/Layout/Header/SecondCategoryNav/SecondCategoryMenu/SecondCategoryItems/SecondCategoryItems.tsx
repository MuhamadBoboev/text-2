import classes from './SecondCategoryItems.module.scss'
import { ISubCategory } from '@models/ICategory'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface SecondCategoryItemsProps {
  items: ISubCategory[]
  onClose: () => void
}

function SecondCategoryItems({ items, onClose }: SecondCategoryItemsProps) {
  const liVariants = {
    hidden: {
      opacity: 0,
    },
    animate: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.2,
      },
    }),
  }

  return (
    <ul className={classes.List}>
      {items.map(({ id, name, slug }, index) => (
        <motion.li
          initial="hidden"
          animate="animate"
          exit="hidden"
          custom={index}
          variants={liVariants}
          key={id}
          className={classes.Item}
        >
          <Link
            onClick={onClose}
            className={classes.Link}
            href={`/products?categories=${id}`}
          >
            {name}
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}

export default SecondCategoryItems
