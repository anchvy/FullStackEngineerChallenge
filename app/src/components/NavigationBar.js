import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'

import { LAYOUT_PADDING } from '../utils/styles'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: ${LAYOUT_PADDING};
  width: 100%;
`
const Logo = styled.img`
  width: 48px;
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const NavigationBar = props => {
  return (
    <AppBar position="static" color="inherit">
      <Container>
        <Logo src="/tmp/images/logo.png" alt="Logo" />
        <Avatar>W</Avatar>
      </Container>
    </AppBar>
  )
}

NavigationBar.propTypes = {}

NavigationBar.defaultProps = {}

export default NavigationBar
