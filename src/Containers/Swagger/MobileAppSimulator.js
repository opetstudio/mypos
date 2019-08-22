import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import Layout from '../../Components/Swagger/MobileAppSimulator'
import { makeData } from '../../Utils/Utils'
import LoginActions, { LoginSelectors } from '../Login/redux'
import UserActions, { UserSelectors } from '../User/redux'
import DebitonlineActions, {DebitonlineSelectors} from './redux'
// import FavoriteItemContent from './favoriteItemContent'
// import LibraryItemContent from './libraryItemContent'
// import CustomItemContent from './customItemContent'
import Footer2 from './Footer/footer2'

// const User = LayoutTableData
const TheComponent = props => (
  <Layout
    footer={(<Footer2 />)}
    history={props.history}
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
    username: LoginSelectors.getToken(state.login),
    history: ownProps.history,
    isRequesting: DebitonlineSelectors.isRequesting(state.debitonline),
    message: DebitonlineSelectors.message(state.debitonline),
    log: DebitonlineSelectors.log(state.debitonline),
    scene: DebitonlineSelectors.scene(state.debitonline),
    initMdoData: DebitonlineSelectors.initMdoData(state.debitonline),
    cardVerifyGenerateOtpData: DebitonlineSelectors.cardVerifyGenerateOtpData(state.debitonline),
    validateOtpData: DebitonlineSelectors.validateOtpData(state.debitonline),
    customerSetTrxLimitData: DebitonlineSelectors.customerSetTrxLimitData(state.debitonline),
    mdoPaymentData: DebitonlineSelectors.mdoPaymentData(state.debitonline),
    mercRefNo: DebitonlineSelectors.mercRefNo(state.debitonline),
    removeCardData: DebitonlineSelectors.removeCardData(state.debitonline)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    getUserProfile: query => dispatch(UserActions.userRequestProfile(query)),
    debitonlineRequest: query => dispatch(DebitonlineActions.debitonlineRequest(query)),
    debitonlineRequestPatch: query => dispatch(DebitonlineActions.debitonlineRequestPatch(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
