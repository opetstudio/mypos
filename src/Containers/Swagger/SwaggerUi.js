import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {path} from 'ramda'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import SwaggerUiLayout from '../../Components/Swagger/SwaggerUi'
import { makeData } from '../../Utils/Utils'
import LoginActions, { LoginSelectors } from '../Login/redux'
import UserActions, { UserSelectors } from '../User/redux'
// import FavoriteItemContent from './favoriteItemContent'
// import LibraryItemContent from './libraryItemContent'
// import CustomItemContent from './customItemContent'
import Footer2 from '../Footer/footer2'
import Carousel1 from '../../Components/Carousel/carousel1'

// const User = LayoutTableData
const TheComponent = props =>
  window.localStorage.getItem('isLoggedIn') === 'true' ? (
    <SwaggerUiLayout
      footer={(<Footer2 />)}
      history={props.history}
      carousel={(<Carousel1 />)}
      {...props}
    />
  ) : (<Redirect to='/' />)

const mapStateToProps = (state, ownProps) => {
//   const params = new URLSearchParams(window.location.search)
  const appName = path(['match', 'params', 'appName'], ownProps)
//   const filter = params.get('app-name') // bar
  // console.log('params1===>', window.location.search)
  // console.log('params2===>', ownProps.location.search)
  return {
    // ignite boilerplate state list
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    loginToken: LoginSelectors.getToken(state.login),
    myProfile: UserSelectors.getProfile(state.user),
    // filter,
    username: LoginSelectors.getToken(state.login),
    history: ownProps.history,
    appName
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
