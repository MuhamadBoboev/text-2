import classes from './ReviewCard.module.scss'
import { IReview } from '@models/IReview'
import clsx from 'clsx'
import { HandySvg } from 'handy-svg'

interface ReviewCardProps extends IReview {}

function ReviewCard({
  content,
  reviewer_gender,
  reviewer_name,
  reviewer_position,
  id,
  image,
  star_rating,
}: ReviewCardProps) {
  return (
    <li className={classes.Card}>
      <div className={classes.Stars}>
        {new Array(5).fill(1).map((_, index) => (
          <div
            key={index}
            className={clsx(
              classes.Rate,
              star_rating >= index + 1 ? classes.Fill : '',
            )}
          >
            <HandySvg
              src="/assets/icons/star.svg"
              width={22}
              height={20}
            />
          </div>
        ))}
      </div>
      <p className={classes.Review}>{content}</p>

      <div className={classes.Bottom}>
        <img
          className={classes.Avatar}
          src={image}
          alt={reviewer_name}
          width={56}
          height={56}
        />
        <div className={classes.Info}>
          <p className={classes.Author}>{reviewer_name}</p>
          <p className={classes.Job}>{reviewer_position}</p>
        </div>
      </div>
    </li>
  )
}

export default ReviewCard
