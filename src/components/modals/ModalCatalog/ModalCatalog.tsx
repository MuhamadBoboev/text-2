import classes from './ModalCatalog.module.scss'
import Modal from '@ui/Modal/Modal'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { closeCatalog } from '@store/reducers/catalogSlice'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import CatalogAccordion from '@components/modals/ModalCatalog/CatalogAccordion/CatalogAccordion'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import ModalSubcategories from '@components/modals/ModalCatalog/ModalSubcategories/ModalSubcategories'
import BackButton from '@ui/BackButton/BackButton'
import { HeaderLeftButtonContext } from '@components/Layout/Header/HeaderLeftButton'
import Burger from '@ui/Burger/Burger'
import BackMobile from '@ui/BackMobile/BackMobile'
import { ICatalogMenu, ICatalogMenuItem } from '@models/ICatalogMenu'

interface ModalCatalogProps {
  catalogMenu: ICatalogMenu[]
}

function ModalCatalog({ catalogMenu }: ModalCatalogProps) {
  const { isOpen } = useAppSelector((state) => state.catalog)
  const dispatch = useAppDispatch()
  const { renderButton } = useContext(HeaderLeftButtonContext)
  const onClose = () => {
    dispatch(closeCatalog())
  }

  const [activeCategory, setActiveCategory] = useState<ICatalogMenuItem | null>(
    null,
  )
  const [activeCatalogName, setActiveCatalogName] = useState<
    string | undefined
  >(undefined)

  useEffect(() => {
    if (isOpen) {
      renderButton(<BackButton onClick={onClose} />)
    }
  }, [isOpen])

  return (
    <Modal
      classNames={{ modal: classes.Modal }}
      isOpen={isOpen}
      onClose={onClose}
      onUnmount={() => {
        setActiveCategory(null)
        renderButton(<Burger className={classes.Burger} />)
      }}
    >
      <BackMobile
        onClick={onClose}
        isShow={isOpen}
      />
      {activeCategory ? (
        <ModalSubcategories
          catalogName={activeCatalogName || ''}
          catalog={activeCategory}
          onBack={() => setActiveCategory(null)}
        />
      ) : (
        <>
          <H2 className={classes.Title}>Каталог товаров</H2>
          <Divider className={classes.Divider} />
          {catalogMenu.map((catalog) => (
            <CatalogAccordion
              link={catalog.categories.length === 0 ? catalog.id : undefined}
              key={catalog.id}
              title={catalog.name}
              onClose={onClose}
            >
              <ul className={classes.List}>
                <li className={classes.Item}>
                  <Link
                    onClick={onClose}
                    className={classes.Link}
                    href={`/products?main_category_id=${catalog.id}`}
                  >
                    Все товары данной категории
                  </Link>
                </li>
                {catalog.categories.map((category) => {
                  if (category.subcategories?.length !== 0) {
                    return (
                      <li
                        key={category.id}
                        className={classes.Item}
                        onClick={() => {
                          setActiveCategory(category)
                          setActiveCatalogName(catalog.name)
                        }}
                      >
                        {category.name}
                      </li>
                    )
                  } else {
                    return (
                      <li
                        key={category.id}
                        className={classes.Item}
                      >
                        <Link
                          onClick={onClose}
                          className={classes.Link}
                          href={`/products?category_id=${category.id}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    )
                  }
                })}
              </ul>
            </CatalogAccordion>
          ))}
        </>
      )}
    </Modal>
  )
}

export default ModalCatalog
