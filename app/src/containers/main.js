import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

import Layout from '../components/Layout'
import routes from '../configs/routes'

const Me = lazy(() => import('./me'))
const Auth = lazy(() => import('./auth'))
const Admin = lazy(() => import('./admin'))
const Review = lazy(() => import('./review'))

const Main = () => {
  return (
    <Router>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path={routes.auth.path} component={Auth} />
          <Route
            render={() => (
              <Layout>
                <Route exact path={routes.me.path} component={Me} />
                <Route exact path={routes.admin.path} component={Admin} />
                <Route exact path={routes.review.path} component={Review} />
              </Layout>
            )}
          />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default Main
