import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import NavigationBarComponent from '../components/NavigationBar'

const GET_EMPLOYEE_INFO = gql`
  query GetEmployeeInfo {
    employee {
      id
      name
    }
  }
`

const NavigationBar = () => {
  const { data } = useQuery(GET_EMPLOYEE_INFO)
  const name = get(data, 'employee.name')

  return <NavigationBarComponent name={name} />
}

NavigationBar.propTypes = {}

NavigationBar.defaultProps = {}

export default NavigationBar
