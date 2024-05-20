import classes from './CatalogCategories.module.scss'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ICatalogMenuItem } from '@models/ICatalogMenu'

interface SecondCategoryItemsProps {
  items: ICatalogMenuItem[]
  onClose: () => void
}

function CatalogCategories({ items, onClose }: SecondCategoryItemsProps) {
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
      {items.map(({ name, slug, id, subcategories, order }, index) => (
        <motion.li
          initial="hidden"
          animate="animate"
          exit="hidden"
          custom={index}
          variants={liVariants}
          key={index}
          className={classes.Item}
        >
          <Link
            onClick={onClose}
            className={classes.CategoryLink}
            href={`/products?category_id=${id}`}
          >
            {name}
          </Link>

          {subcategories && subcategories.length !== 0 && (
            <ul className={classes.Subcategories}>
              {subcategories.map(({ name, id, slug }, index) => (
                <li
                  key={index}
                  className={classes.Subcategory}
                >
                  <Link
                    href={`/products?subcategory_id=${id}`}
                    className={classes.SubcategoryLink}
                    onClick={onClose}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </motion.li>
      ))}
    </ul>
  )
}

export default CatalogCategories
