import classes from './PictureSlider.module.scss'
import { HandySvg } from 'handy-svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper'
import { motion } from 'framer-motion'

interface PictureSliderProps {
  close: () => void
  images: { id: number; url: string }[]
  activeId: number
}

function PictureSlider({ activeId, close, images }: PictureSliderProps) {
  return (
    <div
      className={classes.Main}
      onClick={close}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className={classes.Backdrop}
        onClick={close}
      />
      <button
        className={classes.Close}
        onClick={close}
      >
        <HandySvg
          src="/assets/icons/close-lite.svg"
          width={24}
          height={24}
        />
      </button>
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            delay: 0.2,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
        }}
        className={classes.Content}
      >
        <Swiper
          className={classes.Swiper}
          modules={[Pagination, Navigation]}
          navigation={{
            prevEl: '#image-nav-prev',
            nextEl: '#image-nav-next',
            enabled: true,
          }}
          pagination={{
            enabled: true,
            clickable: true,
            el: '#image-pagination',
            bulletClass: classes.Bullet,
            bulletActiveClass: classes.BulletActive,
          }}
          initialSlide={activeId}
        >
          {images.map(({ id, url }) => (
            <SwiperSlide
              key={id}
              className={classes.Slide}
            >
              <img
                className={classes.Img}
                src={url}
                alt=""
                width="auto"
                height="auto"
                onClick={(event) => event.stopPropagation()}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={classes.Navigation}>
          <button
            id="image-nav-prev"
            className={classes.Prev}
            onClick={(event) => event.stopPropagation()}
          >
            <HandySvg
              src="/assets/icons/arrow-left-lite.svg"
              width={48}
              height={48}
            />
          </button>
          <button
            id="image-nav-next"
            className={classes.Next}
            onClick={(event) => event.stopPropagation()}
          >
            <HandySvg
              src="/assets/icons/arrow-right-lite.svg"
              width={48}
              height={48}
            />
          </button>
        </div>
      </motion.div>
      <div
        id="image-pagination"
        className={classes.Pagination}
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  )
}

export default PictureSlider
