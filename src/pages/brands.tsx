import { IBrand } from '@models/IBrand'
import { getBrands } from '@utils/requests/getBrands'
import Brands from '@components/Brands/Brands'
import PromotionsAndSuggestionsLite from '@components/PromotionsAndSuggestionsLite/PromotionsAndSuggestionsLite'
import Head from 'next/head'

export async function getServerSideProps() {
  const brands = await getBrands()

  if (!brands) {
    return {
      notFound: true,
    }
  }

  return {
    props: { brands },
  }
}

interface BrandsPageProps {
  brands: IBrand[]
}

function BrandsPage({ brands }: BrandsPageProps) {
  return (
    <div>
      <Head>
        <title>
          У нас вы сможете приобрести брендовую парфюмерию и косметику!
        </title>
        <meta
          name="description"
          content="Наш магазин представляет парфюмерию и косметику от ведущих мировых брендов."
        />
        <meta
          name="keywords"
          content="бренд, бестселлер, новинка, парфюм, духи, крем, уход"
        />
      </Head>
      <Brands brands={brands} />
      <PromotionsAndSuggestionsLite />
    </div>
  )
}

export default BrandsPage
