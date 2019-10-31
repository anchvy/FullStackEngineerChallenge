import React from 'react'
import styled from 'styled-components'

import UIErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { Paper as UIPaper } from './styled'
import { FLEX_CENTER, SPACING } from '../../utils/styles'

const Paper = styled(UIPaper)`
  && {
    ${FLEX_CENTER}
    flex-direction: row;
  }
`
const ErrorOutlineIcon = styled(UIErrorOutlineIcon)`
  && {
    margin-right: ${SPACING.MD};
  }
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const EmptyCard = () => (
  <Paper>
    <ErrorOutlineIcon />
    NOT_FOUND_ITEMS
  </Paper>
)

export default EmptyCard
