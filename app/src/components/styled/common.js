import styled, { css } from 'styled-components'
import { ON_MOBILE } from '../../utils/styles'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'column'};
  width: 100%;

  ${props =>
    props.responsive &&
    css`
      align-items: flex-start;
      flex-direction: row;
      ${ON_MOBILE`
        align-items: unset;
        flex-direction: column;
      `}
    `}
`
