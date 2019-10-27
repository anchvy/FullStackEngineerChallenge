import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// import { useQuery }

const Wrapper = styled.div``

const withAuthentication = Component => props => {
  return <Wrapper>{Component}</Wrapper>
}

withAuthentication.propTypes = {}

withAuthentication.defaultProps = {}

export default withAuthentication
