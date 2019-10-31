import React from 'react'
import PropTypes from 'prop-types'

import ItemListSection from '../ItemListSection'
import RequestedReview from '../Cards/RequestedReview'

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const ActivitiesSection = React.memo(props => {
  const { isLoading, reviews } = props

  return (
    <ItemListSection isLoading={isLoading} title="Activities">
      {reviews.map(review => (
        <RequestedReview
          key={`review-${review.id}`}
          reviewId={review.id}
          revieweeName={review.reviewee.name}
          reviewText={review.text}
        />
      ))}
    </ItemListSection>
  )
})

ActivitiesSection.propTypes = {
  isLoading: PropTypes.bool,
  reviews: PropTypes.array,
}

ActivitiesSection.defaultProps = {
  isLoading: false,
  reviews: [],
}

export default ActivitiesSection
