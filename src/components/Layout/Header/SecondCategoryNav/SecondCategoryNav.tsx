import classes from './SecondCategoryNav.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import { useRef } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { useRouter } from 'next/router'

function SecondCategoryNav() {
  const listRef = useRef(null)
  const router = useRouter()

  const menuList = [
    {
      name: 'Парфюмерия',
      link: '/products?main_category_id=33',
    },
    {
      name: 'Макияж',
      link: '/products?main_category_id=32',
    },
    {
      name: 'Уход',
      link: '/products?main_category_id=37',
    },
    {
      name: 'Новинки',
      link: '/products?type=4',
    },
    {
      name: 'Скидки',
      link: '/products?has_discount=1',
    },
    {
      name: 'Для него',
      link: '/products?for_who=1',
    },
    {
      name: 'Для неё',
      link: '/products?for_who=2',
    },
    {
      name: 'Бренды',
      link: '/brands',
    },
    {
      name: 'Подарочные сертификаты',
      link: '/products?category_id=486',
    },
    // {
    //   name: 'Новогодняя Акция',
    //   link: '/products'
    // },
    // {
    //   name: 'Подарочные наборы',
    //   link: '/products'
    // },
  ]

  return (
    <div
      ref={listRef}
      className={classes.Nav}
    >
      <div className={classes.Categories}>
        <Wrapper tagName="section">
          <ul className={classes.List}>
            {menuList.map((menu, index) => (
              <li
                key={index}
                className={classes.Item}
              >
                <Link
                  href={menu.link}
                  className={clsx(
                    classes.Button,
                    menu.link === router.asPath && classes.ActiveButton,
                  )}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </Wrapper>
      </div>
    </div>
  )
}

export default SecondCategoryNav
