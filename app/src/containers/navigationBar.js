import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'

import NavigationBarComponent from '../components/NavigationBar'
import routes from '../configs/routes'
import { setToken } from '../utils/auth'

const GET_EMPLOYEE_INFO = gql`
  query GetEmployeeInfo {
    employee {
      id
      name
      role
    }
  }
`

const ADMIN_MENU = [
  {
    title: 'Admin Dashboard',
    redirectPath: routes.admin.path,
  },
]
const DEFAULT_MENU = [
  {
    title: 'My Dashboard',
    redirectPath: routes.me.path,
  },
]

const NavigationBar = () => {
  const { data } = useQuery(GET_EMPLOYEE_INFO)
  const employee = get(data, 'employee', {})
  let menu = DEFAULT_MENU

  // add more config for admin level
  if (employee.role === 'ADMIN') {
    menu = [...DEFAULT_MENU, ...ADMIN_MENU]
  }

  // logout-button: onclick
  const onClickLogoutButton = () => {
    setToken('')
    window.location.href = routes.auth.path
  }

  return <NavigationBarComponent name={employee.name} menuItems={menu} onClickLogoutButton={onClickLogoutButton} />
}

export default NavigationBar
