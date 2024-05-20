import Wrapper from '@ui/Wrapper/Wrapper'
import H2 from '@ui/Typography/H2/H2'
import { useAppSelector } from '@store/hooks'
import { useEffect, useState } from 'react'
import { IProduct } from '@models/product/IProduct'
import { getProducts } from '@utils/requests/getProducts'
import ProductCard from '@ui/ProductCard/ProductCard'
import Spinner from '@ui/spinners/Spinner/Spinner'
import classes from './Promotions.module.scss'
import PromotionsTab from '@components/Promotions/PromotionsTab/PromotionsTab'

function Promotions() {
  const { catalog } = useAppSelector((state) => state.catalog)
  const [products, setProducts] = useState<IProduct[] | null>([])
  const [activeId, setActiveId] = useState<number | null>(
    catalog && catalog[0] && catalog[0].id,
  )
  const [status, setStatus] = useState<'pending' | 'fulfilled' | 'rejected'>(
    'pending',
  )

  useEffect(() => {
    async function loadProducts() {
      setStatus('pending')
      const products = await getProducts(
        true,
        `?main_category_id=${activeId}&has_discount=1`,
      )
      setStatus('fulfilled')
      setProducts(products)
    }

    if (activeId !== null) {
      loadProducts()
    }
  }, [activeId])

  useEffect(() => {
    if (catalog) {
      if (!activeId) {
        setActiveId(catalog[0] && catalog[0].id)
      }
    }
  }, [catalog])

  if (!catalog) return null

  return (
    <section className={classes.Section}>
      <Wrapper>
        <header className={classes.Header}>
          <H2 className={classes.Title}>Товары по акции</H2>
        </header>
        <PromotionsTab
          activeId={activeId!}
          onSelect={(id) => setActiveId(id)}
        />
        <div>
          {status === 'pending' && (
            <div className={classes.Loader}>
              <Spinner size={56} />
            </div>
          )}
          {status === 'fulfilled' && (
            <ul className={classes.List}>
              {products?.map((product, index) => (
                <li
                  key={index}
                  className={classes.Item}
                >
                  <ProductCard {...product} />
                </li>
              ))}
            </ul>
          )}
          {status === 'fulfilled' && products?.length === 0 && (
            <p className={classes.Empty}>Товаров нет</p>
          )}
        </div>
      </Wrapper>
    </section>
  )
}

export default Promotions
