import classes from './CarouselMobile.module.scss'
import { IProduct } from '@models/product/IProduct'
import ProductCard from '@ui/ProductCard/ProductCard'
import { useEffect, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

interface CarouselMobileProps {
  products: IProduct[]
  maxLength: number
  tabletLength?: number
}

function CarouselMobile({
  products,
  maxLength,
  tabletLength,
}: CarouselMobileProps) {
  const [size, setSize] = useState<number>(maxLength)
  const { width } = useWindowSize()

  useEffect(() => {
    if (width > 599) setSize(tabletLength || maxLength)
    else setSize(maxLength)
  }, [width, products])

  return (
    <ul className={classes.List}>
      {products.slice(0, size).map((product, index) => (
        <li key={index}>
          <ProductCard
            className={classes.Card}
            {...product}
          />
        </li>
      ))}
    </ul>
  )
}

export default CarouselMobile
