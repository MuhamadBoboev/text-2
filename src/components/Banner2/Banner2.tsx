import classes from './Banner2.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Wrapper from '@components/UI/Wrapper/Wrapper'
import { HTMLAttributes } from 'react'
import Divider from '@ui/Divider/Divider'
import { IBanner } from '@models/IBanner'
import clsx from 'clsx'

interface Banner2Props extends HTMLAttributes<HTMLElement> {
  className?: string
  banner: IBanner
}

function Banner2({ className, banner, ...attrs }: Banner2Props) {
  if (!banner) return null

  return (
    <section
      className={clsx(classes.Section, className)}
      {...attrs}
    >
      <Wrapper className={classes.Wrapper}>
        <div className={classes.Img}>
          <Image
            src={banner.path}
            alt={banner.title || ''}
            width={1104}
            height={320}
          />
          <div className={classes.Info}>
            <h2 className={classes.Title}>{banner.title}</h2>
            <Link
              href={banner.link}
              className={classes.Link}
            >
              {banner.link_name}
            </Link>
          </div>
        </div>
        <Divider className={classes.Divider} />
      </Wrapper>
    </section>
  )
}

export default Banner2
