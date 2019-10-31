import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import EmployeeListSectionComponent from '../../components/Admin/EmployeeListSection'

export const GET_EMPLOYEES = gql`
  query GetEmployees {
    employees {
      id
      name
      role
      isActive
    }
  }
`

const EmployeeListSection = () => {
  const { loading, data } = useQuery(GET_EMPLOYEES)
  const employees = get(data, 'employees', [])

  return <EmployeeListSectionComponent isLoading={loading} employees={employees} />
}

export default EmployeeListSection
