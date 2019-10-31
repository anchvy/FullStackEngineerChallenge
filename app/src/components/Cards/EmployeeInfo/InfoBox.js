import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import RateReviewIcon from '@material-ui/icons/RateReview'
import StarIcon from '@material-ui/icons/Star'
import COLORS from '../../../utils/colors'
import { Wrapper, InfoContainer, Image, InfoDetailBox, ActionBox } from '../styled'

const StatusText = styled.span`
  color: ${COLORS.ORANGE};
`
const NameText = styled.span``
const NumberText = styled.span`
  color: ${COLORS.GRAY};
  font-size: 12px;
  font-style: italic;
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const InfoBox = props => {
  const buttonLabel = props.isOpen ? <CloseIcon /> : <EditIcon />

  return (
    <Wrapper>
      <InfoContainer>
        <Image src="/tmp/images/member-placeholder.png" alt="employee image" />
        <InfoDetailBox>
          <NumberText>{`${props.id}:`}</NumberText>
          <NameText>{props.name}</NameText>
          {props.role === 'ADMIN' && <StarIcon htmlColor={COLORS.DARK_BLUE} />}
          {props.isOpen && <StatusText>- Editing...</StatusText>}
        </InfoDetailBox>
      </InfoContainer>
      <ActionBox>
        <IconButton onClick={props.onToggleState}>{buttonLabel}</IconButton>
        <IconButton onClick={props.onReview}>{<RateReviewIcon />}</IconButton>
        <IconButton onClick={props.onDelete}>
          <DeleteIcon />
        </IconButton>
      </ActionBox>
    </Wrapper>
  )
}

InfoBox.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['STAFF', 'ADMIN']).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggleState: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onReview: PropTypes.func,
}
InfoBox.defaultProps = {
  onDelete: () => {},
  onReview: () => {},
}

export default InfoBox
