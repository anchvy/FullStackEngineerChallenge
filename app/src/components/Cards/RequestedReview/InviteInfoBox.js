import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import RateReviewIcon from '@material-ui/icons/RateReview'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import CreateIcon from '@material-ui/icons/Create'
import SendIcon from '@material-ui/icons/Send'
import COLORS from '../../../utils/colors'
import { SPACING } from '../../../utils/styles'
import { Wrapper, InfoContainer, ErrorText, ActionBox } from '../styled'

const InviteTitle = styled.span`
  align-self: center;
  margin: 0 ${SPACING.MD};
`
const RevieweeTitle = styled.span`
  color: ${COLORS.DARK_BLUE};
  text-transform: uppercase;
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const InviteInfoBox = props => {
  const isReviewed = !!props.reviewText

  let buttonLabel = <CreateIcon />
  let buttonOnClick = props.onToggleState

  const title = isReviewed ? 'Thank you for your reviewing' : 'You have been invited to review'

  if (props.isLoading) {
    buttonLabel = <CircularProgress size={10} />
  } else if (props.canSubmit && props.isOpen) {
    buttonLabel = <SendIcon />
    buttonOnClick = props.onSubmit
  } else if (props.isOpen) {
    buttonLabel = <CloseIcon />
  }

  return (
    <>
      <Wrapper>
        <InfoContainer>
          {!isReviewed ? <RateReviewIcon /> : <DoneIcon />}
          <InviteTitle>
            {title}
            &nbsp;
            <RevieweeTitle>{props.revieweeName}</RevieweeTitle>
          </InviteTitle>
        </InfoContainer>
        {!isReviewed && (
          <ActionBox mobileAligned="flex-end">
            <IconButton onClick={buttonOnClick} disabled={props.isLoading}>
              {buttonLabel}
            </IconButton>
          </ActionBox>
        )}
      </Wrapper>
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
