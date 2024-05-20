import classes from './BrowsedProductLite.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import H2 from '@ui/Typography/H2/H2'
import Button from '@ui/Button/Button'
import Divider from '@ui/Divider/Divider'
import Carousel from '@ui/Carousel/Carousel'
import { useAppSelector } from '@store/hooks'

function BrowsedProductLite() {
  // const {products} = useAppSelector(state => state.browsed)

  const { products } = useAppSelector((state) => state.browsed)

  if (products.length === 0) return null

  return (
    <section className={classes.Section}>
      <Wrapper>
        <header className={classes.Header}>
          <H2 className={classes.Title}>Вы просматривали</H2>
          <Button
            className={classes.Button}
            tagName="link"
            color="black"
            background="more"
            href={'/browsed'}
          >
            Все просмотренное
          </Button>
        </header>
        <Divider className={classes.Divider} />
        <Carousel
          name="browsed-products__list"
          products={products}
          mobileLength={4}
          tabletLength={6}
        />
        <Button
          className={classes.MobileButton}
          tagName="link"
          size={100}
          href="/browsed"
          background="more"
        >
          Все просмотренное
        </Button>
      </Wrapper>
    </section>
  )
}

export default BrowsedProductLite
