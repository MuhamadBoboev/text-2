import classes from './CatalogProducts.module.scss'
import { IProduct } from '@models/product/IProduct'
import ProductCard from '@ui/ProductCard/ProductCard'
import Button from '@ui/Button/Button'
import { useRouter } from 'next/router'

interface CatalogProductsProps {
  products: IProduct[]
}

function CatalogProducts({ products }: CatalogProductsProps) {
  const router = useRouter()

  if (products.length === 0)
    return (
      <div className={classes.Empty}>
        <p className={classes.EmptyTitle}>
          По данному запросу
          <br /> товары не найдены
        </p>
        {/*<p className={classes.EmptySubtitle}>Выберите товары</p>*/}
        <Button
          className={classes.Button}
          onClick={() => {
            router.query = {}

            router.push(router)
          }}
        >
          Очистить фильтр
        </Button>
      </div>
    )

  return (
    <ul className={classes.List}>
      {products.map((product) => (
        <li
          key={product.id}
          className={classes.Item}
        >
          <ProductCard
            hideIsUnavailable
            {...product}
          />
        </li>
      ))}
    </ul>
  )
}

export default CatalogProducts
