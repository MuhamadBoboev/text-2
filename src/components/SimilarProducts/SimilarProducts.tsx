import classes from './SimilarProducts.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import H2 from '@ui/Typography/H2/H2'
import Button from '@ui/Button/Button'
import Divider from '@ui/Divider/Divider'
import { IProduct } from '@models/product/IProduct'
import Carousel from '@ui/Carousel/Carousel'

interface SimilarProductsProps {
  products: IProduct[] | null
}

function SimilarProducts({ products }: SimilarProductsProps) {
  if (!products || products.length === 0) return null

  return (
    <section className={classes.Section}>
      <Wrapper>
        <header className={classes.Header}>
          <H2 className={classes.Title}>Похожие товары</H2>
          {/*<Button*/}
          {/*  className={classes.Button}*/}
          {/*  tagName="link"*/}
          {/*  color="black"*/}
          {/*  background="more"*/}
          {/*  href={`/products?categories=${id}`}*/}
          {/*>*/}
          {/*  Каталог*/}
          {/*</Button>*/}
        </header>
        <Divider className={classes.Divider} />
        <Carousel
          name="similar-products"
          products={products.slice(0, 6)}
          mobileLength={6}
          infinite={false}
        />
      </Wrapper>
    </section>
  )
}

export default SimilarProducts
