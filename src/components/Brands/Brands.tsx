import classes from './Brands.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import { IBrand } from '@models/IBrand'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import Link from 'next/link'
import { useState } from 'react'

interface BrandsProps {
  brands: IBrand[]
}

function Brands({ brands }: BrandsProps) {
  const [search, setSearch] = useState('')

  const filteredBrands = brands.filter(
    (brand) =>
      brand.name.toLowerCase().indexOf(search.toLowerCase().trim()) !== -1,
  )

  return (
    <section className={classes.Section}>
      <Wrapper className={classes.Wrapper}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={[{ text: 'Главная', link: '/' }]}
          active={{ text: 'Бренды' }}
        />
        <header className={classes.Header}>
          <H2 className={classes.Title}>Официальные партнёры с брендами </H2>
          <input
            className={classes.InputSearch}
            type="text"
            placeholder="Введите название бренда"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </header>
        <Divider />

        <ul className={classes.List}>
          {filteredBrands
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map(({ id, logo, name }) => (
              <li
                key={id}
                className={classes.Item}
              >
                <Link
                  title={name}
                  className={classes.Link}
                  href={`/products?brands=${id}`}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${logo}`}
                    alt={name}
                    width={144}
                    height={144}
                  />
                </Link>
              </li>
            ))}
        </ul>
      </Wrapper>
    </section>
  )
}

export default Brands
