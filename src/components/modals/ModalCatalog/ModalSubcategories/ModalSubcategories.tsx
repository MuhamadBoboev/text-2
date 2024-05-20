import classes from './ModalSubcategories.module.scss'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import { ICategory } from '@models/ICategory'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import BackButton from '@ui/BackButton/BackButton'
import Burger from '@ui/Burger/Burger'
import { useWindowSize } from 'usehooks-ts'
import { closeCatalog } from '@store/reducers/catalogSlice'
import BackMobile from '@ui/BackMobile/BackMobile'
import { ICatalogMenuItem } from '@models/ICatalogMenu'

interface ModalSubcategoriesProps {
  catalogName: string
  catalog: ICatalogMenuItem
  onBack: () => void
}

function ModalSubcategories({
  catalog,
  catalogName,
  onBack,
}: ModalSubcategoriesProps) {
  const { isOpen } = useAppSelector((state) => state.catalog)
  const { width } = useWindowSize()

  const breadcrumbsList: breadcrumbType[] = [
    { text: 'Каталог', isActive: false, onClick: onBack },
    { text: catalogName, isActive: false, onClick: onBack },
    { text: catalog.name, isActive: true },
  ]

  const { renderButton } = useContext(HeaderLeftButtonContext)

  useEffect(() => {
    if (width <= 480) {
      renderButton(<BackButton onClick={onBack} />)
    }
    if (!isOpen) {
      renderButton(<Burger className={classes.Burger} />)
    }
  }, [isOpen, width])

  const dispatch = useAppDispatch()

  const onClose = () => {
    dispatch(closeCatalog())
  }

  return (
    <div>
      <BackMobile
        onClick={onBack}
        isShow={isOpen}
      />
      <Breadcrumbs
        className={classes.Breadcrumbs}
        list={breadcrumbsList}
      />
      <H2 className={classes.Title}>{catalog.name}</H2>
      <Divider className={classes.Divider} />
      {catalog.subcategories && (
        <ul className={classes.List}>
          <li className={classes.Item}>
            <Link
              className={classes.Link}
              href={`/products?category_id=${catalog.id}`}
              onClick={onClose}
            >
              Все товары данной категории
            </Link>
          </li>
          {catalog.subcategories.map((subcategory) => (
            <li
              key={subcategory.id}
              className={classes.Item}
            >
              <Link
                className={classes.Link}
                href={`/products?subcategory_id=${subcategory.id}`}
                onClick={onClose}
              >
                {subcategory.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <button
        className={classes.Back}
        onClick={onBack}
      >
        Назад
      </button>
    </div>
  )
}

export default ModalSubcategories
