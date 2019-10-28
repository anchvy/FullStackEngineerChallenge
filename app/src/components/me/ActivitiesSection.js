import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import UIPaper from '@material-ui/core/Paper'
import { SPACING } from '../../utils/styles'

const Paper = styled(UIPaper)`
  && {
    flex: 1;

    margin-bottom: ${SPACING.LG};
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const ActivitiesSection = props => {
  const { name, role, isLoading } = props

  return (
    <Paper>
      {name}
      {role}
    </Paper>
  )
}

ActivitiesSection.propTypes = {
  isLoading: PropTypes.bool,
  name: PropTypes.string,
  role: PropTypes.oneOf(['ADMIN', 'STAFF']),
}

ActivitiesSection.defaultProps = {
  isLoading: false,
  name: null,
  role: 'STAFF',
}

export default ActivitiesSection
