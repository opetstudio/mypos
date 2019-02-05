import { call, put, select } from 'redux-saga/effects'
import FileActions from './redux'
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
export const theData = state => state.file.data
export const theMulti = state => state.file.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getFile (api, action) {
  console.log('[FileSaga] getFile action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getFile, data, { session: s })
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
      FileActions.fileRequestSuccess({
        requestMessage: 'success fetch data',
        byId,
        allIds
      })
    )
  } else {
    yield put(
      FileActions.fileRequestFailed({ requestMessage: 'failed fetch data' })
    )
  }
}
export function * postFile (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postFile, data, { session: s })
  // console.log('response==>', response)
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  // success?
  if (response.ok) {
    // const {byId, allIds, status} = getEntity(response.data)
    if (response.status === 201 && response.data._id !== undefined) {
      const byId = { [response.data._id]: response.data }
      const allIds = [response.data._id]
      yield put(
        FileActions.fileCreateSuccess({
          formSubmitMessage: 'success post data',
          byId,
          allIds
        })
      )
    } else {
      yield put(
        FileActions.fileCreateFailed({
          formSubmitMessage: 'Failed create data'
        })
      )
    }
  } else {
    // let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    // if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    let validationMessages = path(
      ['originalError', 'response', 'data', 'detail'],
      response
    )
    // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    yield put(
      FileActions.fileCreateFailed({ formSubmitMessage: validationMessages })
    )
  }
}

export function * updateFile (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateFile, data, id, { session: s })
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  console.log('responseeeeeeexx===>>', response)
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const { byId, allIds, status } = getEntity(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(FileActions.fileDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(FileActions.fileUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      FileActions.fileUpdateSuccess({
        formSubmitMessage: 'success update data',
        byId,
        allIds
      })
    )
  } else {
    // let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    let validationMessages = path(
      ['originalError', 'response', 'data', 'detail'],
      response
    )
    // if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(
      FileActions.fileUpdateFailed({ formSubmitMessage: validationMessages })
    )
  }
}
export function * updateFileBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateFileBatch, data, { session: s })
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
    //   yield put(FileActions.fileDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(FileActions.fileUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      FileActions.fileUpdateSuccess({
        formSubmitMessage: 'success update data',
        byId,
        allIds
      })
    )
  } else {
    // let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    let validationMessages = path(
      ['originalError', 'response', 'data', 'detail'],
      response
    )
    // if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(
      FileActions.fileUpdateFailed({ formSubmitMessage: validationMessages })
    )
  }
}

export function * removeFile (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeFile, data, id, { session: s })
  console.log('removeFile response=>', response)

  // success?
  if (response.ok) {
    yield put(FileActions.fileRemoveSuccess({ id }))
  } else {
    yield put(
      FileActions.fileRequestFailed({ requestMessage: 'failed remove data' })
    )
  }
}

export function * getFiles (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getFiles, data, { session: s })
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
      'tb_files'
    )
    yield put(
      FileActions.fileRequestSuccess({
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
    yield put(FileActions.fileDeleteSuccess({ listId: allDeletedIds }))
  } else {
    yield put(
      FileActions.fileRequestFailed({ requestMessage: 'failed fetch data' })
    )
  }
}
