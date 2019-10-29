import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress'
import UITextField from '@material-ui/core/TextField'
import UIButton from '@material-ui/core/Button'
import RateReviewIcon from '@material-ui/icons/RateReview'
import DoneIcon from '@material-ui/icons/Done'
import CollapseCard from './CollapseCard'
import COLORS from '../../utils/colors'
import { SPACING } from '../../utils/styles'
import useToggleState from '../../hooks/useToggleState'

const InviteInfoWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`
const InfoContainer = styled.div`
  display: flex;
`
const InviteTitle = styled.span`
  align-self: center;
  margin: 0 ${SPACING.MD};
`
const RevieweeTitle = styled.span`
  color: ${COLORS.DARK_BLUE};
`
const TextField = styled(UITextField)`
  width: 100%;
`
const Button = styled(UIButton)`
  && {
    min-height: 25px;
    padding: 0;
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const InviteInfoBox = props => {
  const { canSubmit, isOpen, revieweeName, onToggleState, onSubmit, reviewText, isLoading } = props
  const isReviewed = !!reviewText

  let buttonLabel = 'Review'
  let buttonColor = 'primary'
  let buttonOnClick = onToggleState

  if (isLoading) {
    buttonLabel = <CircularProgress size={10} />
  } else if (canSubmit) {
    buttonLabel = 'Send'
    buttonOnClick = onSubmit
  } else if (isOpen) {
    buttonLabel = 'Cancel'
    buttonColor = 'secondary'
  }

  return (
    <InviteInfoWrapper>
      <InfoContainer>
        {!isReviewed ? <RateReviewIcon /> : <DoneIcon />}
        <InviteTitle>
          You have been invited to review&nbsp;
          <RevieweeTitle>{revieweeName}</RevieweeTitle>
        </InviteTitle>
      </InfoContainer>
      {!isReviewed && (
        <Button variant="outlined" color={buttonColor} onClick={buttonOnClick}>
          {buttonLabel}
        </Button>
      )}
    </InviteInfoWrapper>
  )
}

const RequestedReview = React.memo(props => {
  const { reviewId, onSubmitReview } = props

  const inputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [canSubmit, setCanSubmit] = useState(false)
  const { state: isOpen, onToggleState } = useToggleState()

  // review-input: onchange
  const onChangeInput = event => {
    const { value } = event.target
    setCanSubmit(value.trim().length > 0)
  }

  // submit-button: onclick
  const onSubmit = useCallback(() => {
    onToggleState()
    setIsLoading(true)
    onSubmitReview(reviewId, inputRef.current.value)
  }, [onSubmitReview, onToggleState, reviewId])

  return (
    <CollapseCard
      isOpen={isOpen}
      mainComponent={
        <InviteInfoBox
          isLoading={isLoading}
          canSubmit={canSubmit}
          isOpen={isOpen}
          revieweeName={props.revieweeName}
          reviewText={props.reviewText}
          onToggleState={onToggleState}
          onSubmit={onSubmit}
        />
      }
      collapseComponent={
        <TextField
          inputRef={inputRef}
          id="outlined-multiline-static"
          label="Your recommendation"
          multiline
          rows="3"
          variant="outlined"
          onChange={onChangeInput}
        />
      }
    />
  )
})

InviteInfoBox.propTypes = {
  canSubmit: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onToggleState: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  revieweeName: PropTypes.string.isRequired,
  reviewText: PropTypes.string,
}

InviteInfoBox.defaultProps = {
  reviewText: null,
}

RequestedReview.propTypes = {
  reviewId: PropTypes.string.isRequired,
  revieweeName: PropTypes.string.isRequired,
  onSubmitReview: PropTypes.func.isRequired,
  reviewText: PropTypes.string,
}

RequestedReview.defaultProps = {
  reviewText: null,
}

export default RequestedReview
