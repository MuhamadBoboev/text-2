import '@styles/index.scss'
import type { AppProps } from 'next/app'
import Layout from '@components/Layout/Layout'
import NextNProgress from 'nextjs-progressbar'
import { Router } from 'next/router'
import { useEffect, useState } from 'react'
import Loader from '@ui/Loader/Loader'
import { getCatalog } from '@utils/requests/getCatalog'
import { getBrowsedProducts } from '@store/reducers/browsedSlice'
import { fetchProductsCart } from '@store/reducers/cartSlice/helpers'
import { fetchProductsFavorite } from '@store/reducers/favoriteSlice/helpers'
import { checkUserAuth } from '@store/reducers/userSlice'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { fetchStores } from '@store/reducers/modalCall'
import { setCatalogData } from '@store/reducers/catalogSlice'
import { withRedux } from '@utils/providers/withRedux'
import { selectCatalog } from '@store/selectors/catalog'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const [isRoutingActive, setIsRoutingActive] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { catalog } = useAppSelector(selectCatalog)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function fetchCatalog() {
      const catalog = await getCatalog(true)
      if (catalog) {
        dispatch(setCatalogData(catalog))
      }
      setIsLoading(false)
    }

    if (!catalog) {
      fetchCatalog()
    }
  }, [])

  useEffect(() => {
    dispatch(getBrowsedProducts())
    dispatch(fetchProductsCart())
    dispatch(fetchProductsFavorite())
    dispatch(checkUserAuth())
    dispatch(fetchStores())
  }, [])

  Router.events.on('routeChangeStart', () => {
    setIsRoutingActive(true)
  })
  Router.events.on('routeChangeComplete', () => {
    setIsRoutingActive(false)
  })

  return (
    <>
      <Head>
        {/*{width > 480 ? <script src="//code.jivo.ru/widget/2R3VkYJwB7" async></script> : null}*/}
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Loader isLoading={isLoading} />
      {isRoutingActive && <div className="page-backdrop" />}
      <NextNProgress
        nonce="my-nonce"
        color="#CC3333"
        startPosition={0}
        stopDelayMs={0}
        height={3}
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />
    </>
  )
}

export default withRedux(MyApp)
