import Reviews from '@components/Reviews/Reviews'
import { IReview } from '@models/IReview'
import { getReviews } from '@utils/requests/getReviews'
import Head from 'next/head'

export async function getServerSideProps() {
  const reviewList: { data: IReview[] } = await getReviews()

  return {
    props: {
      reviewList,
    },
  }
}

interface PageProps {
  reviewList: { data: IReview[] }
}

function ReviewsPage({ reviewList }: PageProps) {
  return (
    <>
      <Head>
        <title>Ваши отзывы - наша мотивация!</title>
        <meta
          name="description"
          content="Спасибо, что выбираете La Cite."
        />
        <meta
          name="keywords"
          content="отзыв, спасибо, очень, подарок, приятно, сервис, услуги"
        />
      </Head>
      <Reviews reviewList={reviewList.data} />
    </>
  )
}

export default ReviewsPage
