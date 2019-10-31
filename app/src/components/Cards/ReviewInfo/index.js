import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import CollapseCard from '../CollapseCard'
import useToggleState from '../../../hooks/useToggleState'
import { parseErrorString } from '../../../utils/graphql'

import InfoBox from './InfoBox'
import InfoForm from './InfoForm'

const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: String!, $data: InputReview!) {
    updateReview(id: $id, data: $data) {
      id
      text
    }
  }
`
const REMOVE_REVIEW = gql`
  mutation removeReview($id: String!) {
    removeReview(id: $id) {
      id
      isActive
    }
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const ReviewInfo = React.memo(props => {
  const { state: isOpen, onToggleState } = useToggleState()
  const [updateReview, { loading: isLoading, error }] = useMutation(UPDATE_REVIEW)
  const [removeReview] = useMutation(REMOVE_REVIEW)

  // submit-button: onclick
  const onSubmit = useCallback(
    async inputState => {
      await updateReview({ variables: { id: props.id, data: { text: inputState } } })
      onToggleState()
    },
    [updateReview, props.id, onToggleState]
  )
  // delete-button: onclick
  const onDelete = useCallback(() => {
    removeReview({ variables: { id: props.id } })
  }, [props.id, removeReview])

  return (
    <CollapseCard
      isOpen={isOpen}
      mainComponent={<InfoBox {...props} onToggleState={onToggleState} isOpen={isOpen} onDelete={onDelete} />}
      collapseComponent={
        <InfoForm
          {...props}
          onSubmit={onSubmit}
          isLoading={isLoading}
          title="Edit Review"
          error={error && parseErrorString(error)}
        />
      }
    />
  )
})

ReviewInfo.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string,
  reviewer: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
}

ReviewInfo.defaultProps = {
  text: null,
}

export default ReviewInfo
