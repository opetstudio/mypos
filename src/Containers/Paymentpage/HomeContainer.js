import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import HomeLayout from '../../Components/Paymentpage/HomeComponent'
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
  <HomeLayout
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
    callbackUrl: PaymentpageSelectors.callbackUrl(state.paymentpage),
    par1: PaymentpageSelectors.par1(state.paymentpage),
    par2: PaymentpageSelectors.par2(state.paymentpage),
    par3: PaymentpageSelectors.par3(state.paymentpage),
    par4: PaymentpageSelectors.par4(state.paymentpage),
    par5: PaymentpageSelectors.par5(state.paymentpage),
    par6: PaymentpageSelectors.par6(state.paymentpage),
    par7: PaymentpageSelectors.par7(state.paymentpage),
    par8: PaymentpageSelectors.par8(state.paymentpage),
    par9: PaymentpageSelectors.par9(state.paymentpage),
    par10: PaymentpageSelectors.par10(state.paymentpage),
    par11: PaymentpageSelectors.par11(state.paymentpage),
    par12: PaymentpageSelectors.par12(state.paymentpage),
    message: PaymentpageSelectors.message(state.paymentpage),
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
