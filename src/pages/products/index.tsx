import classes from '@styles/page/CategoryPage.module.scss'
import CatalogProducts from '@components/CatalogProducts/CatalogProducts'
import { GetServerSideProps } from 'next'
import { getCategoryByQuery } from '@utils/requests/getCategory'
import Wrapper from '@ui/Wrapper/Wrapper'
import Breadcrumbs, { breadcrumbType } from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Filters from '@components/Filters/Filters'
import { IResponse } from '@models/IResponse'
import { IProduct } from '@models/product/IProduct'
import Divider from '@ui/Divider/Divider'
import { useRouter } from 'next/router'
import Pagination from '@ui/Pagination/Pagination'
import { getBrands } from '@utils/requests/getBrands'
import { IBrand } from '@models/IBrand'
import { useEffect, useRef, useState } from 'react'
import { Option, Select2 } from '@ui/Select2/Select2'
import clsx from 'clsx'
import Button from '@ui/Button/Button'
import { HandySvg } from 'handy-svg'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  closeFilter,
  openFilter,
  toggleFilter,
} from '@store/reducers/filterSlice'
import { closeMenu } from '@store/reducers/menuSlice'
import { closeCatalog } from '@store/reducers/catalogSlice'
import { closeCart } from '@store/reducers/cartSlice'
import { modalSignInClose } from '@store/reducers/signInSlice'
import { modalSignUpClose } from '@store/reducers/signUpSlice'
import Head from 'next/head'
import BrandBanner from '@components/CatalogProducts/BrandBanner/BrandBanner'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const categories = await getCategoryByQuery({
    per_page: 12,
    categories: context.query?.categories,
    brands: context.query?.brands,
    prices: context.query?.prices,
    page: context.query?.page,
    price: context.query?.price?.toString(),
    q: context.query?.q?.toString(),
    forWho: context.query?.for_who?.toString(),
    type: context.query?.type?.toString(),
    main_category_id: context.query.main_category_id,
    category_id: context.query.category_id,
    subcategory_id: context.query.subcategory_id,
    has_discount: context.query.has_discount?.toString(),
  })
  const brands = await getBrands()

  const pricesQuery = context.query.prices
  let prices = {
    min: 0,
    max: 10000,
  }

  if (pricesQuery && !Array.isArray(pricesQuery)) {
    const [min, max] = pricesQuery.split('-')

    prices = {
      min: Number.isNaN(+min) ? 0 : +min,
      max: Number.isNaN(+max) ? 0 : +max,
    }
  }

  if (!categories) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      categories,
      prices,
      brands,
      initialPage: context.query.page || null,
    },
  }
}

interface ICategories extends IResponse {
  data: IProduct[]
}

interface CategoryProps {
  categories: ICategories
  prices: { min: number; max: number }
  brands: IBrand[] | null
  // catalogGroup: ICatalogMenu[] | null
  initialPage?: number
}

function CategoryPage({
  categories,
  prices,
  brands,
  initialPage,
}: CategoryProps) {
  const pageRouter = useRouter()
  const { catalog } = useAppSelector((state) => state.catalog)
  const [filter, setFilter] = useState<
    'high_low' | 'low_high' | 'latest' | null
  >(null)
  const [activePage, setActivePage] = useState<number | undefined>(
    initialPage ? initialPage - 1 : undefined,
  )
  const { isOpen } = useAppSelector((state) => state.filter)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (filter !== null) {
      if (filter === 'latest') {
        delete pageRouter.query.price
        delete pageRouter.query.page
        pageRouter.push(pageRouter)
      } else {
        delete pageRouter.query.price
        pageRouter.query.price = filter
        pageRouter.push(pageRouter)
      }
    }
  }, [filter])

  useEffect(() => {
    if (!Array.isArray(pageRouter.query.page)) {
      setActivePage(pageRouter.query.page ? +pageRouter.query.page - 1 : 0)
    }
  }, [pageRouter])

  const handlePageClick = (event: { selected: number }) => {
    pageRouter.query.page = (event.selected + 1).toString()
    pageRouter.push(pageRouter)
  }

  const filterRef = useRef(null)

  const onClose = () => dispatch(closeFilter())

  let activePageTitle: string | undefined

  let selectedCategory: undefined | string
  let categoryId: string | undefined = pageRouter.query.category_id?.toString()
  let mainCategoryId: string | undefined =
    pageRouter.query.main_category_id?.toString()
  let subCategoryId: string | undefined =
    pageRouter.query.subcategory_id?.toString()

  const categoriesTree: {
    mainCategory: { id: number; name: string } | null
    category: { id: number; name: string } | null
    subCategory: { id: number; name: string } | null
  } = {
    mainCategory: null,
    category: null,
    subCategory: null,
  }

  const checkPathname = () => {
    const query = pageRouter.query
    return (
      !query.prices &&
      !query.has_discount &&
      !query.for_who &&
      !query.type &&
      !query.brands
    )
  }

  if (checkPathname()) {
    catalog?.forEach((mainCategory) => {
      if (mainCategoryId) {
        if (mainCategory.id === +mainCategoryId) {
          activePageTitle = mainCategory.name
          categoriesTree.mainCategory = {
            id: mainCategory.id,
            name: mainCategory.name,
          }
        }
      }

      mainCategory.categories?.forEach((category) => {
        if (categoryId) {
          if (category.id === +categoryId) {
            activePageTitle = category.name
            categoriesTree.category = {
              id: category.id,
              name: category.name,
            }

            if (category.main_category_id === mainCategory.id) {
              categoriesTree.mainCategory = {
                id: mainCategory.id,
                name: mainCategory.name,
              }
            }
          }
        }

        if (subCategoryId) {
          category.subcategories?.forEach((subCategory) => {
            if (subCategoryId) {
              if (subCategory.id === +subCategoryId) {
                activePageTitle = subCategory.name
                categoriesTree.subCategory = {
                  id: subCategory.id,
                  name: subCategory.name,
                }
                if (subCategory.parent_id === category.id) {
                  categoriesTree.category = {
                    id: category.id,
                    name: category.name,
                  }
                }
                if (subCategory.main_category_id === mainCategory.id) {
                  categoriesTree.mainCategory = {
                    id: mainCategory.id,
                    name: mainCategory.name,
                  }
                }
              }
            }
          })
        }
      })
    })
  }

  const toggle = () => {
    dispatch(closeMenu())
    dispatch(closeCatalog())
    dispatch(closeCart())
    dispatch(modalSignInClose())
    dispatch(modalSignUpClose())
    dispatch(closeMenu())
    dispatch(toggleFilter())
  }

  let list: breadcrumbType[] = [
    {
      text: 'Главная',
      link: '/',
    },
  ]

  if (categoriesTree.mainCategory) {
    list.push({
      text: categoriesTree.mainCategory.name,
      link:
        !categoriesTree.category && !categoriesTree.subCategory
          ? undefined
          : `/products?main_category_id=${categoriesTree.mainCategory.id}`,
      isActive: !categoriesTree.category && !categoriesTree.subCategory,
    })
  }

  if (categoriesTree.category) {
    list.push({
      text: categoriesTree.category.name,
      link: !categoriesTree.subCategory
        ? undefined
        : `/products?category_id=${categoriesTree.category.id}`,
      isActive: !categoriesTree.subCategory,
    })
  }

  if (categoriesTree.subCategory) {
    list.push({
      text: categoriesTree.subCategory.name,
      link: `/products?subcategory_id=${categoriesTree.subCategory.id}`,
      isActive: true,
    })
  }

  let brandName: string | undefined
  let brandFound: IBrand | undefined

  if (pageRouter.query.brands && Object.keys(pageRouter.query).length === 1) {
    brands?.forEach((brand) => {
      if (pageRouter.query.brands) {
        if (brand.id === +pageRouter.query.brands) {
          activePageTitle = brand.name
          brandName = brand.name
          brandFound = brand
          list.push({
            text: brand.name,
            isActive: true,
          })
        }
      }
    })
  }

  if (
    !categoriesTree.mainCategory &&
    !categoriesTree.category &&
    !categoriesTree.subCategory &&
    !brandName &&
    pageRouter.asPath !== '/products'
  ) {
    list = [
      {
        text: 'Главная',
        link: '/',
      },
      {
        text: 'Результат поиска',
        isActive: true,
      },
    ]
  }

  switch (pageRouter.asPath) {
    case '/products?type=4':
      activePageTitle = 'Новинки'
      list = [
        {
          text: 'Главная',
          link: '/',
        },
        {
          text: 'Новинки',
          isActive: true,
        },
      ]
      break
    case '/products?type=1':
      activePageTitle = 'Акции'
      list = [
        {
          text: 'Главная',
          link: '/',
        },
        {
          text: 'Акции',
          isActive: true,
        },
      ]
      break
    case '/products?has_discount=1':
      activePageTitle = 'Скидки'
      list = [
        {
          text: 'Главная',
          link: '/',
        },
        {
          text: 'Скидки',
          isActive: true,
        },
      ]
      break
    case '/products?type=2':
      activePageTitle = 'Хиты продаж'
      list = [
        {
          text: 'Главная',
          link: '/',
        },
        {
          text: 'Хиты продаж',
          isActive: true,
        },
      ]
      break
    case '/products':
      activePageTitle = 'Наши товары'
      list = [
        {
          text: 'Главная',
          link: '/',
        },
        {
          text: 'Наши товары',
          isActive: true,
        },
      ]
      break
    case '/products?for_who=1':
      activePageTitle = 'Для него'
      list = [
        {
          text: 'Главная',
          link: '/',
        },
        {
          text: 'Для него',
          isActive: true,
        },
      ]
      break
    case '/products?for_who=2':
      activePageTitle = 'Для неё'
      list = [
        {
          text: 'Главная',
          link: '/',
        },
        {
          text: 'Для неё',
          isActive: true,
        },
      ]
      break
    case '/products?for_who=5':
      activePageTitle = 'Для всех'
      list = [
        {
          text: 'Главная',
          link: '/',
        },
        {
          text: 'Для всех',
          isActive: true,
        },
      ]
      break
  }

  return (
    <Wrapper className={classes.Wrapper}>
      <Head>
        <title>
          {`${activePageTitle || 'Результат поиска'} | La Cite` ||
            'Результат поиска | La Cite'}
        </title>
      </Head>
      <button
        className={classes.FilterButtonMobile}
        onClick={toggle}
      >
        {isOpen ? (
          <HandySvg
            src="/assets/icons/close-lite.svg"
            width={24}
            height={24}
          />
        ) : (
          <HandySvg
            src="/assets/icons/sliders-horizontal.svg"
            width={24}
            height={24}
          />
        )}
      </button>
      {isOpen && (
        <div
          className={classes.Backdrop}
          onClick={onClose}
        />
      )}
      <div
        className={clsx(classes.Filters, isOpen && classes.OpenFilters)}
        ref={filterRef}
      >
        <button
          className={classes.Close}
          onClick={() => {
            dispatch(closeFilter())
          }}
        >
          <HandySvg
            src="/assets/icons/close-lite.svg"
            width={12}
            height={12}
          />
        </button>
        <Filters
          onClose={onClose}
          range={{
            min: prices.min,
            max: prices.max,
          }}
          catalogGroup={catalog}
          brands={brands}
          productsCount={categories.meta.total}
          minPrice={0}
          maxPrice={10000}
        />
      </div>
      <div className={classes.Right}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={list}
        />
        <header className={classes.Header}>
          <H2 className={classes.Title}>
            {selectedCategory || activePageTitle || 'Результат поиска:'}{' '}
          </H2>
          <Button
            className={classes.FilterButton}
            onClick={() => dispatch(openFilter())}
          >
            <HandySvg
              src="/assets/icons/sliders-horizontal.svg"
              width={16}
              height={16}
            />
            Фильтры
          </Button>
          <Select2
            onChange={(event: any) => {
              setFilter(event.target.value)
            }}
          >
            <Option isPlaceholder>Сортировать</Option>
            <Option
              value="latest"
              selected={pageRouter.query.price === 'latest'}
            >
              По умолчанию
            </Option>
            <Option
              value="low_high"
              selected={pageRouter.query.price === 'low_high'}
            >
              По возрастанию
            </Option>
            <Option
              value="high_low"
              selected={pageRouter.query.price === 'high_low'}
            >
              По убыванию
            </Option>
          </Select2>
        </header>
        <Divider className={classes.Divider} />
        {brandFound && <BrandBanner brand={brandFound} />}
        <CatalogProducts products={categories.data} />
        <Pagination
          pageCount={categories.meta.last_page}
          className={classes.Pagination}
          handlePageClick={handlePageClick}
          forcePage={(categories.meta.current_page || 1) - 1}
        />
      </div>
    </Wrapper>
  )
}

export default CategoryPage
