import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import PrisdacHomeLayout from '../../Components/PrisdacHomeLayout'
import { makeData } from '../../Utils/Utils'
import LoginActions, { LoginSelectors } from '../Login/redux'
import UserActions, { UserSelectors } from '../User/redux'
// import FavoriteItemContent from './favoriteItemContent'
// import LibraryItemContent from './libraryItemContent'
// import CustomItemContent from './customItemContent'
import Footer1 from '../Footer/footer1'

// const User = LayoutTableData
const TheComponent = props => (
  <PrisdacHomeLayout
    footer={(<Footer1 />)}
    {...props}
  />
)

const mapStateToProps = (state, ownProps) => {
  // const params = new URLSearchParams(window.location.search)
  // const filter = params.get('filter') // bar
  // console.log('params1===>', window.location.search)
  // console.log('params2===>', ownProps.location.search)
  return {
    // ignite boilerplate state list
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    loginToken: LoginSelectors.getToken(state.login),
    myProfile: UserSelectors.getProfile(state.user),
    // filter,
    username: LoginSelectors.getToken(state.login)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    getUserProfile: query => dispatch(UserActions.userRequestProfile(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
