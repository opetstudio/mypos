import { call, put, select } from 'redux-saga/effects'
import BadgeActions from './redux'
import LoginActions from '../Login/redux'
import {
  getAttributes,
  getEntity,
  getEntityCollection,
  getEntityBatch
} from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import _ from 'lodash'
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({
  ...state.login.single,
  token: state.login.token,
  isLoggedIn: state.login.isLoggedIn
})
export const theData = state => state.badge.data
export const theMulti = state => state.badge.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getBadge (api, action) {
  // console.log('[BadgeSaga] getBadge action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getBadge, data, { session: s })
  // console.log('responseeeeee', response)
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // const { contentDetail } = response.data
    const { byId, allIds } = getEntity(response.data)
    yield put(
      BadgeActions.badgeRequestSuccess({
        requestMessage: 'success fetch data',
        byId,
        allIds
      })
    )
  } else {
    yield put(
      BadgeActions.badgeRequestFailed({ requestMessage: 'failed fetch data' })
    )
  }
}
export function * postBadge (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postBadge, data, { session: s })
  // console.log('response==>', response)
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  // success?
  if (response.ok) {
    // const {byId, allIds, status} = getEntity(response.data)
    if (response.status === 201) {
      const byId = { [response.data._id]: response.data }
      const allIds = [response.data._id]
      yield put(
        BadgeActions.badgeCreateSuccess({
          formSubmitMessage: 'success post data',
          byId,
          allIds
        })
      )
    } else {
      yield put(
        BadgeActions.badgeCreateFailed({
          formSubmitMessage: 'Failed create data'
        })
      )
    }
  } else {
    let validationMessages = JSON.stringify(
      path(
        ['originalError', 'response', 'data', 'validation_messages'],
        response
      )
    )
    if (response.status === 500) {
      validationMessages = path(
        ['originalError', 'response', 'data', 'detail'],
        response
      )
    }
    // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    yield put(
      BadgeActions.badgeCreateFailed({ formSubmitMessage: validationMessages })
    )
  }
}

export function * updateBadge (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateBadge, data, id, { session: s })
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const { byId, allIds, status } = getEntity(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(BadgeActions.badgeDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(BadgeActions.badgeUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      BadgeActions.badgeUpdateSuccess({
        formSubmitMessage: 'success update data',
        byId,
        allIds
      })
    )
  } else {
    let validationMessages = JSON.stringify(
      path(
        ['originalError', 'response', 'data', 'validation_messages'],
        response
      )
    )
    if (response.status === 500) {
      validationMessages = path(
        ['originalError', 'response', 'data', 'detail'],
        response
      )
    }
    yield yield put(
      BadgeActions.badgeUpdateFailed({ formSubmitMessage: validationMessages })
    )
  }
}
export function * updateBadgeBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateBadgeBatch, data, { session: s })
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const { byId, allIds, status } = getEntityBatch(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(BadgeActions.badgeDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(BadgeActions.badgeUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      BadgeActions.badgeUpdateSuccess({
        formSubmitMessage: 'success update data',
        byId,
        allIds
      })
    )
  } else {
    let validationMessages = JSON.stringify(
      path(
        ['originalError', 'response', 'data', 'validation_messages'],
        response
      )
    )
    if (response.status === 500) {
      validationMessages = path(
        ['originalError', 'response', 'data', 'detail'],
        response
      )
    }
    yield yield put(
      BadgeActions.badgeUpdateFailed({ formSubmitMessage: validationMessages })
    )
  }
}

export function * removeBadge (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeBadge, data, id, { session: s })
  // console.log('removeBadge response=>', response)

  // success?
  if (response.ok) {
    yield put(BadgeActions.badgeRemoveSuccess({ id }))
  } else {
    yield put(
      BadgeActions.badgeRequestFailed({ requestMessage: 'failed remove data' })
    )
  }
}

export function * getBadges (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getBadges, data, { session: s })
  // console.log('responseeeeee', response)
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  // if (path(['originalError', 'response', 'status'], response) === 403 && path(['originalError', 'response', 'statusText'], response) === 'Forbidden') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { byId, allIds, maxModifiedon } = response.data
    const { byId, allIds, maxModifiedon } = getEntityCollection(
      response.data,
      'tb_badges'
    )
    yield put(
      BadgeActions.badgeRequestSuccess({
        requestMessage: 'success fetch data',
        byId,
        allIds,
        maxModifiedon
      })
    )
    const allDeletedIds = (
      _.filter(allIds.map(r => byId[r]), { status: 'delete' }) || []
    ).map(r => r._id)
    allDeletedIds.push(undefined)
    allDeletedIds.push('undefined')
    allDeletedIds.push(null)
    // allDeletedIds.push(null)
    yield put(BadgeActions.badgeDeleteSuccess({ listId: allDeletedIds }))
  } else {
    yield put(
      BadgeActions.badgeRequestFailed({ requestMessage: 'failed fetch data' })
    )
  }
}
