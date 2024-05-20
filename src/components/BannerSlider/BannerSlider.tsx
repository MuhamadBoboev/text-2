import classes from './BannerSlider.module.scss'
import { IBanner } from '@models/IBanner'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Link from 'next/link'
import Wrapper from '@ui/Wrapper/Wrapper'

interface BannerSliderProps {
  bannerList: IBanner[]
}

function BannerSlider({ bannerList }: BannerSliderProps) {
  return (
    <Wrapper className={classes.Banner}>
      <Swiper
        className={classes.Slider}
        spaceBetween={16}
        breakpoints={{
          480: {
            slidesPerView: 'auto',
          },
        }}
      >
        {bannerList.map((banner, index) => (
          <SwiperSlide
            className={classes.Slide}
            key={index}
          >
            <div className={classes.Img}>
              <Image
                src={banner.path}
                alt=""
                width={1104}
                height={320}
              />

              <div className={classes.Info}>
                <h2 className={classes.Title}>{banner.title}</h2>
                <Link
                  href={banner.link}
                  className={classes.Link}
                >
                  Подробнее
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  )
}

export default BannerSlider
