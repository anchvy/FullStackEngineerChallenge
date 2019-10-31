import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import DoneIcon from '@material-ui/icons/Done'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import UIButton from '@material-ui/core/Button'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'

import { SPACING } from '../../utils/styles'
import { ErrorText, Paper } from './styled'

const Title = styled.span`
  font-weight: bold;
  margin-bottom: ${SPACING.MD};
  padding-bottom: ${SPACING.SM};
  text-transform: uppercase;
`
const Button = styled(UIButton)`
  && {
    align-self: flex-end;
    max-width: 150px;
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const EmployeeInfoForm = props => {
  const [state, setState] = useState({ name: props.name, role: props.role })

  // input: onchange
  const onChangeInput = event => {
    const target = event.currentTarget

    return setState(prevState => ({
      ...prevState,
      [target.getAttribute('name')]: target.value,
    }))
  }
  // submit-button: onclick
  const onClickSubmitButton = () => props.onSubmit(state)

  return (
    <Paper padding={props.padding} bottomSpacing={props.bottomSpacing}>
      {props.title && <Title>{props.title}</Title>}
      <TextField
        onChange={onChangeInput}
        name="name"
        value={state.name}
        placeholder="Employee Name"
        label="Employee Name"
        fullWidth
      />
      <RadioGroup aria-label="position" name="role" row value={state.role} onChange={onChangeInput}>
        <FormControlLabel value="ADMIN" control={<Radio color="primary" />} label="Admin" labelPlacement="end" />
        <FormControlLabel value="STAFF" control={<Radio color="primary" />} label="Staff" labelPlacement="end" />
      </RadioGroup>
      {props.error && <ErrorText>{`* ${props.error}`}</ErrorText>}
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={props.isLoading ? <CircularProgress size={10} /> : <DoneIcon />}
        onClick={onClickSubmitButton}
        disabled={props.isLoading}
      >
        Submit
      </Button>
    </Paper>
  )
}

EmployeeInfoForm.propTypes = {
  name: PropTypes.string,
  role: PropTypes.oneOf(['STAFF', 'ADMIN']),
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  padding: PropTypes.string,
  bottomSpacing: PropTypes.string,
}

EmployeeInfoForm.defaultProps = {
  name: '',
  role: 'STAFF',
  error: null,
  title: null,
  isLoading: false,
  onSubmit: () => {},
  padding: null,
  bottomSpacing: '',
}

export default EmployeeInfoForm
