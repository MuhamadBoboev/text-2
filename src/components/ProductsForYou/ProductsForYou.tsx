import classes from './ProductsForYou.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import H2 from '@ui/Typography/H2/H2'
import Button from '@ui/Button/Button'
import Divider from '@ui/Divider/Divider'
import ProductCard from '@ui/ProductCard/ProductCard'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useAppSelector } from '@store/hooks'
import { IProduct } from '@models/product/IProduct'
import Carousel from '@ui/Carousel/Carousel'
import { getProducts } from '@utils/requests/getProducts'
import { getCategoryByQuery } from '@utils/requests/getCategory'

interface ProductsForYouProps extends HTMLAttributes<HTMLElement> {
  className?: string
}

function ProductsForYou({ className, ...attrs }: ProductsForYouProps) {
  const [products, setProducts] = useState<IProduct[] | null>([])
  const favoriteProducts = useAppSelector((state) => state.favorite.products)

  useEffect(() => {
    async function fetchProduct() {
      const products = await getProducts(true)

      setProducts(products)
    }

    async function getProductsForYou(id: number) {
      const products: { data: IProduct[] } = await getCategoryByQuery({
        isClient: true,
        categories: id.toString(),
      })

      setProducts(products.data)
    }

    if (favoriteProducts.length === 0) {
      fetchProduct()
    } else {
      getProductsForYou(favoriteProducts[0].id)
    }
  }, [])

  if (!products) return null

  return (
    <section
      className={`${classes.Section} ${className || ''}`}
      {...attrs}
    >
      <Wrapper className={classes.Wrapper}>
        <header className={classes.Header}>
          <H2 className={classes.Title}>Товары для вас</H2>
          <Button
            className={classes.Button}
            tagName="link"
            color="black"
            background="transparent"
            href="/products"
          >
            Каталог
          </Button>
        </header>
        <Divider className={classes.Divider} />
        <Carousel
          name="products-for-you"
          products={products}
          mobileLength={4}
          tabletLength={6}
        />
      </Wrapper>
    </section>
  )
}

export default ProductsForYou
