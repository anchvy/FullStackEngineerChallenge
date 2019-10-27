import React, { useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import InputAdornment from '@material-ui/core/InputAdornment'
import UITextField from '@material-ui/core/TextField'
import UIButton from '@material-ui/core/Button'

import { useMutation } from '@apollo/react-hooks'
import { get } from 'lodash'
import gql from 'graphql-tag'
import routes from '../../configs/routes'
import { setToken } from '../../utils/auth'
import { SPACING } from '../../utils/styles'

const EMPLOYEE_ID_PREFIX = process.env.REACT_APP_EMPLOYEE_ID_PREFIX

const TextField = styled(UITextField)`
  && {
    margin-bottom: ${SPACING.MD};
    width: 100%;
  }
`
const Button = styled(UIButton)`
  && {
    width: 100%;
  }
`
const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-bottom: ${SPACING.MD};
  width: 100%;
`

const AUTH = gql`
  mutation Auth($id: String!) {
    auth(employeeId: $id) {
      token
      message
    }
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const LoginForm = () => {
  const history = useHistory()
  const textFieldRef = useRef(null)
  const [mutate, { loading, data }] = useMutation(AUTH)
  const errorText = get(data, 'auth.message')

  // if auth successfully, then store the current token and navigate to employee page
  if (get(data, 'auth.token')) {
    setToken(data.auth.token)
    history.push(routes.me.path)
  }

  // signin button: onclick
  const onClickSignInButton = () => {
    const { value } = textFieldRef.current
    mutate({ variables: { id: EMPLOYEE_ID_PREFIX + value } })
  }

  return (
    <>
      <TextField
        inputRef={textFieldRef}
        required
        placeholder="0000000000"
        variant="outlined"
        label="employee ID"
        InputProps={{
          startAdornment: <InputAdornment position="start">{EMPLOYEE_ID_PREFIX}</InputAdornment>,
        }}
      />
      {errorText && <ErrorText>{`* ${errorText}`}</ErrorText>}
      <Button variant="contained" color="primary" onClick={onClickSignInButton} disabled={!!loading}>
        {loading ? 'Loading...' : 'Sign In'}
      </Button>
    </>
  )
}

export default LoginForm
