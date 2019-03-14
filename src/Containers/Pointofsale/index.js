import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import PointofsaleLayout from '../../Components/PointofsaleLayout'
import { makeData } from '../../Utils/Utils'
import LoginActions, { LoginSelectors } from '../Login/redux'
import UserActions, { UserSelectors } from '../User/redux'
import FavoriteItemContent from './favoriteItemContent'
import LibraryItemContent from './libraryItemContent'
import CustomItemContent from './customItemContent'

// const User = LayoutTableData
const TheComponent = props =>
  window.localStorage.getItem('isLoggedIn') === 'true' ? (
    <PointofsaleLayout
      {...props}
      favoriteItemContent={(<FavoriteItemContent />)}
      libraryItemContent={(<LibraryItemContent />)}
      customItemContent={(<CustomItemContent />)}
    />
  ) : (
    <Redirect to='/login' />
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
