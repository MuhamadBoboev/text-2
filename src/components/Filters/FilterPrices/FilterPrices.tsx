import classes from './FilterPrices.module.scss'
import Slider from 'rc-slider'
import Accordion from '@ui/Accordion/Accordion'
import Checkbox from '@ui/Checkbox/Checkbox'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface FilterPricesProps {
  minPrice: number
  maxPrice: number

  range: {
    min: number
    max: number
  }
}

function FilterPrices({ minPrice, maxPrice, range }: FilterPricesProps) {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: range.min || minPrice,
    max: range.max || maxPrice,
  })
  const [onChanged, setOnChanged] = useState(false)

  const priceList = [
    '0-500',
    '500-1000',
    '1000-2000',
    '2000-4000',
    '4000-10000',
  ]

  const router = useRouter()
  const [prices, setPrices] = useState<string | null>(null)

  useEffect(() => {
    if (prices) {
      const [min, max] = prices.split('-')
      setOnChanged(true)
      setPriceRange({
        min: isNaN(+min) ? minPrice : +min,
        max: isNaN(+max) ? maxPrice : +max,
      })
    }
  }, [prices])

  useEffect(() => {
    let time: any
    if (onChanged) {
      time = setTimeout(() => {
        router.query.prices = `${priceRange.min}-${priceRange.max}`
        delete router.query.page
        router.push(router)
      }, 50)
    }

    return () => {
      clearTimeout(time)
    }
  }, [priceRange, onChanged])

  return (
    <Accordion
      onClickOutside={false}
      isActive={true}
      title="Стоимость"
    >
      <ul className={classes.List}>
        {priceList.map((price) => (
          <li
            key={price}
            className={classes.Item}
          >
            <Checkbox
              type="checkbox"
              className={classes.Checkbox}
              value={price}
              name="price-range"
              checked={router.query.prices === price}
              classNames={{
                text: classes.Price,
              }}
              onChange={(event: any) => {
                if (event.target.checked) {
                  setPrices(event.target.value || `${minPrice}-${maxPrice}`)
                } else {
                  setPrices(`${minPrice}-${maxPrice}`)
                }
              }}
            >
              {price === '4000-10000'
                ? '4000 сомони и более'
                : `${price} сомони`}
            </Checkbox>
          </li>
        ))}
      </ul>
      <Slider
        className={classes.Range}
        range
        min={minPrice}
        max={maxPrice}
        defaultValue={[priceRange.min, priceRange.max]}
        onChange={(values) => {
          if (!onChanged) setOnChanged(true)
          if (Array.isArray(values)) {
            setPriceRange({
              min: values[0],
              max: values[1],
            })
          }
        }}
        value={[priceRange.min, priceRange.max]}
      />
      <p className={classes.Prices}>
        <span className={classes.MinPrice}>{priceRange.min}</span>
        <span className={classes.MinPrice}>{priceRange.max}</span>
      </p>
    </Accordion>
  )
}

export default FilterPrices
