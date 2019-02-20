import React from 'react'
// import { AComponentName } from '../Components'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Redirect } from 'react-router-dom'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import PointofsaleLayout from '../Components/PointofsaleLayout'
import LoginActions, { LoginSelectors } from './Login/redux'
import UserActions from './User/redux'

export class RootScreen extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  // componentWillReceiveProps (newProps) {
  //  this.setState(newProps.something)
  // }

  render () {
    // console.log('process.env.NODE_ENV===>', process.env)
    // console.log('__dirname===>', __dirname)
    // console.log('__DEV__===>', __DEV__)
    return (
      <div style={{ flex: 1 }}>
        <div>Hello There.</div>
      </div>
    )
  }
}

const TheComponent = props =>
  window.localStorage.getItem('isLoggedIn') === 'true' ? (
    <PointofsaleLayout {...props} />
  ) : (
    <Redirect to='/login' />
  )

const mapStateToProps = state => {
  // console.log(state)
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    username: LoginSelectors.getToken(state.login)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: query => dispatch(UserActions.userRequestProfile(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
