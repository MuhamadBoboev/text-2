import classes from './BrandsLite.module.scss'
import Hidden from '@ui/Hidden/Hidden'
import Wrapper from '@ui/Wrapper/Wrapper'
import Button from '@ui/Button/Button'
import { IBrand } from '@models/IBrand'
import { Swiper, SwiperSlide } from 'swiper/react'
import Link from 'next/link'
import H2 from '@ui/Typography/H2/H2'

interface BrandsLiteProps {
  brandList: IBrand[]
}

function BrandsLite({ brandList }: BrandsLiteProps) {
  if (!brandList) return null

  return (
    <section className={classes.Section}>
      <Wrapper>
        <header className={classes.Header}>
          <H2 className={classes.Title}>Наши бренды</H2>
        </header>
        <Swiper
          slidesPerView={4}
          breakpoints={{
            480: {
              slidesPerView: 4,
            },
            540: {
              slidesPerView: 5,
            },
            640: {
              slidesPerView: 6,
            },
            1024: {
              slidesPerView: 7,
            },
            1240: {
              slidesPerView: 8,
            },
          }}
          className={classes.Slider}
        >
          {brandList.slice(0, 8).map(({ logo, name, id }, index) => (
            <SwiperSlide key={index}>
              <Link
                href={`/products/?brands=${id}`}
                className={classes.Item}
              >
                <img
                  className={classes.Img}
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}${logo}`}
                  alt={name}
                  width={96}
                  height={96}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          className={classes.Button}
          tagName="link"
          color="black"
          background="more"
          href="/brands"
        >
          Посмотреть все бренды
        </Button>
        {/*<Button*/}
        {/*  className={classes.ButtonMobile}*/}
        {/*  tagName="link"*/}
        {/*  color="black"*/}
        {/*  background="transparent"*/}
        {/*  href="/brands"*/}
        {/*>*/}
        {/*  Все бренды*/}
        {/*</Button>*/}
      </Wrapper>
    </section>
  )
}

export default BrandsLite
