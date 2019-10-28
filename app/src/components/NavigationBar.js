import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import UIAvatar from '@material-ui/core/Avatar'

import { LAYOUT_PADDING } from '../utils/styles'
import COLORS from '../utils/colors'

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
const Avatar = styled(UIAvatar)`
  && {
    text-transform: uppercase;
    background: ${COLORS.BLUE};
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const NavigationBar = props => {
  const { name } = props

  return (
    <AppBar position="static" color="inherit">
      <Container>
        <Logo src="/tmp/images/logo.png" alt="Logo" />
        {name && <Avatar>{name.substr(0, 1)}</Avatar>}
      </Container>
    </AppBar>
  )
}

NavigationBar.propTypes = {
  name: PropTypes.string,
}

NavigationBar.defaultProps = {
  name: null,
}

export default NavigationBar
