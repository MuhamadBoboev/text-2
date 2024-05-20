import PromotionsAndSuggestionsLite from '@components/PromotionsAndSuggestionsLite/PromotionsAndSuggestionsLite'
import Favorites from '@components/Favorites/Favorites'
import Head from 'next/head'

function FavoritesPage() {
  return (
    <div>
      <Head>
        <title>Избранное</title>
        <meta
          name="robots"
          content="nofollow, noindex"
        />
      </Head>
      <Favorites />
      <PromotionsAndSuggestionsLite />
    </div>
  )
}

export default FavoritesPage
