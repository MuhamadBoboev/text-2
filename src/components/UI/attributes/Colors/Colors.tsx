import classes from './Colors.module.scss'
import { IAttribute } from '@models/product/attibutes'
import { Fragment, ReactNode, useMemo } from 'react'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'
import Color from '@ui/attributes/Colors/Color'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper'
import 'swiper/css'
import 'swiper/css/scrollbar'

interface ColorsProps {
  colors: IAttribute[]
  activeColor: number
  setActiveColor: (id: number) => void
  className?: string
  classNames?: {
    title?: string
    list?: string
    item?: string
    label?: string
    input?: string
    name?: string
  }
}

function Colors({
  colors,
  activeColor,
  setActiveColor,
  classNames,
  className,
}: ColorsProps) {
  return (
    <div className={clsx(classes.Volume, className)}>
      <h3 className={clsx(classes.Title, classNames?.title)}>Цвет</h3>

      <Swiper
        className={classes.Swiper}
        slidesPerView={5}
        spaceBetween={16}
        modules={[Scrollbar]}
        scrollbar={{
          hide: false,
          enabled: true,
          draggable: true,
        }}
      >
        {colors.map(({ id, name, quantity, slug }) => (
          <SwiperSlide
            key={id}
            className={clsx(classes.Item, classNames?.item)}
          >
            <label className={clsx(classes.Label, classNames?.label)}>
              <input
                disabled={quantity === 0}
                className={clsx(classes.Radio, classNames?.input)}
                type="radio"
                name="color"
                value={id}
                checked={activeColor === id}
                onChange={(event) => {
                  if (event.target.checked) {
                    setActiveColor(id)
                  }
                }}
              />
              <Color
                name={name}
                slug={slug}
                classNames={classNames}
              />
            </label>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Colors
