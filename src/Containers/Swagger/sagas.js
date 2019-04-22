import { call, put, select } from 'redux-saga/effects'
import DebitonlineActions from './redux'
import LoginActions from '../Login/redux'
import { getAttributes, getEntity, getEntityCollection, getEntityBatch } from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import _ from 'lodash'
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({...state.login.single, token: state.login.token, isLoggedIn: state.login.isLoggedIn})
export const sessionToken = state => state.debitonline.sessionToken
export const theData = state => state.product.data
export const theMulti = state => state.product.multi
export const scene = state => state.debitonline.scene
export const transformedData = response => getAttributes(response.data)

export function * debitonlineRequest (api, action) {
  console.log('sagasss====> debitonlineRequest')
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const st = yield select(sessionToken)
  yield put(DebitonlineActions.debitonlineRequestPatch({log: ['hit api req url ' + data.url], isRequesting: true}))
  yield put(DebitonlineActions.debitonlineRequestPatch({log: ['hit api req body ' + JSON.stringify(data.payload)]}))
  const response = yield call(api.debitonlineRequest, data.payload, {session: s, url: data.url, method: data.method, sessionToken: st})
  // JSON.stringify(response)
  // yield put(DebitonlineActions.debitonlineRequestPatch({log: ['hit api request url=> ' + JSON.stringify(response.config.url)]}))
  yield put(DebitonlineActions.debitonlineRequestPatch({log: ['hit api resp ' + JSON.stringify(response.data)]}))
  yield put(DebitonlineActions.debitonlineRequestPatch({log: ['hit api resp problem ' + JSON.stringify(response.problem)]}))
  console.log('response===>', response)
  let message = ''
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const {byId, allIds, status} = getEntity(response.data)
    // if (response.status === 201) {
    //   const byId = {[response.data._id]: response.data}
    //   const allIds = [response.data._id]
    //   yield put(DebitonlineActions.debitonlineRequestRemovecard({formSubmitMessage: 'success post data', byId, allIds}))
    // } else yield put(DebitonlineActions.debitonlineRequestRemovecardFailed({ formSubmitMessage: 'Failed create data' }))
    if (response.data.errorCode === '00') {
      message = '00'

      if (
        data.url === '/InitMDOApiV2/rest/validate'
        // data.url === '/CardVerifyGenerateOtpApi/rest/cardverifyRs' ||
        // data.url === '/MdoOtpVerificationApi/rest/validateOtpRs' ||
        // data.url === '/SetLimitTrxCustomerAPI/rest/setMaximumDailyTransactionCustomer'
      ) {
        let sessionToken = path(['sessionToken'], response.data)
        let latestActvLogId = path(['latestActvLogId'], response.data)
        let ecommRefNo = path(['ecommRefNo'], response.data)
        let mercRefNo = path(['mercRefNo'], response.data)
        let username = path(['username'], response.data)
        yield put(DebitonlineActions.debitonlineRequestPatch({sessionToken, latestActvLogId, ecommRefNo, mercRefNo, username}))
      }
      if (data.url === '/CardVerifyGenerateOtpApi/rest/cardverifyRs') {
        let cardVerifiedToken = path(['cardVerifiedToken'], response.data)
        let cardNo = path(['cardNo'], response.data)
        let cardExpiryDate = path(['cardExpiryDate'], response.data)
        yield put(DebitonlineActions.debitonlineRequestPatch({cardVerifiedToken, cardExpiryDate, cardNo}))
      }
      if (data.url === '/MdoOtpVerificationApi/rest/validateOtpRs') {
        let otpVerifiedToken = path(['otpVerifiedToken'], response.data)
        yield put(DebitonlineActions.debitonlineRequestPatch({otpVerifiedToken}))
      }
      if (data.url === '/MdoOtpVerificationApi/rest/validateOtpRs') {
        let otpVerifiedToken = path(['otpVerifiedToken'], response.data)
        let cardToken = path(['cardToken'], response.data)
        let cardTokenId = path(['cardTokenId'], response.data)
        yield put(DebitonlineActions.debitonlineRequestPatch({otpVerifiedToken, cardToken, cardTokenId}))
      }
    } else {
      message = response.data.errorCode
    }
  } else {
    // let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    // if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    // // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    // yield put(DebitonlineActions.debitonlineRequestRemovecardFailed({ formSubmitMessage: validationMessages }))
    message = response.problem
  }
  const sc = yield select(scene)

  if (data.nextScene && message === '00') {
    // if (data.nextScene === 'scenePaymentProcessPage' && message === '00') {
    //   yield put(DebitonlineActions.debitonlineRequestPatch({log: ['hit api payment']}))
    //   // MdoPaymentApi
    // }
    yield put(DebitonlineActions.debitonlineRequestPatch({message, isRequesting: false, scene: [...sc, data.nextScene]}))
  } else yield put(DebitonlineActions.debitonlineRequestPatch({message, isRequesting: false}))
  if (data.callback) yield call(data.callback, message)
}
