import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import DoneIcon from '@material-ui/icons/Done'
import UITextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import UIButton from '@material-ui/core/Button'

import { SPACING } from '../../../utils/styles'
import { ErrorText, Paper } from '../styled'

const Title = styled.span`
  font-weight: bold;
  margin-bottom: ${SPACING.MD};
  padding-bottom: ${SPACING.SM};
  text-transform: uppercase;
`
const TextField = styled(UITextField)`
  && {
    margin-bottom: ${SPACING.SM};
  }
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

const InfoForm = props => {
  const [state, setState] = useState(props.text)

  // input: onchange
  const onChangeInput = event => {
    const target = event.currentTarget
    setState(target.value)
  }
  // submit-button: onclick
  const onClickSubmitButton = () => props.onSubmit(state)

  return (
    <Paper padding={props.padding} bottomSpacing={props.bottomSpacing}>
      {props.title && <Title>{props.title}</Title>}
      <TextField
        fullWidth
        label="Review text"
        multiline
        rows="3"
        variant="outlined"
        onChange={onChangeInput}
        value={state}
      />
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

InfoForm.propTypes = {
  text: PropTypes.string,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  padding: PropTypes.string,
  bottomSpacing: PropTypes.string,
}

InfoForm.defaultProps = {
  text: '',
  error: null,
  title: null,
  isLoading: false,
  onSubmit: () => {},
  padding: null,
  bottomSpacing: '',
}

export default InfoForm
