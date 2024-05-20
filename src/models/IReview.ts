export interface IReview {
  id: number
  image: string
  reviewer_name: string
  reviewer_position: string
  star_rating: number // 1 - 5
  content: string
  reviewer_gender: 'male' | 'female'
}
