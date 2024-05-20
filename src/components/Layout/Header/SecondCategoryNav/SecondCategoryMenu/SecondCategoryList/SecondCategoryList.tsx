import classes from './SecondCategoryList.module.scss'
import { ICategory, ISubCategory } from '@models/ICategory'
import { LayoutGroup, motion } from 'framer-motion'
import { ICatalogCategory } from '@models/ICatalog'
import Link from 'next/link'

interface SecondCategoryListProps {
  categoryList: ICatalogCategory[]
  activeId: number
  selectCategory: (id: number) => void
  onClose: () => void
}

function SecondCategoryList({
  categoryList,
  selectCategory,
  activeId,
  onClose,
}: SecondCategoryListProps) {
  return (
    <ul className={classes.List}>
      <LayoutGroup id="second-category-dots">
        {categoryList.map(({ id, name }, index) => (
          <li
            className={classes.Item}
            key={index}
          >
            <Link
              href={`/products?categories=${id}`}
              onMouseEnter={() => selectCategory(id)}
              className={`${classes.Button} ${activeId === id ? classes.ActiveButton : ''}`}
              onClick={onClose}
            >
              {activeId === id && (
                <motion.span
                  transition={{
                    duration: 0.2,
                  }}
                  layoutId="dot"
                  className={classes.Dot}
                ></motion.span>
              )}
              {name}
            </Link>
          </li>
        ))}
      </LayoutGroup>
    </ul>
  )
}

export default SecondCategoryList
