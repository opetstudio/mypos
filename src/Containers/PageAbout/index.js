import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Redirect } from 'react-router-dom'
// import FooterContainer from '../containers/FooterContainer';
import LayoutContentDetail from '../../Components/LayoutContentDetail'
// import LoginActions from '../Login/redux'

// const paragraph = require('../../Fixtures/paragraph.json')

const TheComponent = props =>
  window.localStorage.getItem('isLoggedIn') === 'true' ? (
    <LayoutContentDetail {...props} />
  ) : (
    <Redirect to='/login' />
  )
// class TheComponent extends Component {
//   componentWillMount () {
//     this.props.loginReset()
//   }
//   render () {
//     if (window.localStorage.getItem('isLoggedIn') === 'true') return <LayoutContentDetail />
//     return <Redirect to='/login' />
//   }
// }

const mapStateToProps = state => {
  // console.log(state)
  return {
    paragraph: 'adf asdf'
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // loginReset: () => dispatch(LoginActions.loginReset())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
