import Purchase from '@components/Purchase/Purchase'
import ProductsForYou from '@components/ProductsForYou/ProductsForYou'
import { GetServerSideProps } from 'next'
import { getProducts } from '@utils/requests/getProducts'
import { IProduct } from '@models/product/IProduct'

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProducts()
  return {
    props: {
      products,
    },
  }
}

interface PurchaseProps {
  products: IProduct[]
}

function PurchasePage({ products }: PurchaseProps) {
  return (
    <div>
      <Purchase />
      <ProductsForYou />
    </div>
  )
}

export default PurchasePage
