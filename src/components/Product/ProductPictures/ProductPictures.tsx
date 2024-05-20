import classes from './ProductPictures.module.scss'
import Image from 'next/image'
import { useLockedBody, useWindowSize } from 'usehooks-ts'
import ProductPicturesMobile from '@components/Product/ProductPictures/ProductPicturesMobile/ProductPicturesMobile'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import clsx from 'clsx'
import {
  addToFavorite,
  removeFromFavorite,
} from '@store/reducers/favoriteSlice/helpers'
import HeartIcon from '@assets/icons/heart.svg'
import { IProduct } from '@models/product/IProduct'
import { useState } from 'react'
import { defaultImg } from '@utils/constants/product'
import PictureSlider from '@components/Product/PictureSlider/PictureSlider'
import { AnimatePresence } from 'framer-motion'

interface ProductPicturesProps extends IProduct {
  title: string
  mainImg: string
  images: { id: number; url: string }[]
  id: number
  addFavorite: () => void
}

function ProductPictures({
  mainImg,
  images,
  title,
  id,
  addFavorite,
  slug,
  ...keys
}: ProductPicturesProps) {
  const [isErrorImg, setIsErrorImg] = useState<boolean>(false)
  const { width } = useWindowSize()
  const dispatch = useAppDispatch()
  const { products } = useAppSelector((state) => state.cart)
  const { products: favoriteProducts } = useAppSelector(
    (state) => state.favorite,
  )
  const hasInCart = products.some((product) => product.id === id)
  const hasInFavorites = favoriteProducts.some((product) => product.id === id)
  const [activeImage, setActiveImage] = useState<number | null>(null)

  return (
    <>
      <AnimatePresence>
        {activeImage !== null && (
          <PictureSlider
            activeId={activeImage}
            close={() => setActiveImage(null)}
            images={[{ id: 1, url: mainImg }, ...images].map(
              ({ url }, index) => ({ id: index, url }),
            )}
          />
        )}
      </AnimatePresence>
      <ProductPicturesMobile
        img={mainImg}
        list={images}
        title={title}
      />
      <div className={classes.Images}>
        <div className={classes.MainImg}>
          <button
            className={clsx(
              classes.Favorite,
              hasInFavorites && classes.ActiveFavorite,
            )}
            aria-label="В избранное"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              event.preventDefault()
              if (!hasInFavorites) {
                addFavorite()
              } else {
                dispatch(removeFromFavorite(slug))
              }
            }}
          >
            <HeartIcon
              width={24}
              height={24}
            />
          </button>
          <Image
            onError={(error: any) => {
              setIsErrorImg(true)
              error.target.style.display = 'none'
            }}
            src={mainImg}
            alt={title}
            width={488}
            height={488}
            onClick={() => setActiveImage(0)}
          />
          {isErrorImg && (
            <Image
              src={defaultImg}
              alt={title}
              width={488}
              height={488}
            />
          )}
        </div>
        {images.length !== 0 && (
          <ul className={classes.List}>
            {images.map(({ id, url }, index) => (
              <li
                key={id}
                className={classes.Item}
              >
                <Image
                  src={url}
                  alt={title}
                  width={234}
                  height={234}
                  onClick={() => setActiveImage(index + 1)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default ProductPictures
