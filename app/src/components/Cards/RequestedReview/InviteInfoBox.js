import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress'
import UIButton from '@material-ui/core/Button'
import RateReviewIcon from '@material-ui/icons/RateReview'
import DoneIcon from '@material-ui/icons/Done'
import COLORS from '../../../utils/colors'
import { SPACING } from '../../../utils/styles'

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
const ErrorText = styled.span`
  color: ${COLORS.RED};
  display: block;
  font-size: 10px;
  padding-top: ${SPACING.XS};
  text-align: right;
`
const RevieweeTitle = styled.span`
  color: ${COLORS.DARK_BLUE};
  text-transform: uppercase;
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
  const isReviewed = !!props.reviewText

  let buttonLabel = 'Review'
  let buttonColor = 'primary'
  let buttonOnClick = props.onToggleState

  const title = isReviewed ? 'Thank you for your reviewing' : 'You have been invited to review'

  if (props.isLoading) {
    buttonLabel = <CircularProgress size={10} />
  } else if (props.canSubmit && props.isOpen) {
    buttonLabel = 'Send'
    buttonOnClick = props.onSubmit
  } else if (props.isOpen) {
    buttonLabel = 'Cancel'
    buttonColor = 'secondary'
  }

  return (
    <>
      <InviteInfoWrapper>
        <InfoContainer>
          {!isReviewed ? <RateReviewIcon /> : <DoneIcon />}
          <InviteTitle>
            {title}
            &nbsp;
            <RevieweeTitle>{props.revieweeName}</RevieweeTitle>
          </InviteTitle>
        </InfoContainer>

        <Button variant="outlined" color={buttonColor} onClick={buttonOnClick} disabled={props.isLoading}>
          {buttonLabel}
        </Button>
      </InviteInfoWrapper>
      {props.error && <ErrorText>{`* ${props.error}`}</ErrorText>}
    </>
  )
}

InviteInfoBox.propTypes = {
  error: PropTypes.string,
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
  error: null,
}

export default InviteInfoBox
