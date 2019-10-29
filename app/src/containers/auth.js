import React, { useCallback } from 'react'
import gql from 'graphql-tag'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { get } from 'lodash'
import routes from '../configs/routes'
import { getToken, setToken } from '../utils/auth'

import AuthComponent from '../components/Auth'

const AUTH = gql`
  mutation Auth($id: String!) {
    auth(employeeId: $id) {
      token
      message
    }
  }
`

const VERIFY_TOKEN = gql`
  query VerifyToken($token: String!) {
    verifyToken(token: $token) {
      isActive
    }
  }
`

const Auth = () => {
  const token = getToken()
  const history = useHistory()

  const [mutate, { loading: isAuthLoading, data: authData }] = useMutation(AUTH)
  const { loading: isVerifyLoading, data: verifyData } = useQuery(VERIFY_TOKEN, { variables: { token } })

  // if auth successfully, then navigate to employee page
  if (get(verifyData, 'verifyToken.isActive')) {
    history.push(routes.me.path)
  }

  // if auth successfully, then store the current token and navigate to employee page
  if (get(authData, 'auth.token')) {
    setToken(authData.auth.token)
    history.push(routes.me.path)
  }

  // login-button: onclick event
  const onClickSignInButton = useCallback(id => mutate({ variables: { id } }), [mutate])

  return (
    <AuthComponent
      authErrorText={get(authData, 'auth.message')}
      isLoading={isVerifyLoading}
      isAuthLoading={isAuthLoading}
      onClickSignInButton={onClickSignInButton}
    />
  )
}

export default Auth
