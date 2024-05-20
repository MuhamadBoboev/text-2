import classes from './BrandBanner.module.scss'
import { IBrand } from '@models/IBrand'

interface BrandBannerProps {
  brand: IBrand
}

function BrandBanner({ brand }: BrandBannerProps) {
  if (!brand.banner_image) return null

  return (
    <div className={classes.Banner}>
      <img
        className={classes.Image}
        src={process.env.NEXT_PUBLIC_SERVER_URL + brand.banner_image}
        alt={brand.name}
        width={816}
        height={140}
      />
    </div>
  )
}

export default BrandBanner
