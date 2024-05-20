import classes from './CatalogQuickLinks.module.scss'
import { LayoutGroup, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { getMinId } from '@utils/helpers/getMinId/getMinId'
import CatalogCategories from '@components/Layout/Header/Catalog/CatalogQuickLinks/CatalogCategories/CatalogCategories'
import Link from 'next/link'
import { ICatalogMenu } from '@models/ICatalogMenu'

interface CatalogQuickLinksProps {
  categories: ICatalogMenu[]
  onClose: () => void
}

function CatalogQuickLinks({ categories, onClose }: CatalogQuickLinksProps) {
  const minId = useMemo(() => categories[0] && categories[0].id, [categories])
  const [activeId, setActiveId] = useState(minId)

  useEffect(() => {
    setActiveId(minId)
  }, [categories])

  const selectCategory = (id: number) => setActiveId(id)
  const activeQuickLink = categories.find((quick) => quick.id === activeId)

  return (
    <div className={classes.Wrapper}>
      <ul className={classes.List}>
        <LayoutGroup id="second-category-dots">
          {categories.map(({ id, name, order }, index) => (
            <li
              className={classes.Item}
              key={index}
            >
              <Link
                href={`/products?main_category_id=${id}`}
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
      {activeQuickLink && (
        <CatalogCategories
          items={[...activeQuickLink.categories].sort((a, b) =>
            (a.order || 0) > (b.order || 0) ? 1 : -1,
          )}
          onClose={onClose}
        />
      )}
    </div>
  )
}

export default CatalogQuickLinks
