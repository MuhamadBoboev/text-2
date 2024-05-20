import classes from './PromotionsAndSuggestions.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import Link from 'next/link'
import Tag from '@ui/Tag/Tag'
import { IPromotion } from '@models/IPromotion'

interface PromotionsAndSuggestionsProps {
  discounts: IPromotion[]
}

function PromotionsAndSuggestions({
  discounts,
}: PromotionsAndSuggestionsProps) {
  if (!discounts) return null

  return (
    <section className={classes.Section}>
      <Wrapper className={classes.Wrapper}>
        <header className={classes.Header}>
          <Breadcrumbs
            className={classes.Breadcrumbs}
            list={[{ text: 'Главная', link: '/' }]}
            active={{ text: 'Акции и спец. предложения' }}
          />
          <H2 className={classes.Title}>Акции и спец. предложения</H2>
        </header>
        <Divider />
        <ul className={classes.List}>
          {discounts.map(
            (
              {
                id,
                name,
                deadline,
                image,
                brand_id,
                products_count,
                products,
                slug,
                description,
              },
              index,
            ) => (
              <li
                key={index}
                className={classes.Item}
              >
                <Link
                  href="/"
                  className={classes.Link}
                >
                  <img
                    className={classes.Img}
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${image}`}
                    alt={name}
                    width={240}
                    height={240}
                  />
                  <Tag
                    className={classes.Info}
                    color="green"
                  >
                    {name}
                  </Tag>
                </Link>
              </li>
            ),
          )}
        </ul>
      </Wrapper>
    </section>
  )
}

export default PromotionsAndSuggestions
