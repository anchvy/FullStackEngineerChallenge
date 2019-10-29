import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import UIPaper from '@material-ui/core/Paper'
import RequestedReview from '../Cards/RequestedReview'
import { SPACING } from '../../utils/styles'

const Paper = styled(UIPaper)`
  && {
    flex: 1;
    padding: ${SPACING.XXL};
  }
`
const Title = styled.h2`
  font-weight: bold;
  margin-bottom ${SPACING.XL};
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const ActivitiesSection = React.memo(props => {
  const { isListLoading, reviews, onSubmitReview } = props

  return (
    <Paper>
      <section>
        <Title>Review Requests</Title>
        {isListLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {reviews.map(review => (
              <RequestedReview
                key={`review-${review.id}`}
                reviewId={review.id}
                revieweeName={review.reviewee.name}
                reviewText={review.text}
                onSubmitReview={onSubmitReview}
              />
            ))}
          </>
        )}
      </section>
    </Paper>
  )
})

ActivitiesSection.propTypes = {
  onSubmitReview: PropTypes.func.isRequired,
  isListLoading: PropTypes.bool,
  reviews: PropTypes.array,
}

ActivitiesSection.defaultProps = {
  isListLoading: false,
  reviews: [],
}

export default ActivitiesSection
