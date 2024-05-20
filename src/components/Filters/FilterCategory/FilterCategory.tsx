import classes from './FilterCategory.module.scss'
import { ICatalog, ICatalogGroup } from '@models/ICatalog'
import Link from 'next/link'
import Divider from '@ui/Divider/Divider'
import { useRouter } from 'next/router'
import Accordion from '@ui/Accordion/Accordion'
import clsx from 'clsx'
import { ICatalogMenu, ICatalogMenuItem } from '@models/ICatalogMenu'

interface FilterCategoryProps {
  catalog: ICatalogMenu[] | null
  onClose: () => void
}

function FilterCategory({ catalog, onClose }: FilterCategoryProps) {
  const router = useRouter()

  const activeSubcategory = catalog?.find((catalogItem) => {
    return catalogItem.categories.find((category) => {
      const isActive = category.subcategories?.find(
        (subcategory) =>
          subcategory.id === Number(router.query.subcategory_id?.toString()),
      )
      if (isActive) {
        return catalogItem.id
      }
    })
  })

  const activeCategory = catalog?.find((catalogItem) => {
    return catalogItem.categories.find(
      (category) =>
        category.id === Number(router.query.category_id?.toString()),
    )?.main_category_id
  })

  if (!catalog) return null

  return (
    <div className={classes.Category}>
      <ul className={classes.List}>
        {catalog.map((category) => (
          <li
            className={classes.Item}
            key={category.id}
          >
            <Accordion
              noContent={category?.categories?.length === 0}
              onClick={() => {
                // onClose && onClose()
                // router.query = {}
                // router.query.main_category_id = category.id.toString()
                // router.push(router)
              }}
              isActive={
                Number(router.query.main_category_id?.toString()) ===
                  category.id ||
                activeSubcategory?.id === category.id ||
                activeCategory?.id === category.id
              }
              title={category.name}
            >
              <ul className={classes.SubList}>
                <li className={classes.SubItem}>
                  <button
                    className={clsx(
                      classes.Link,
                      router.query.main_category_id?.includes(
                        category.id.toString(),
                      ) && classes.ActiveSubLink,
                    )}
                    onClick={(event) => {
                      event.preventDefault()
                      onClose && onClose()
                      // router.query = {}
                      router.query.main_category_id = category.id.toString()
                      delete router.query.category_id
                      delete router.query.subcategory_id
                      router.push(router)
                    }}
                  >
                    Все товары данной категории
                  </button>
                </li>
                {category?.categories?.map((subcategory) => (
                  <li
                    key={subcategory.id}
                    className={classes.SubItem}
                  >
                    <AccordionCategory
                      category={subcategory}
                      onClose={onClose}
                    />
                  </li>
                ))}
              </ul>
            </Accordion>
          </li>
        ))}
      </ul>
      {/*<Divider className={classes.Divider}/>*/}
    </div>
  )
}

export default FilterCategory

function AccordionCategory({
  category,
  onClose,
}: {
  category: ICatalogMenuItem
  onClose: () => void
}) {
  const router = useRouter()

  if (category.subcategories?.length === 0) {
    return (
      <button
        className={clsx(
          classes.Link,
          router.query.category_id?.includes(category.id.toString()) &&
            classes.ActiveSubLink,
        )}
        onClick={(event) => {
          event.preventDefault()
          onClose && onClose()
          // router.query = {}
          delete router.query.main_category_id
          router.query.category_id = category.id.toString()
          router.push(router)
        }}
      >
        {category.name}
      </button>
    )
  }

  const activeSubcategory = category.subcategories?.find(
    (subcategory) =>
      subcategory.id === Number(router.query.subcategory_id?.toString()),
  )

  return (
    <Accordion
      title={category.name}
      className={clsx(classes.Link)}
      classNames={{
        title: [
          classes.Title,
          router.query.category_id?.includes(category.id.toString()) &&
            classes.ActiveSubLink,
        ].join(' '),
        content: classes.Content,
      }}
      clickOnButton={true}
      isActive={
        router.query.category_id?.includes(category.id.toString()) ||
        activeSubcategory?.parent_id === category.id
      }
      onClick={() => {
        onClose && onClose()
        // router.query = {}
        delete router.query.main_category_id
        router.query.category_id = category.id.toString()
        router.push(router)
      }}
    >
      <ul className={classes.AccordionList}>
        {category.subcategories?.map((subcategory) => (
          <li className={classes.Item}>
            <button
              className={clsx(
                classes.Link,
                router.query.subcategory_id?.includes(
                  subcategory.id.toString(),
                ) && classes.ActiveSubLink,
              )}
              onClick={(event) => {
                event.preventDefault()
                onClose && onClose()
                // router.query = {}
                delete router.query.category_id
                delete router.query.subcategory_id
                router.query.subcategory_id = subcategory.id.toString()
                router.push(router)
              }}
            >
              {subcategory.name}
            </button>
          </li>
        ))}
      </ul>
    </Accordion>
  )
}
