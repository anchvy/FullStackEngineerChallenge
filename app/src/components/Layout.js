import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import NavigationBar from './NavigationBar'
import { LAYOUT_PADDING } from '../utils/styles'

// const Wrapper = styled.div``
const Container = styled.div`
  margin: auto;
  padding: ${LAYOUT_PADDING};
  width: 100%;
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const Layout = props => {
  return (
    <>
      <NavigationBar />
      <Container>{props.children}</Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {}

export default Layout
