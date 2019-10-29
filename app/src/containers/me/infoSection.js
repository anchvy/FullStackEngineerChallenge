import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import InfoSectionComponent from '../../components/Me/InfoSection'

const GET_EMPLOYEE_INFO = gql`
  query GetEmployeeInfo {
    employee {
      id
      name
      role
    }
  }
`

const InfoBox = () => {
  const { loading, data } = useQuery(GET_EMPLOYEE_INFO)
  const me = get(data, 'employee', {})

  return <InfoSectionComponent id={me.id} isLoading={loading} name={me.name} role={me.role} />
}

export default InfoBox
