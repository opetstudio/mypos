import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import CallbackComponent from '../../Components/Paymentpage/CallbackComponent'
import { makeData } from '../../Utils/Utils'
// import LoginActions, { LoginSelectors } from '../Login/redux'
// import UserActions, { UserSelectors } from '../User/redux'
import PaymentpageActions, {PaymentpageSelectors} from './redux'
// import FavoriteItemContent from './favoriteItemContent'
// import LibraryItemContent from './libraryItemContent'
// import CustomItemContent from './customItemContent'
import Footer2 from './Footer/footer2'

// const User = LayoutTableData
const TheComponent = props => (
  <CallbackComponent
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
    // isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    // loginToken: LoginSelectors.getToken(state.login),
    // myProfile: UserSelectors.getProfile(state.user),
    // filter,
    message: PaymentpageSelectors.message(state.paymentpage),
    paymentStatus: PaymentpageSelectors.paymentStatus(state.paymentpage),
    paymentStatusMessage: PaymentpageSelectors.paymentStatusMessage(state.paymentpage),
    ctrxId: PaymentpageSelectors.message(state.ctrxId),
    isRequesting: PaymentpageSelectors.isRequesting(state.paymentpage),
    firstName: PaymentpageSelectors.firstName(state.paymentpage),
    lastName: PaymentpageSelectors.lastName(state.paymentpage),
    cvv: PaymentpageSelectors.cvv(state.paymentpage),
    expireMonth: PaymentpageSelectors.expireMonth(state.paymentpage),
    expireYear: PaymentpageSelectors.expireYear(state.paymentpage),
    cardNumber: PaymentpageSelectors.cardNumber(state.paymentpage),
    shippingAddress: PaymentpageSelectors.shippingAddress(state.paymentpage),
    isShippingAddress: PaymentpageSelectors.isShippingAddress(state.paymentpage),
    isLuhnOk: PaymentpageSelectors.isLuhnOk(state.paymentpage),
    history: ownProps.history
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // ignite boilerplate dispatch list
    paymentpageRequestPatch: query => dispatch(PaymentpageActions.paymentpageRequestPatch(query)),
    paymentpageRequest: query => dispatch(PaymentpageActions.paymentpageRequest(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheComponent)
