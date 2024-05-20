import classes from './Filters.module.scss'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import FilterBrands from '@components/Filters/FilterBrands/FilterBrands'
import { IBrand } from '@models/IBrand'
import FilterCategory from '@components/Filters/FilterCategory/FilterCategory'
import { ICatalog } from '@models/ICatalog'
import Accordion from '@ui/Accordion/Accordion'
import FilterPrices from '@components/Filters/FilterPrices/FilterPrices'
import FilterGender from '@components/Filters/FilterGender/FilterGender'
import { useAppDispatch } from '@store/hooks'
import { closeFilter } from '@store/reducers/filterSlice'
import { ICatalogMenu } from '@models/ICatalogMenu'

interface FiltersProps {
  brands: IBrand[] | null
  productsCount: number
  catalogGroup: ICatalogMenu[] | null
  range: {
    min: number
    max: number
  }
  minPrice: number
  maxPrice: number
  onClose: () => void
}

function Filters({
  productsCount,
  minPrice,
  maxPrice,
  range,
  brands,
  catalogGroup,
  onClose,
}: FiltersProps) {
  const [priceRange] = useState<{ min: number; max: number }>({
    min: range.min || minPrice,
    max: range.max || maxPrice,
  })
  const [onChanged] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    let time: any
    if (onChanged) {
      time = setTimeout(() => {
        router.query.prices = `${priceRange.min}-${priceRange.max}`
        router.push(router)
      }, 500)
    }

    return () => {
      clearTimeout(time)
    }
  }, [priceRange, onChanged])

  const onClearFilter = () => {
    // setPriceRange({
    //   min: minPrice,
    //   max: maxPrice
    // })
    // delete router.query.for_who
    // delete router.query.brands
    // delete router.query.filter
    // delete router.query.prices
    router.query = {}
    router.push(router)
    dispatch(closeFilter())
  }

  return (
    <aside className={classes.Filters}>
      <header className={classes.Header}>
        <h2 className={classes.Title}>Фильтры</h2>
        <button
          className={classes.Clear}
          onClick={onClearFilter}
        >
          Очистить
        </button>
      </header>
      <p className={classes.ProductTotalCount}>
        {productsCount === 0
          ? 'Товаров не найдено'
          : `Всего ${productsCount} товаров`}
      </p>

      <FilterCategory
        catalog={catalogGroup}
        onClose={onClose}
      />

      <FilterBrands brands={brands} />

      <FilterPrices
        maxPrice={maxPrice}
        minPrice={minPrice}
        range={range}
      />
      <FilterGender />
    </aside>
  )
}

export default Filters
