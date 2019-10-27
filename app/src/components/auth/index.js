import React, { Suspense, lazy } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import UIPaper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import { SPACING, FLEX_CENTER } from '../../utils/styles'
import COLORS from '../../utils/colors'
import routes from '../../configs/routes'

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
  const history = useHistory()
  const { isLoading, isAuth } = props

  // if auth successfully, then navigate to employee page
  if (isAuth) {
    history.push(routes.me.path)
  }

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
            <LoginForm />
          </Suspense>
        )}
      </Paper>
    </Wrapper>
  )
})

Auth.propTypes = {
  isAuth: PropTypes.bool,
  isLoading: PropTypes.bool,
}

Auth.defaultProps = {
  isAuth: false,
  isLoading: false,
}

export default Auth
