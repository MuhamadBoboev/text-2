import { getProduct } from '@utils/requests/getProduct'
import { IProduct } from '@models/product/IProduct'
import Product from '@components/Product/Product'
import SimilarProducts from '@components/SimilarProducts/SimilarProducts'
import { getCategoryByQuery } from '@utils/requests/getCategory'
import Head from 'next/head'
import { useEffect, useMemo } from 'react'
import { useAppDispatch } from '@store/hooks'
import { browseProduct } from '@store/reducers/browsedSlice'

export async function getServerSideProps(context: any) {
  const product = await getProduct(context.params.slug)

  if (!product) {
    return {
      notFound: true,
    }
  }
  const category = await getCategoryByQuery({
    category_id: product.data.categories_tree.category?.id?.toString(),
  })
  let similarProducts: IProduct[] | null = null

  if (category) {
    similarProducts = category?.data
    similarProducts =
      similarProducts?.filter(({ id }) => id !== product.data.id) || null
  }

  return {
    props: {
      product: product.data,
      similarProducts,
    },
  }
}

interface ProductPageProps {
  product: IProduct
  similarProducts: IProduct[] | null
}

function ProductPage({ product, similarProducts }: ProductPageProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(browseProduct(product))
  }, [])

  return (
    <div>
      <Head>
        <title>{`Купить ${product.name}`}</title>
      </Head>
      <Product {...product} />
      <SimilarProducts products={similarProducts} />
    </div>
  )
}

export default ProductPage
