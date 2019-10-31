import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import CollapseCard from '../CollapseCard'
import useToggleState from '../../../hooks/useToggleState'
import { parseErrorString } from '../../../utils/graphql'
import routes from '../../../configs/routes'

import InfoBox from './InfoBox'
import EmployeeInfoForm from '../EmployeeInfoForm'

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: String!, $data: InputEmployee!) {
    updateEmployee(id: $id, data: $data) {
      id
      name
      role
    }
  }
`
const REMOVE_EMPLOYEE = gql`
  mutation deleteEmployee($id: String!) {
    removeEmployee(id: $id) {
      id
      isActive
    }
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const EmployeeInfo = React.memo(props => {
  const history = useHistory()
  const { state: isOpen, onToggleState } = useToggleState()
  const [updateEmployee, { loading: isLoading, error }] = useMutation(UPDATE_EMPLOYEE)
  const [removeEmployee] = useMutation(REMOVE_EMPLOYEE)

  // submit-button: onclick
  const onSubmit = useCallback(
    async inputState => {
      await updateEmployee({ variables: { id: props.id, data: inputState } })
      onToggleState()
    },
    [updateEmployee, onToggleState, props.id]
  )
  // delete-button: onclick
  const onDelete = useCallback(() => {
    removeEmployee({ variables: { id: props.id } })
  }, [removeEmployee, props.id])
  // review-button: onclick
  const onReview = useCallback(() => {
    history.push(routes.review.resolver(props.id))
  }, [history, props.id])

  return (
    <CollapseCard
      isOpen={isOpen}
      mainComponent={
        <InfoBox {...props} onToggleState={onToggleState} isOpen={isOpen} onDelete={onDelete} onReview={onReview} />
      }
      collapseComponent={
        <EmployeeInfoForm
          {...props}
          onSubmit={onSubmit}
          isLoading={isLoading}
          title="Edit Info"
          error={error && parseErrorString(error)}
        />
      }
    />
  )
})

EmployeeInfo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
}

export default EmployeeInfo
