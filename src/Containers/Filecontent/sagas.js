import { call, put, select } from 'redux-saga/effects'
import FilecontentActions from './redux'
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
export const theData = state => state.filecontent.data
export const theMulti = state => state.filecontent.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getFilecontent (api, action) {
  console.log('[FilecontentSaga] getFilecontent action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getFilecontent, data, { session: s })
  console.log('responseeeeee', response)
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
      FilecontentActions.filecontentRequestSuccess({
        requestMessage: 'success fetch data',
        byId,
        allIds
      })
    )
  } else {
    yield put(
      FilecontentActions.filecontentRequestFailed({
        requestMessage: 'failed fetch data'
      })
    )
  }
}
export function * postFilecontent (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postFilecontent, data, { session: s })
  console.log('response==>', response)
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
        FilecontentActions.filecontentCreateSuccess({
          formSubmitMessage: 'success post data',
          byId,
          allIds
        })
      )
    } else {
      yield put(
        FilecontentActions.filecontentCreateFailed({
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
      FilecontentActions.filecontentCreateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}

export function * updateFilecontent (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateFilecontent, data, id, { session: s })
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
    //   yield put(FilecontentActions.filecontentDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(FilecontentActions.filecontentUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      FilecontentActions.filecontentUpdateSuccess({
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
      FilecontentActions.filecontentUpdateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}
export function * updateFilecontentBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateFilecontentBatch, data, { session: s })
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
    //   yield put(FilecontentActions.filecontentDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(FilecontentActions.filecontentUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      FilecontentActions.filecontentUpdateSuccess({
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
      FilecontentActions.filecontentUpdateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}

export function * removeFilecontent (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeFilecontent, data, id, { session: s })
  console.log('removeFilecontent response=>', response)

  // success?
  if (response.ok) {
    yield put(FilecontentActions.filecontentRemoveSuccess({ id }))
  } else {
    yield put(
      FilecontentActions.filecontentRequestFailed({
        requestMessage: 'failed remove data'
      })
    )
  }
}

export function * getFilecontents (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getFilecontents, data, { session: s })
  console.log('responseeeeee', response)
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
      'tb_filecontent'
    )
    yield put(
      FilecontentActions.filecontentRequestSuccess({
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
    yield put(
      FilecontentActions.filecontentDeleteSuccess({ listId: allDeletedIds })
    )
  } else {
    yield put(
      FilecontentActions.filecontentRequestFailed({
        requestMessage: 'failed fetch data'
      })
    )
  }
}
