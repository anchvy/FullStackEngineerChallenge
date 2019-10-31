import React, { useCallback } from 'react'

import gql from 'graphql-tag'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { parseErrorString } from '../../utils/graphql'

import { GET_EMPLOYEES } from './employeeListSection'
import EmployeeInfoForm from '../../components/Cards/EmployeeInfoForm'
import { SPACING } from '../../utils/styles'

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($data: InputEmployee!) {
    createEmployee(data: $data) {
      id
      name
      role
    }
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const CreateEmployeeSection = React.memo(props => {
  const [mutate, { loading: isLoading, error }] = useMutation(CREATE_EMPLOYEE)
  const [fetchLatestList] = useLazyQuery(GET_EMPLOYEES, { fetchPolicy: 'network-only' })

  // submit-button: onclick
  const onSubmit = useCallback(
    async inputState => {
      await mutate({ variables: { data: inputState } })
      fetchLatestList()
    },
    [fetchLatestList, mutate]
  )

  return (
    <EmployeeInfoForm
      {...props}
      bottomSpacing={SPACING.XL}
      padding={SPACING.XXL}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title={<h2>Create new employee</h2>}
      error={error && parseErrorString(error)}
    />
  )
})

export default CreateEmployeeSection
