import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'

import Layout from '../components/Layout'
import routes from '../configs/routes'

// const Me = lazy(() => import('./me'))
const Auth = lazy(() => import('./auth'))
// const About = lazy(() => import('./routes/About'))

const Main = () => {
  return (
    <>
      {/* <Layout> */}
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* <Route exact path="/about" component={About} /> */}
            {/* <Route exact path={routes.me.path} component={Me} /> */}
            <Route exact path={routes.auth.path} component={Auth} />
          </Switch>
        </Suspense>
      </Router>
      {/* </Layout> */}
    </>
  )
}

export default Main
