import React, { useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import UITextField from '@material-ui/core/TextField'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import InviteInfoBox from './InviteInfoBox'
import CollapseCard from '../CollapseCard'
import useToggleState from '../../../hooks/useToggleState'
import { parseErrorString } from '../../../utils/graphql'

const TextField = styled(UITextField)`
  width: 100%;
`
// need to implement here
// due to data/error handling
const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: String!, $data: InputReview!) {
    updateReview(id: $id, data: $data) {
      id
      text
    }
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const RequestedReview = React.memo(props => {
  const [mutate, { loading: isLoading, error }] = useMutation(UPDATE_REVIEW)
  const { reviewId } = props

  const inputRef = useRef(null)
  const [canSubmit, setCanSubmit] = useState(false)
  const { state: isOpen, onToggleState } = useToggleState()

  // review-input: onchange
  const onChangeInput = event => {
    const { value } = event.target
    setCanSubmit(value.trim().length > 0)
  }

  // submit-button: onclick
  const onSubmit = useCallback(async () => {
    onToggleState()
    mutate({ variables: { id: `${reviewId}1`, data: { text: inputRef.current.value } } })
  }, [mutate, onToggleState, reviewId])

  return (
    <CollapseCard
      isOpen={isOpen}
      mainComponent={
        <InviteInfoBox
          error={error && parseErrorString(error)}
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

RequestedReview.propTypes = {
  reviewId: PropTypes.string.isRequired,
  revieweeName: PropTypes.string.isRequired,
  reviewText: PropTypes.string,
}

RequestedReview.defaultProps = {
  reviewText: null,
}

export default RequestedReview
