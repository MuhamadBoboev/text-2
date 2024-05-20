import classes from './FooterLinks.module.scss'
import Link from 'next/link'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  openMenu,
  toMenuAbout,
  toMenuAddresses,
  toMenuContacts,
  toMenuDeliveryGroup,
  toMenuGuarantees,
  toMenuPurchase,
} from '@store/reducers/menuSlice'
import { ICatalogMenu } from '@models/ICatalogMenu'
import { socialList, socialListFooter } from '@utils/constants/socialList'
import { HandySvg } from 'handy-svg'
import { selectCatalog } from '@store/selectors/catalog'

interface FooterLinksProps {}

function FooterLinks({}: FooterLinksProps) {
  const { catalog } = useAppSelector(selectCatalog)
  const dispatch = useAppDispatch()

  return (
    <div className={classes.Links}>
      <div className={clsx(classes.Block, classes.Catalog)}>
        <h3 className={classes.Title}>Каталог</h3>
        <ul className={classes.List}>
          {catalog?.map((catalog) => (
            <li
              key={catalog.id}
              className={classes.Item}
            >
              <Link
                className={classes.Link}
                href={`/products?main_category_id=${catalog.id}`}
              >
                {catalog.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.Block}>
        <h3 className={classes.Title}>Меню</h3>
        <ul className={classes.List}>
          <li className={classes.Item}>
            <span
              className={classes.Link}
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuAbout())
              }}
            >
              О нас
            </span>
          </li>
          <li className={classes.Item}>
            <span
              className={classes.Link}
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuAddresses())
              }}
            >
              Контакты
            </span>
          </li>
          <li className={classes.Item}>
            <span
              className={classes.Link}
              onClick={() => {
                dispatch(openMenu())
                dispatch(toMenuDeliveryGroup())
              }}
            >
              Условия покупки
            </span>
          </li>
          <li className={classes.Item}>
            <Link
              className={classes.Link}
              href={`/brands`}
            >
              Все бренды
            </Link>
          </li>
          <li className={classes.Item}>
            <Link
              className={classes.Link}
              href={`/reviews`}
            >
              Отзывы
            </Link>
          </li>
        </ul>
      </div>
      <div className={classes.Block}>
        <h3 className={classes.Title}>Мы онлайн</h3>
        <ul className={classes.List}>
          {socialListFooter.map(({ url, name, icon }) => (
            <li
              className={classes.Item}
              key={name}
            >
              <a
                className={clsx(classes.Link, classes.LinkSocial)}
                title={name}
                href={url}
                target="_blank"
              >
                <HandySvg
                  src={icon}
                  width={24}
                  height={24}
                />
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FooterLinks
