import React, { useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import InputAdornment from '@material-ui/core/InputAdornment'
import UITextField from '@material-ui/core/TextField'
import UIButton from '@material-ui/core/Button'
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

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const LoginForm = React.memo(props => {
  const { isLoading, errorText } = props
  const textFieldRef = useRef(null)

  // signin button: onclick
  const onClickSignInButton = () => {
    const { value } = textFieldRef.current
    props.onClickSignInButton(EMPLOYEE_ID_PREFIX + value)
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
      <Button variant="contained" color="primary" onClick={onClickSignInButton} disabled={!!isLoading}>
        {isLoading ? 'Loading...' : 'Sign In'}
      </Button>
    </>
  )
})

LoginForm.propTypes = {
  errorText: PropTypes.string,
  isLoading: PropTypes.bool,
  onClickSignInButton: PropTypes.func,
}

LoginForm.defaultProps = {
  errorText: null,
  isLoading: false,
  onClickSignInButton: () => {},
}

export default LoginForm
