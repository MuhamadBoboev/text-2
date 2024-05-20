import classes from './Favorites.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import FavoriteProduct from '@ui/FavoriteProduct/FavoriteProduct'
import { useAppSelector } from '@store/hooks'
import { Option, Select2 } from '@ui/Select2/Select2'
import { useEffect, useState } from 'react'
import { IProduct } from '@models/product/IProduct'
import Button from '@ui/Button/Button'

function Favorites() {
  const { products } = useAppSelector((state) => state.favorite)
  const [filter, setFilter] = useState<'high_low' | 'low_high' | 'latest'>(
    'latest',
  )
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products)

  useEffect(() => {
    const copyProducts: IProduct[] = JSON.parse(JSON.stringify(products))
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
      <Wrapper>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={[{ link: '/', text: 'Главная' }]}
          active={{
            text: 'Избранное',
          }}
        />
        <header className={classes.Header}>
          <H2 className={classes.Title}>Избранное</H2>
          <Select2
            className={classes.Select}
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
        {filteredProducts.length === 0 && (
          <div className={classes.Empty}>
            <p className={classes.EmptyTitle}>Пока тут пусто</p>
            {/*<p className={classes.EmptySubtitle}>Выберите товары</p>*/}
            <Button
              className={classes.Button}
              tagName="link"
              href="/products"
            >
              Выберите товар
            </Button>
          </div>
        )}
        <ul className={classes.List}>
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className={classes.Item}
            >
              <FavoriteProduct {...product} />
            </li>
          ))}
        </ul>
      </Wrapper>
    </div>
  )
}

export default Favorites
