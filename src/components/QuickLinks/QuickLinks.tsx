import classes from './QuickLinks.module.scss'
import Hidden from '@ui/Hidden/Hidden'
import Link from 'next/link'
import Wrapper from '@components/UI/Wrapper/Wrapper'
import { HTMLAttributes } from 'react'
import { IQuickLink } from '@models/IQuickLink'

interface QuickLinksProps extends HTMLAttributes<HTMLElement> {
  className?: string
  quickLinks: IQuickLink[]
}

function QuickLinks({ quickLinks, className, ...attrs }: QuickLinksProps) {
  if (!quickLinks) return null

  return (
    <section
      className={`${classes.Section} ${className || ''}`}
      {...attrs}
    >
      <Hidden>
        <h2>Быстрые ссылки</h2>
      </Hidden>
      <Wrapper>
        <ul className={classes.List}>
          {quickLinks.map(({ link, image, title }, index) => (
            <li
              key={index}
              className={classes.Item}
            >
              <Link
                onClick={(event) => {
                  // if (isOpenAddresses) {
                  //   event.preventDefault()
                  //   event.stopPropagation()
                  //   dispatch(openMenu())
                  //   dispatch(toMenuAddresses())
                  // }
                }}
                href={link}
                className={classes.Link}
              >
                <img
                  className={classes.Img}
                  src={image}
                  alt={title}
                  width="auto"
                  height="auto"
                />
                <span className={classes.Info}>{title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Wrapper>
    </section>
  )
}

export default QuickLinks
