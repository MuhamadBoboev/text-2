import classes from './Carousel.module.scss'
import { IProduct } from '@models/product/IProduct'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '@ui/ProductCard/ProductCard'
import { desktop, tablet } from '@utils/constants/breakpoints'
import { Navigation, Pagination } from 'swiper'
import { HandySvg } from 'handy-svg'
import { useWindowSize } from 'usehooks-ts'
import CarouselMobile from '@ui/Carousel/CarouselMobile/CarouselMobile'
import { HTMLAttributes } from 'react'
import 'swiper/css'

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  products: IProduct[]
  mobileLength: number
  tabletLength?: number
  withPadding?: boolean
  className?: string
  infinite?: boolean
}

function Carousel({
  name,
  mobileLength,
  products,
  tabletLength,
  withPadding,
  className,
  infinite,
  ...attrs
}: CarouselProps) {
  const paginationId = `${name}__carousel__pagination`
  const nextSlideId = `${name}__carousel-nav--next`
  const prevSlideId = `${name}__carousel-nav--prev`
  const { width } = useWindowSize()

  if (width <= tablet) {
    return (
      <CarouselMobile
        maxLength={mobileLength}
        tabletLength={tabletLength}
        products={products}
      />
    )
  }

  return (
    <div
      id={name}
      className={`${classes.Carousel} ${className || ''}`}
      {...attrs}
    >
      <Swiper
        className={classes.Slider}
        modules={[Navigation, Pagination]}
        slidesPerView={3}
        spaceBetween={24}
        // autoHeight={true}
        breakpoints={{
          [1300]: {
            slidesPerView: 5,
          },
          [desktop]: {
            slidesPerView: 4,
          },
        }}
        loop={infinite}
        onInit={(swiper) => {
          if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
            swiper.navigation.nextEl.style.display = 'none'
            swiper.navigation.prevEl.style.display = 'none'
            swiper.pagination.el.style.display = 'none'

            if (!withPadding) {
              const $wrapper = document.getElementById(name)
              if ($wrapper) $wrapper.style.padding = '0'
            }
          }
        }}
        pagination={{
          enabled: true,
          el: `#${paginationId}`,
          bulletClass: classes.Bullet,
          bulletActiveClass: classes.BulletActive,
          clickable: true,
        }}
        navigation={{
          nextEl: `#${nextSlideId}`,
          prevEl: `#${prevSlideId}`,
          enabled: true,
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide
            key={index}
            className={classes.Item}
          >
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={classes.Pagination}
        id={paginationId}
      />
      <div className={classes.Navigation}>
        <button
          id={prevSlideId}
          className={classes.Prev}
          aria-label="Предыдущий слайд"
        >
          <HandySvg
            src="/assets/icons/arrow-left.svg"
            width={6}
            height={13}
          />
        </button>
        <button
          id={nextSlideId}
          className={classes.Next}
          aria-label="Следующий слайд"
        >
          <HandySvg
            src="/assets/icons/arrow-right.svg"
            width={6}
            height={13}
          />
        </button>
      </div>
    </div>
  )
}

export default Carousel
