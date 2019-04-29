import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
// import { HashRouter as Router, Route, withRouter } from 'react-router-dom'

// Import Screens for the Router
// prettier-ignore
import {
  RootScreen
} from '../Containers'
import ResponsiveContainer from '../Containers/Paymentpage/ResponsiveContainer'
import PageProfile from '../Containers/Profile'
import RouteWrapper from '../Containers/RouteWrapper'
// --- import list page entyty ---

import PaymentpageHome from '../Containers/Paymentpage/HomeContainer'
import PaymentpageCallback from '../Containers/Paymentpage/CallbackContainer'

class App extends Component {
  componentWillMount () {
    this.unlisten = this.props.history.listen((location, action) => {
      // console.log('on route change ', location)
      // this.props.onRouteChange(location)
      const loginRestriction = [
        '/about',
        '/entity/user',
        '/entity/participant',
        '/entity/classes',
        '/entity/conference',
        '/entity/badge',
        '/profile',
        '/login'
      ]
      if (loginRestriction.indexOf(location.pathname) !== -1) {
        this.props.checkLogedStatus()
      }
    })
  }
  componentWillUnmount () {
    this.unlisten()
  }
  render () {
    return <div>{this.props.children}</div>
  }
}
const AppContainer = withRouter(App)

class NavigationRouter extends Component {
  componentWillUpdate (prevProps) {
    // console.log('this.props.location=', this.props.location)
    // console.log('prevProps.location=', prevProps.location)
  }
  render () {
    let basePath = '/PaymentPageCc' // for jboss
    // let basePath = '' // for docker
    return (
      <Router>
        <AppContainer checkLogedStatus={this.props.checkLogedStatus}>
          <ResponsiveContainer>
            <Route exact path={`${basePath}/creditcard/paymentPage`} component={PaymentpageHome} />
            <Route exact path={`${basePath}/creditcard/callback`} component={PaymentpageCallback} />
          </ResponsiveContainer>
        </AppContainer>
      </Router>
    )
  }
}
export default NavigationRouter
