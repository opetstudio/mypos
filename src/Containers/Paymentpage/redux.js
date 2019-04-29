import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge, cleaningObject} from '../../Utils/helper/datamining'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  paymentpageRequest: ['data'],
  paymentpageRequestPatch: ['data']
})

export const PaymentpageTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isRequesting: false,
  message: '',
  version: 0,
  ctrxId: window.CTRX_ID,
  strxId: window.STRX_ID,
  callbackUrl: window.CALLBACK_URL,
  lastName: window.LAST_NAME,
  firstName: window.FIRST_NAME,
  cardNumber: '',
  expireMonth: '',
  expireYear: '',
  cvv: '',
  paymentStatus: '',
  paymentStatusMessage: '',
  isShippingAddress: false,
  shippingAddress: window.SHIPPING_ADDRESS,
  par1: window.PAR1,
  par2: window.PAR2,
  par3: window.PAR3,
  par4: window.PAR4,
  par5: window.PAR5,
  par6: window.PAR6,
  par7: window.PAR7,
  par8: window.PAR8,
  par9: window.PAR9,
  par10: window.PAR10,
  par11: window.PAR11,
  par12: window.PAR12,
  isLuhnOk: false
})

/* ------------- Selectors ------------- */

export const PaymentpageSelectors = {
  isRequesting: st => st.isRequesting,
  paymentStatus: st => st.paymentStatus,
  paymentStatusMessage: st => st.paymentStatusMessage,
  message: st => st.message,
  callbackUrl: st => st.callbackUrl,
  ctrxId: st => st.ctrxId,
  strxId: st => st.strxId,
  lastName: st => st.lastName,
  firstName: st => st.firstName,
  cardNumber: st => st.cardNumber,
  expireMonth: st => st.expireMonth,
  expireYear: st => st.expireYear,
  cvv: st => st.cvv,
  isLuhnOk: st => st.isLuhnOk,
  isShippingAddress: st => st.isShippingAddress,
  par1: st => st.par1,
  par2: st => st.par2,
  par3: st => st.par3,
  par4: st => st.par4,
  par5: st => st.par5,
  par6: st => st.par6,
  par7: st => st.par7,
  par8: st => st.par8,
  par9: st => st.par9,
  par10: st => st.par10,
  par11: st => st.par11,
  par12: st => st.par12,
  shippingAddress: st => st.shippingAddress
}

/* ------------- Reducers ------------- */
export const paymentpageReq = (state, query) => {
  query.data.isRequesting = true
  return paymentpageRequest(state, query)
}
export const paymentpageRequest = (state, { data }) => {
  // console.log('paymentpageRequest==>', data)
  let mergeData = {}
  if (data.paymentStatus) mergeData.paymentStatus = data.paymentStatus
  if (data.paymentStatusMessage) mergeData.paymentStatusMessage = data.paymentStatusMessage
  if (data.ctrxId) mergeData.ctrxId = data.ctrxId
  if (data.strxId) mergeData.strxId = data.strxId
  if (data.message) mergeData.message = data.message
  if (data.callbackUrl) mergeData.callbackUrl = data.callbackUrl
  if (data.firstName) mergeData.firstName = data.firstName
  if (data.lastName) mergeData.lastName = data.lastName
  if (data.cardNumber) mergeData.cardNumber = data.cardNumber
  if (data.expireMonth) mergeData.expireMonth = data.expireMonth
  if (data.expireYear) mergeData.expireYear = data.expireYear
  if (data.isLuhnOk) mergeData.isLuhnOk = data.isLuhnOk
  if (data.cvv) mergeData.cvv = data.cvv
  if (data.shippingAddress) mergeData.shippingAddress = data.shippingAddress
  if (data.hasOwnProperty('isShippingAddress')) mergeData.isShippingAddress = data.isShippingAddress
  if (data.hasOwnProperty('isLuhnOk')) mergeData.isLuhnOk = data.isLuhnOk
  if (data.hasOwnProperty('isRequesting')) mergeData.isRequesting = data.isRequesting
  mergeData.version = state.version + 1
  return state.merge(mergeData)
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENTPAGE_REQUEST]: paymentpageReq,
  [Types.PAYMENTPAGE_REQUEST_PATCH]: paymentpageRequest
})
