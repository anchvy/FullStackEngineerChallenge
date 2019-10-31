import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import UIPaper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'
import { SPACING, ON_MOBILE } from '../../utils/styles'

const Paper = styled(UIPaper)`
  && {
    padding: ${SPACING.MD};
    margin-bottom: ${SPACING.SM};

    ${ON_MOBILE`
      padding: ${SPACING.SM};
    `}
  }
`
const CollapseContentBox = styled.div`
  padding-top: ${SPACING.SM};
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const CollapseCard = React.memo(props => {
  const { isOpen, mainComponent, collapseComponent } = props

  return (
    <Paper>
      {mainComponent}
      <Collapse in={isOpen} timeout="auto">
        <CollapseContentBox>{collapseComponent}</CollapseContentBox>
      </Collapse>
    </Paper>
  )
})

CollapseCard.propTypes = {
  isOpen: PropTypes.bool,
  mainComponent: PropTypes.node,
  collapseComponent: PropTypes.node,
}

CollapseCard.defaultProps = {
  isOpen: false,
  mainComponent: null,
  collapseComponent: null,
}

export default CollapseCard
