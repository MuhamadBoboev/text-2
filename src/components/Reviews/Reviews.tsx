import classes from './Reviews.module.scss'
import Wrapper from '@ui/Wrapper/Wrapper'
import Breadcrumbs from '@ui/Breadcrumbs/Breadcrumbs'
import H2 from '@ui/Typography/H2/H2'
import Divider from '@ui/Divider/Divider'
import { useState } from 'react'
import ReviewCard from '@ui/ReviewCard/ReviewCard'
import { IReview } from '@models/IReview'

interface ReviewsProps {
  reviewList: IReview[]
}

function Reviews({ reviewList }: ReviewsProps) {
  return (
    <div className={classes.Section}>
      <Wrapper className={classes.Wrapper}>
        <Breadcrumbs
          className={classes.Breadcrumbs}
          list={[{ text: 'Главная', link: '/' }]}
          active={{ text: 'Отзывы' }}
        />
        <header className={classes.Header}>
          <H2 className={classes.Title}>Отзывы</H2>
        </header>
        <Divider />
        <ul className={classes.List}>
          {reviewList.map((review) => (
            <ReviewCard
              key={review.id}
              {...review}
            />
          ))}
        </ul>
      </Wrapper>
    </div>
  )
}

export default Reviews
