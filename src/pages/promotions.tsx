import PromotionsAndSuggestions from '@components/PromotionsAndSuggestions/PromotionsAndSuggestions'
import Head from 'next/head'
import { getDiscounts } from '@utils/requests/getDiscounts'
import { IPromotion } from '@models/IPromotion'

export async function getServerSideProps() {
  const discounts = await getDiscounts()

  return {
    props: {
      discounts,
    },
  }
}

interface PromotionsPageProps {
  discounts: IPromotion[]
}

function PromotionsPage({ discounts }: PromotionsPageProps) {
  return (
    <div>
      <Head>
        <title>Лучший подарок - это эмоции!</title>
        <meta
          name="description"
          content="Новогодние скидки на брендовую парфюмерию и косметику. Подарите эмоции с приятным шлейфом любви к себе."
        />
        <meta
          name="keywords"
          content="распродажа, мужчинам, женщинам, духи, скидки, акция, бестселлер"
        />
      </Head>
      <PromotionsAndSuggestions discounts={discounts} />
    </div>
  )
}

export default PromotionsPage
