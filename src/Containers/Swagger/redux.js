import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge, cleaningObject} from '../../Utils/helper/datamining'
import _ from 'lodash'

const initMdoData = require('../../Data/InitMdoApi.json')
const removeCardData = require('../../Data/removeCardData.json')
const cardVerifyGenerateOtpData = require('../../Data/CardVerifyGenerateOtpData.json')
const ValidateOtpData = require('../../Data/ValidateOtpData.json')
const customerSetTrxLimitData = require('../../Data/customerSetTrxLimitData.json')
const mdoPaymentData = require('../../Data/mdoPaymentData.json')

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  debitonlineRequest: ['data'],
  debitonlineRequestPatch: ['data']
})

export const DebitonlineTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isRequesting: false,
  message: '',
  sessionToken: '',
  cardVerifiedToken: '',
  otpVerifiedToken: '',
  latestActvLogId: '',
  ecommRefNo: '',
  cardTokenId: '',
  cardToken: '',
  mercRefNo: '',
  username: '',
  cardNo: '',
  cardExpiryDate: '',
  log: [],
  scene: ['sceneMerchantPage'],
  version: 0,
  initMdoData: JSON.stringify(initMdoData, undefined, 4),
  mdoPaymentData: JSON.stringify(mdoPaymentData, undefined, 4),
  cardVerifyGenerateOtpData: JSON.stringify(cardVerifyGenerateOtpData, undefined, 4),
  validateOtpData: JSON.stringify(ValidateOtpData, undefined, 4),
  customerSetTrxLimitData: JSON.stringify(customerSetTrxLimitData, undefined, 4),
  removeCardData: JSON.stringify(removeCardData, undefined, 4)
})

/* ------------- Selectors ------------- */

export const DebitonlineSelectors = {
  isRequesting: st => st.isRequesting,
  message: st => st.message,
  initMdoData: st => st.initMdoData,
  cardTokenId: st => st.cardTokenId,
  cardToken: st => st.cardToken,
  username: st => st.username,
  cardNo: st => st.cardNo,
  cardExpiryDate: st => st.cardExpiryDate,
  mdoPaymentData: st => st.mdoPaymentData,
  cardVerifyGenerateOtpData: st => st.cardVerifyGenerateOtpData,
  removeCardData: st => st.removeCardData,
  validateOtpData: st => st.validateOtpData,
  customerSetTrxLimitData: st => st.customerSetTrxLimitData,
  log: st => st.log,
  sessionToken: st => st.sessionToken,
  cardVerifiedToken: st => st.cardVerifiedToken,
  otpVerifiedToken: st => st.otpVerifiedToken,
  latestActvLogId: st => st.latestActvLogId,
  ecommRefNo: st => st.ecommRefNo,
  mercRefNo: st => st.mercRefNo,
  scene: st => st.scene
}

/* ------------- Reducers ------------- */

export const debitonlineRequest = (state, { data }) => {
  console.log('debitonlineRequest==>', data)
  let mergeData = {}
  let cardVerifyGenerateOtpDataJson = JSON.parse(state.cardVerifyGenerateOtpData)
  let validateOtpDataJson = JSON.parse(state.validateOtpData)
  let mdoPaymentData = JSON.parse(state.mdoPaymentData)
  let customerSetTrxLimitData = JSON.parse(state.customerSetTrxLimitData)
  let removeCardData = JSON.parse(state.removeCardData)
  // let customerSetTrxLimitData = JSON.parse(state.customerSetTrxLimitData)
  if (data.isRequesting) mergeData.isRequesting = data.isRequesting
  if (data.message) mergeData.message = data.message
  if (data.initMdoData) mergeData.initMdoData = data.initMdoData
  if (data.cardVerifyGenerateOtpData) mergeData.cardVerifyGenerateOtpData = data.cardVerifyGenerateOtpData
  if (data.validateOtpData) mergeData.validateOtpData = data.validateOtpData
  if (data.customerSetTrxLimitData) mergeData.customerSetTrxLimitData = data.customerSetTrxLimitData
  if (data.removeCardData) mergeData.removeCardData = data.removeCardData
  if (data.sessionToken) {
    mergeData.sessionToken = data.sessionToken
    cardVerifyGenerateOtpDataJson.sessionToken = data.sessionToken
    validateOtpDataJson.sessionToken = data.sessionToken
    mdoPaymentData.sessionToken = data.sessionToken
    // customerSetTrxLimitData.sessionToken = data.sessionToken
  }
  if (data.latestActvLogId) {
    mergeData.latestActvLogId = data.latestActvLogId
    cardVerifyGenerateOtpDataJson.latestActvLogId = data.latestActvLogId
    validateOtpDataJson.latestActvLogId = data.latestActvLogId
    mdoPaymentData.latestActvLogId = data.latestActvLogId
    // customerSetTrxLimitData.latestActvLogId = data.latestActvLogId
  }
  if (data.username) {
    mergeData.username = data.username
    cardVerifyGenerateOtpDataJson.username = data.username
    validateOtpDataJson.username = data.username
    mdoPaymentData.username = data.username
    customerSetTrxLimitData.username = data.username
    removeCardData.username = data.username
    // customerSetTrxLimitData.ecommRefNo = data.ecommRefNo
  }
  if (data.ecommRefNo) {
    mergeData.ecommRefNo = data.ecommRefNo
    cardVerifyGenerateOtpDataJson.ecommRefNo = data.ecommRefNo
    validateOtpDataJson.ecommRefNo = data.ecommRefNo
    mdoPaymentData.ecommRefNo = data.ecommRefNo
    // customerSetTrxLimitData.ecommRefNo = data.ecommRefNo
  }
  if (data.mercRefNo) {
    mergeData.mercRefNo = data.mercRefNo
    cardVerifyGenerateOtpDataJson.mercRefNo = data.mercRefNo
    validateOtpDataJson.mercRefNo = data.mercRefNo
    mdoPaymentData.mercRefNo = data.mercRefNo
    // customerSetTrxLimitData.mercRefNo = data.mercRefNo
  }
  if (data.cardVerifiedToken) {
    mergeData.cardVerifiedToken = data.cardVerifiedToken
    validateOtpDataJson.cardVerifiedToken = data.cardVerifiedToken
    mdoPaymentData.cardVerifiedToken = data.cardVerifiedToken
    // customerSetTrxLimitData.mercRefNo = data.mercRefNo
  }
  if (data.cardNo) {
    mergeData.cardNo = data.cardNo
    validateOtpDataJson.cardNo = data.cardNo
  }
  if (data.cardExpiryDate) {
    mergeData.cardExpiryDate = data.cardExpiryDate
    validateOtpDataJson.cardExpiryDate = data.cardExpiryDate
  }
  if (data.otpVerifiedToken) {
    mergeData.otpVerifiedToken = data.otpVerifiedToken
    mdoPaymentData.otpVerifiedToken = data.otpVerifiedToken
  }
  if (data.cardToken) {
    mergeData.cardToken = data.cardToken
    mdoPaymentData.cardToken = data.cardToken
  }
  if (data.cardTokenId) {
    mergeData.cardTokenId = data.cardTokenId
    mdoPaymentData.cardTokenId = data.cardTokenId
  }

  if (
    data.latestActvLogId ||
    data.sessionToken ||
    data.ecommRefNo ||
    data.cardVerifiedToken ||
    data.cardToken ||
    data.cardTokenId ||
    data.cardExpiryDate ||
    data.cardNo ||
    data.username ||
    data.otpVerifiedToken
  ) {
    mergeData.cardVerifyGenerateOtpData = JSON.stringify(cardVerifyGenerateOtpDataJson, undefined, 4)
    mergeData.validateOtpData = JSON.stringify(validateOtpDataJson, undefined, 4)
    mergeData.mdoPaymentData = JSON.stringify(mdoPaymentData, undefined, 4)
    mergeData.customerSetTrxLimitData = JSON.stringify(customerSetTrxLimitData, undefined, 4)
    mergeData.removeCardData = JSON.stringify(removeCardData, undefined, 4)
  }
  if (data.log) {
    mergeData.log = [...state.log, ...data.log]
  }
  if (data.scene) {
    mergeData.scene = data.scene
  }
  mergeData.version = state.version + 1
  return state.merge(mergeData)
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEBITONLINE_REQUEST]: debitonlineRequest,
  [Types.DEBITONLINE_REQUEST_PATCH]: debitonlineRequest
})
