import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import ActivitiesSectionComponent from '../../components/me/ActivitiesSection'

const GET_EMPLOYEE_INFO = gql`
  query GetEmployeeInfo {
    employee {
      id
      name
      role
    }
  }
`

const ActivitiesSection = () => {
  const { loading, data } = useQuery(GET_EMPLOYEE_INFO)
  const me = get(data, 'employee', {})

  return <ActivitiesSectionComponent isLoading={loading} name={me.name} role={me.role} />
}

export default ActivitiesSection
