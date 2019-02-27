import { call, put, select } from 'redux-saga/effects'
import Immutable from 'seamless-immutable'
import UserActions from './redux'
import LoginActions from '../Login/redux'
import UserroleActions, { UserroleSelectors } from '../Userrole/redux'
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
export const theData = state => state.user.data
export const theMulti = state => state.user.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)
export const getUserRoleState = state => state.userrole
export const getUserFormValue = state => state.user.form

export function * getUser (api, action) {
  // console.log('[UserSaga] getUser action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getUser, data, { session: s })
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
      UserActions.userRequestSuccess({
        requestMessage: 'success fetch data',
        byId,
        allIds
      })
    )
  } else {
    yield put(
      UserActions.userRequestFailed({ requestMessage: 'failed fetch data' })
    )
  }
}
export function * getUserProfile (api, action) {
  // console.log('[UserSaga] getUserProfile action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getUserProfile, data, { session: s })
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
    const { byId, allIds, detail } = getEntity(response.data)
    yield put(
      UserActions.userRequestProfileSuccess({
        requestMessage: 'success fetch data',
        detail
      })
    )
  } else {
    yield put(
      UserActions.userRequestFailed({ requestMessage: 'failed fetch data' })
    )
  }
}
export function * postUser (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postUser, data, { session: s })
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
        UserActions.userCreateSuccess({
          formSubmitMessage: 'success post data',
          byId,
          allIds
        })
      )
    } else {
      yield put(
        UserActions.userCreateFailed({
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
      UserActions.userCreateFailed({ formSubmitMessage: validationMessages })
    )
  }
}

export function * updateUser (api, action) {
  console.log('do updateUser====>>>>>>action=', action)
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateUser, data, id, { session: s })
  console.log('updateUser response=', response)
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const entity = getEntity(response.data)
    console.log('updateUser entity=', entity)
    const { byId, allIds, status } = entity
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(UserActions.userDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(UserActions.userUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      UserActions.userUpdateSuccess({
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
    if (response.status === 403) {
      validationMessages = path(
        ['originalError', 'response', 'statusText'],
        response
      )
    }
    yield yield put(
      UserActions.userUpdateFailed({ formSubmitMessage: validationMessages })
    )
  }
}
export function * updateUserBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateUserBatch, data, { session: s })
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
    //   yield put(UserActions.userDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(UserActions.userUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      UserActions.userUpdateSuccess({
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
    if (response.status === 403) {
      validationMessages = path(
        ['originalError', 'response', 'statusText'],
        response
      )
    }
    yield yield put(
      UserActions.userUpdateFailed({ formSubmitMessage: validationMessages })
    )
  }
}

export function * removeUser (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeUser, data, id, { session: s })
  // console.log('removeUser response=>', response)

  // success?
  if (response.ok) {
    yield put(UserActions.userRemoveSuccess({ id }))
  } else {
    yield put(
      UserActions.userRequestFailed({ requestMessage: 'failed remove data' })
    )
  }
}

export function * getUsers (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getUsers, data, { session: s })
  console.log('getUsers responseeeeee===>', response)
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  // if (path(['originalError', 'response', 'status'], response) === 403 && path(['originalError', 'response', 'statusText'], response) === 'Forbidden') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { byId, allIds, maxModifiedon } = response.data
    const entitys = getEntityCollection(
      response.data,
      'tb_users'
    )
    let { page_count: pageCount, page_size: pageSize } = response.data
    console.log('getUsers entitys=', entitys)
    const { byId, allIds, maxModifiedon } = entitys
    yield put(
      UserActions.userRequestSuccess({
        requestMessage: 'success fetch data',
        byId,
        allIds,
        maxModifiedon,
        pageCount,
        pageSize
      })
    )
    const allDeletedIds = (
      _.filter(allIds.map(r => byId[r]), { status: 'delete' }) || []
    ).map(r => r._id)
    allDeletedIds.push(undefined)
    allDeletedIds.push('undefined')
    allDeletedIds.push(null)
    // allDeletedIds.push(null)
    yield put(UserActions.userDeleteSuccess({ listId: allDeletedIds }))
  } else {
    yield put(
      UserActions.userRequestFailed({ requestMessage: 'failed fetch data' })
    )
  }
}
