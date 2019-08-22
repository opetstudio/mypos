import React, { Component } from 'react'
import { Route } from 'react-router-dom'
// import FooterContainer from '../containers/FooterContainer';
// import LoginActions from '../Login/redux'

// const paragraph = require('../../Fixtures/paragraph.json')

class RouteWrapper extends Component {
  render () {
    let TheComponent = this.props.component
    return (
      <Route
        exac={this.props.exac}
        path={this.props.path}
        render={routeProps => <TheComponent {...routeProps} {...this.props} />}
      />
    )
  }
}
export default RouteWrapper
