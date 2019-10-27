import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { get } from 'lodash'
import { getToken } from '../utils/auth'

import AuthComponent from '../components/auth'
// import routes from '../configs/routes'

const VERIFY_TOKEN = gql`
  query VerifyToken($token: String!) {
    verifyToken(token: $token) {
      isActive
    }
  }
`

// const Me = lazy(() => import('./me'))
// const Auth = lazy(() => import('./auth'))
// const About = lazy(() => import('./routes/About'))

const Auth = () => {
  const token = getToken()
  const { loading, data } = useQuery(VERIFY_TOKEN, { variables: { token } })

  return <AuthComponent isLoading={loading} isAuth={get(data, 'verifyToken.isActive')} />
}

export default Auth
