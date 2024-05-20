import classes from './ProductPicturesMobile.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IProductImage } from '@models/product/IProduct'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

interface ProductPicturesMobileProps {
  list: IProductImage[]
  img: string
  title: string
}

function ProductPicturesMobile({
  img,
  list,
  title,
}: ProductPicturesMobileProps) {
  return (
    <div className={classes.Images}>
      <Swiper
        className={classes.Slider}
        pagination={{
          bulletClass: classes.Bullet,
          bulletActiveClass: classes.BulletActive,
          horizontalClass: classes.Pagination,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide className={classes.Slide}>
          <img
            className={classes.Img}
            src={img}
            alt={title}
            width={358}
            height={358}
          />
        </SwiperSlide>
        {list?.map((image) => (
          <SwiperSlide
            key={image.id}
            className={classes.Slide}
          >
            <img
              className={classes.Img}
              src={image.url}
              alt={title}
              width={358}
              height={358}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductPicturesMobile
