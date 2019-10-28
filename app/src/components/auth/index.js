import React, { Suspense, lazy } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import UIPaper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import { SPACING, FLEX_CENTER } from '../../utils/styles'
import COLORS from '../../utils/colors'

const Wrapper = styled.div`
  height: 100vh;

  ${FLEX_CENTER}
`
const Paper = styled(UIPaper)`
  && {
    flex-direction: column;
    min-width: 320px;
    padding: ${SPACING.XL};

    ${FLEX_CENTER}
  }
`
const Logo = styled.img`
  width: 60px;
`
const LoaderTitle = styled.span`
  font-size: 16px;
  margin-top: ${SPACING.SM};
`
const LogoBox = styled.div`
  border-bottom: 1px solid ${COLORS.LIGHT_BLUE};
  margin-bottom: ${SPACING.XL};
  padding-bottom: ${SPACING.MD};
  text-align: center;
  width: 100%;
`

/* -------------------------------------------- *
 * REACT COMPONENT
 * -------------------------------------------- */

const LoginForm = lazy(() => import('./LoginForm'))

const Loader = () => (
  <>
    <CircularProgress />
    <LoaderTitle>Checking your authorization....</LoaderTitle>
  </>
)

const Auth = React.memo(props => {
  const { authErrorText, isLoading, onClickSignInButton } = props

  return (
    <Wrapper>
      <Paper>
        <LogoBox>
          <Logo src="/tmp/images/logo.png" alt="Logo" />
        </LogoBox>
        {isLoading ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <LoginForm onClickSignInButton={onClickSignInButton} errorText={authErrorText} />
          </Suspense>
        )}
      </Paper>
    </Wrapper>
  )
})

Auth.propTypes = {
  authErrorText: PropTypes.string,
  isLoading: PropTypes.bool,
  onClickSignInButton: PropTypes.func,
}

Auth.defaultProps = {
  authErrorText: null,
  isLoading: false,
  onClickSignInButton: () => {},
}

export default Auth
