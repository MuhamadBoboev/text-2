import classes from './BrowsedProduct.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import { Option, Select2 } from '@ui/Select2/Select2'
import Divider from '@ui/Divider/Divider'
import { useAppSelector } from '@store/hooks'
import { useEffect, useState } from 'react'
import { IBrowsedProduct } from '@models/IBrowsedProduct'
import ProductCard from '@components/UI/ProductCard/ProductCard'
import Head from 'next/head'

function BrowsedProduct() {
  const [filter, setFilter] = useState<'high_low' | 'low_high' | 'latest'>(
    'latest',
  )
  const { products } = useAppSelector((state) => state.browsed)
  const [filteredProducts, setFilteredProducts] =
    useState<IBrowsedProduct[]>(products)

  useEffect(() => {
    const copyProducts: IBrowsedProduct[] = JSON.parse(JSON.stringify(products))
    switch (filter) {
      case 'high_low':
        copyProducts?.sort((a, b) => (a.price < b.price ? 1 : -1))
        break
      case 'low_high':
        copyProducts?.sort((a, b) => (a.price < b.price ? -1 : 1))
        break
    }
    setFilteredProducts(copyProducts)
  }, [filter, products])

  return (
    <div className={classes.Section}>
      <Head>
        <title>Все просмотренные</title>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Head>
      <Wrapper>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={[{ link: '/', text: 'Главная' }]}
          active={{
            text: 'Все просмотренные',
          }}
        />
        <header className={classes.Header}>
          <H2 className={classes.Title}>Вы просматривали</H2>
          <Select2
            classNames={{
              wrapper: classes.Select,
            }}
            onChange={(event: any) => {
              setFilter(event.target.value)
            }}
          >
            <Option isPlaceholder>Сортировать</Option>
            <Option value="latest">По умолчанию</Option>
            <Option value="high_low">По убыванию</Option>
            <Option value="low_high">По возрастанию</Option>
          </Select2>
        </header>
        <Divider />
        <ul className={classes.List}>
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className={classes.Item}
            >
              <ProductCard
                className={classes.Card}
                {...product}
              />
            </li>
          ))}
        </ul>
      </Wrapper>
    </div>
  )
}

export default BrowsedProduct
