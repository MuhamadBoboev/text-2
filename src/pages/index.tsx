import classes from '@styles/page/MainPage.module.scss'
import type { NextPage } from 'next'
import MainSlider from '../components/MainSlider/MainSlider'
import QuickLinks from '@components/QuickLinks/QuickLinks'
import BrandsLite from '@components/BrandsLite/BrandsLite'
import BrowsedProductLite from '@components/BrowsedProductLite/BrowsedProductLite'
import Banner2 from '@components/Banner2/Banner2'
import Head from 'next/head'
import NewProducts from '@components/NewProducts/NewProducts'
import PromotionsAndSuggestionsLite from '@components/PromotionsAndSuggestionsLite/PromotionsAndSuggestionsLite'
import { getProducts, hitProductsType } from '@utils/requests/getProducts'
import { getBrands } from '@utils/requests/getBrands'
import Hits from '@components/Hits/Hits'
import { fetchMainBanners, getSlides } from '@utils/requests/getSlides'
import { IProduct } from '@models/product/IProduct'
import { IBrand } from '@models/IBrand'
import { IBanner } from '@models/IBanner'
import Button from '@ui/Button/Button'
import Wrapper from '@ui/Wrapper/Wrapper'
import { getQuickLinks } from '@utils/requests/getQuickLinks'
import { IQuickLink } from '@models/IQuickLink'
import Promotions from '@components/Promotions/Promotions'
import Promotion from '@components/Promotion/Promotion'

export async function getServerSideProps() {
  const brands = await getBrands()
  const slides = await getSlides()
  const mainBanners = await fetchMainBanners()
  const newProducts = await getProducts(false, '?type=4')
  const promotionProducts = await getProducts(false, '?type=1')

  const quickLinks = await getQuickLinks()

  return {
    props: {
      brands,
      slides,
      mainBanners,
      newProducts,
      quickLinks,
      promotionProducts,
    },
  }
}

interface MainPageProps {
  brands: IBrand[]
  slides: IBanner[]
  mainBanners: IBanner[]
  hitProducts: hitProductsType
  newProducts: IProduct[]
  promotionProducts: IProduct[]
  quickLinks: IQuickLink[]
}

const IndexPage: NextPage<MainPageProps> = ({
  quickLinks,
  brands,
  slides,
  mainBanners,
  hitProducts,
  newProducts,
  promotionProducts,
}) => {
  return (
    <>
      <Head>
        <title>La Cite - интернет магазин парфюмерии и косметики</title>
        <meta
          name="description"
          content="Подарок Для Нее, Для Него и множество подарочных наборов ждут вас!"
        />
        <meta
          name="keywords"
          content="хит продаж, парфюмерия, аромат, шлейф, уход, скидки, акция"
        />
        <meta
          name="google-site-verification"
          content="9uPte_k0CgURgGpUAwjCSVg0-4o4fCfm4QGitHUE2Wc"
        />
      </Head>
      <h1 className={classes.visuallyHidden}>La Cite</h1>
      <MainSlider slides={slides} />
      <QuickLinks quickLinks={quickLinks && quickLinks.slice(0, 6)} />
      <BrowsedProductLite />
      <BrandsLite
        brandList={brands?.sort((a, b) => (a.name > b.name ? 1 : -1))}
      />
      <Promotion newProductList={promotionProducts} />
      <NewProducts newProductList={newProducts} />
      <Banner2 banner={mainBanners && mainBanners[0]} />
      <Hits />
      <Promotions />
      <PromotionsAndSuggestionsLite />
      <Wrapper>
        <Button
          className={classes.Button}
          tagName="link"
          href="/products"
        >
          Показать все товары
        </Button>
      </Wrapper>
    </>
  )
}

export default IndexPage
