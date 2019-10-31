import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import COLORS from '../../../utils/colors'
import { Wrapper, InfoContainer, Image, InfoDetailBox, ActionBox } from '../styled'

const StatusText = styled.span`
  color: ${COLORS.ORANGE};
`
const NameText = styled.span`
  color: ${COLORS.DARK_BLUE};
  font-weight: bold;
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const InfoBox = props => {
  const buttonLabel = props.isOpen ? <CloseIcon /> : <EditIcon />
  const isReviewed = !!props.text
  const title = isReviewed ? `said "${props.text}"` : `did not reviewed yet.`

  return (
    <Wrapper>
      <InfoContainer>
        <Image src="/tmp/images/member-placeholder.png" alt="employee image" />
        <InfoDetailBox>
          <NameText>{props.reviewer.name}</NameText>
          &nbsp;
          {title}
          {props.isOpen && <StatusText>- Editing...</StatusText>}
        </InfoDetailBox>
      </InfoContainer>
      <ActionBox>
        {isReviewed && <IconButton onClick={props.onToggleState}>{buttonLabel}</IconButton>}
        {isReviewed && (
          <IconButton onClick={props.onDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </ActionBox>
    </Wrapper>
  )
}

InfoBox.propTypes = {
  text: PropTypes.string,
  reviewer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggleState: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
}
InfoBox.defaultProps = {
  text: '',
  onDelete: () => {},
}

export default InfoBox
