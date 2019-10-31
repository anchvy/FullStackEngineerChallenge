import React from 'react'
import PropTypes from 'prop-types'

import ReviewInfo from '../Cards/ReviewInfo'
import ItemListSection from '../ItemListSection'

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const ReviewListSection = React.memo(props => {
  const { isLoading, name, reviews } = props

  return (
    <ItemListSection isLoading={isLoading} title={`All reviews of ${name.toUpperCase()}`}>
      {reviews.map(review => {
        if (!review.isActive) return null
        return <ReviewInfo key={`review-${review.id}`} id={review.id} text={review.text} reviewer={review.reviewer} />
      })}
    </ItemListSection>
  )
})

ReviewListSection.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  reviews: PropTypes.array,
}

ReviewListSection.defaultProps = {
  isLoading: false,
  name: '',
  reviews: [],
}

export default ReviewListSection
