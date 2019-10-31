import React from 'react'
import styled, { css } from 'styled-components'
import UIPaper from '@material-ui/core/Paper'
import { ON_MOBILE, SPACING } from '../../utils/styles'
import COLORS from '../../utils/colors'

export const Paper = styled(({ bottomSpacing, ...rest }) => <UIPaper {...rest} />)`
  && {
    border-top: 2px solid ${COLORS.DARK_BLUE};
    display: flex;
    flex-direction: column;
    padding: ${props => props.padding || SPACING.MD};
    margin-bottom: ${props => props.bottomSpacing || 0};
  }
`
export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${ON_MOBILE`
    flex-direction: column;
  `}
`
export const InfoContainer = styled.div`
  display: flex;

  ${ON_MOBILE`
    align-self: flex-start;
  `}
`
export const Image = styled.img`
  border-radius: 50%;
  width: 40px;

  ${ON_MOBILE`
    display: none;
  `}
`
export const InfoDetailBox = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;

  > span {
    margin-left: ${SPACING.SM};
  }
`
export const ErrorText = styled.span`
  color: ${COLORS.RED};
  display: block;
  font-size: 10px;
  padding-top: ${SPACING.XS};
  text-align: right;
`
export const ActionBox = styled.div`
  ${props =>
    props.mobileAligned &&
    css`
      ${ON_MOBILE`
    align-self: ${props.mobileAligned};
  `}
    `}
`
