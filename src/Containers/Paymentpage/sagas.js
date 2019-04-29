import { call, put, select } from 'redux-saga/effects'
import PaymentpageActions from './redux'
import LoginActions from '../Login/redux'
import { getAttributes, getEntity, getEntityCollection, getEntityBatch } from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import _ from 'lodash'
import Cookies from 'universal-cookie'
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({...state.login.single, token: state.login.token, isLoggedIn: state.login.isLoggedIn})
export const sessionToken = state => state.debitonline.sessionToken
export const theData = state => state.product.data
export const theMulti = state => state.product.multi
export const scene = state => state.debitonline.scene
export const transformedData = response => getAttributes(response.data)

export function * paymentpageRequest (api, action) {
  console.log('sagasss====> paymentpaageRequest')
  const { data } = action
  // make the call to the api
  const response = yield call(api.paymentpageRequest, data.payload, {url: data.url, method: data.method})
  // JSON.stringify(response)
  // yield put(PaymentpageActions.paymentpageRequestPatch({log: ['hit api request url=> ' + JSON.stringify(response.config.url)]}))
  console.log('response===>', response)
  let message = ''
  // success?
  if (response.ok) {
    // const {byId, allIds, status} = getEntity(response.data)
    // if (response.status === 201) {
    //   const byId = {[response.data._id]: response.data}
    //   const allIds = [response.data._id]
    //   yield put(PaymentpageActions.debitonlineRequestRemovecard({formSubmitMessage: 'success post data', byId, allIds}))
    // } else yield put(PaymentpageActions.debitonlineRequestRemovecardFailed({ formSubmitMessage: 'Failed create data' }))

    message = '00'
    if (data.url === '/card-checking/luhn-validate') {
      // update luhn
      if (response.data.insertStatus === 'VALID') {
        yield put(PaymentpageActions.paymentpageRequestPatch({isRequesting: false, isLuhnOk: true}))
      } else {
        message = 'invalid card number'
        yield put(PaymentpageActions.paymentpageRequestPatch({isRequesting: false, isLuhnOk: false}))
      }
    }
    if (data.url === '/card-checking/pcs-payment-register') {
      // {"insertStatus":"00","redirectURL":"https://payment.plink.co.id/payment/landing/en/90f1c22d21e20cfe70579d032bbfb463057d8bf9"}
      if (response.data.insertStatus === '00' && response.data.redirectURL) {
        // redirect
        const cookies = new Cookies()
        cookies.set(data.payload.trxid, response.data.id, { path: '/' })
        // yield put(PaymentpageActions.paymentpageRequestPatch({ctrxId: data.payload.trxid, strxId: response.data.id}))
        window.open(response.data.redirectURL)
        // window.open(response.data.redirectURL, '_blank')
      } else {
        message = 'pcs payment register FAILED'
      }
    }
    if (data.url === '/card-checking/find-id-status') {
    //   "insertStatus": "00",
    // "message": "SUCCESS"
      yield put(PaymentpageActions.paymentpageRequestPatch({paymentStatus: response.data.insertStatus, paymentStatusMessage: response.data.message}))
    }
    // if (
    //   data.url === '/InitMDOApiV2/rest/validate'
    //   // data.url === '/CardVerifyGenerateOtpApi/rest/cardverifyRs' ||
    //   // data.url === '/MdoOtpVerificationApi/rest/validateOtpRs' ||
    //   // data.url === '/SetLimitTrxCustomerAPI/rest/setMaximumDailyTransactionCustomer'
    // ) {
    //   let sessionToken = path(['sessionToken'], response.data)
    //   let latestActvLogId = path(['latestActvLogId'], response.data)
    //   let ecommRefNo = path(['ecommRefNo'], response.data)
    //   let mercRefNo = path(['mercRefNo'], response.data)
    //   let username = path(['username'], response.data)
    //   yield put(PaymentpageActions.paymentpageRequestPatch({sessionToken, latestActvLogId, ecommRefNo, mercRefNo, username}))
    // }
    // if (data.url === '/CardVerifyGenerateOtpApi/rest/cardverifyRs') {
    //   let cardVerifiedToken = path(['cardVerifiedToken'], response.data)
    //   let cardNo = path(['cardNo'], response.data)
    //   let cardExpiryDate = path(['cardExpiryDate'], response.data)
    //   yield put(PaymentpageActions.paymentpageRequestPatch({cardVerifiedToken, cardExpiryDate, cardNo}))
    // }
    // if (data.url === '/MdoOtpVerificationApi/rest/validateOtpRs') {
    //   let otpVerifiedToken = path(['otpVerifiedToken'], response.data)
    //   yield put(PaymentpageActions.paymentpageRequestPatch({otpVerifiedToken}))
    // }
    // if (data.url === '/MdoOtpVerificationApi/rest/validateOtpRs') {
    //   let otpVerifiedToken = path(['otpVerifiedToken'], response.data)
    //   let cardToken = path(['cardToken'], response.data)
    //   let cardTokenId = path(['cardTokenId'], response.data)
    //   yield put(PaymentpageActions.paymentpageRequestPatch({otpVerifiedToken, cardToken, cardTokenId}))
    // }
  } else {
    // let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    // if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    // // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    // yield put(PaymentpageActions.debitonlineRequestRemovecardFailed({ formSubmitMessage: validationMessages }))
    message = response.problem
  }
  yield put(PaymentpageActions.paymentpageRequestPatch({message, isRequesting: false}))
  // const sc = yield select(scene)

  // if (data.nextScene && message === '00') {
  //   // if (data.nextScene === 'scenePaymentProcessPage' && message === '00') {
  //   //   yield put(PaymentpageActions.paymentpageRequestPatch({log: ['hit api payment']}))
  //   //   // MdoPaymentApi
  //   // }
  //   yield put(PaymentpageActions.paymentpageRequestPatch({message, isRequesting: false, scene: [...sc, data.nextScene]}))
  // } else yield put(PaymentpageActions.paymentpageRequestPatch({message, isRequesting: false}))
  // if (data.callback) yield call(data.callback, message)
}
