import classes from './MainSlider.module.scss'
import Link from 'next/link'
import Wrapper from '@ui/Wrapper/Wrapper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'
import Hidden from '@ui/Hidden/Hidden'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'
import { useRouter } from 'next/router'
import { useWindowSize } from 'usehooks-ts'
import { IBanner } from '@models/IBanner'

interface MainSliderProps {
  slides: IBanner[]
}

function MainSlider({ slides }: MainSliderProps) {
  const router = useRouter()
  const { width } = useWindowSize()

  const getImagePath = (path: string, mobilePath: string) => {
    if (width < 600) {
      if (mobilePath.endsWith('storage')) {
        return path
      }
      return mobilePath
    }
    return path
  }

  if (!slides) return null

  return (
    <section>
      <Hidden>
        <h2>Главный слайдер</h2>
      </Hidden>
      <Swiper
        className={classes.Slider}
        modules={[Pagination, EffectFade, Autoplay, Navigation]}
        effect="fade"
        autoplay={{
          delay: 3000,
        }}
        navigation={{
          prevEl: '#nav-slider-left',
          nextEl: '#nav-slider-right',
          enabled: false,
        }}
        pagination={{
          clickable: true,
          horizontalClass: classes.Pagination,
          bulletClass: classes.Bullet,
          bulletActiveClass: classes.BulletActive,
        }}
        loop={true}
        breakpoints={{
          600: {
            navigation: {
              enabled: true,
            },
            // pagination: false
          },
        }}
      >
        {slides.map(
          (
            {
              title,
              id,
              link,
              link_name,
              order,
              path,
              type,
              is_active,
              description,
              mobile_path,
            },
            index,
          ) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => {
                  if (width < 600) {
                    router.push(link)
                  }
                }}
                className={classes.Img}
              >
                <img
                  src={getImagePath(path, mobile_path || '')}
                  alt={title}
                  width="100%"
                  height="auto"
                />
              </div>
              <Wrapper className={classes.InfoWrapper}>
                <div className={classes.Info}>
                  {title && <h3 className={clsx(classes.Title)}>{title}</h3>}
                  {link && (
                    <Link
                      href={link}
                      className={clsx(classes.Link)}
                    >
                      {link_name || 'Подробнее'}
                    </Link>
                  )}
                </div>
              </Wrapper>
            </SwiperSlide>
          ),
        )}

        <div slot="container-end">
          <div className={classes.Navigation}>
            <button
              className={classes.Arrow}
              id="nav-slider-left"
            >
              <HandySvg
                src="/assets/icons/arrow-left.svg"
                width={32}
                height={32}
              />
            </button>
            <button
              className={classes.Arrow}
              id="nav-slider-right"
            >
              <HandySvg
                src="/assets/icons/arrow-right.svg"
                width={32}
                height={32}
              />
            </button>
          </div>
        </div>
      </Swiper>
    </section>
  )
}

export default MainSlider
