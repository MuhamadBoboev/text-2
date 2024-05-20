import classes from './Promotion.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import H2 from '@ui/Typography/H2/H2'
import Button from '@ui/Button/Button'
import Divider from '@ui/Divider/Divider'
import Carousel from '@ui/Carousel/Carousel'
import { IProduct } from '@models/product/IProduct'

interface NewProductsProps {
  newProductList: IProduct[]
}

function Promotion({ newProductList }: NewProductsProps) {
  if (!newProductList) return null

  return (
    <section className={classes.Section}>
      <Wrapper>
        <header className={classes.Header}>
          <H2 className={classes.Title}>Акции</H2>
          <Button
            className={classes.Button}
            tagName="link"
            color="black"
            background="more"
            href="/products?type=1"
          >
            Все акции
          </Button>
        </header>
        <Divider className={classes.Divider} />
        <Carousel
          name="new-products__list"
          products={newProductList}
          mobileLength={6}
          tabletLength={8}
          withPadding={true}
        />
      </Wrapper>
    </section>
  )
}

export default Promotion
