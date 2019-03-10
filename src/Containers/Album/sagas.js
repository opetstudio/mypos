import { call, put, select } from 'redux-saga/effects'
import AlbumActions from './redux'
import LoginActions from '../Login/redux'
import { getAttributes, getEntity, getEntityCollection, getEntityBatch } from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import _ from 'lodash'
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({...state.login.single, token: state.login.token, isLoggedIn: state.login.isLoggedIn})
export const theData = state => state.album.data
export const theMulti = state => state.album.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getAlbum (api, action) {
  console.log('[AlbumSaga] getAlbum action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getAlbum, data, {session: s})
  console.log('responseeeeee', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // const { contentDetail } = response.data
    const {byId, allIds} = getEntity(response.data)
    yield put(AlbumActions.albumRequestSuccess({requestMessage: 'success fetch data', byId, allIds}))
  } else {
    yield put(AlbumActions.albumRequestFailed({requestMessage: 'failed fetch data'}))
  }
}
export function * postAlbum (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postAlbum, data, {session: s})
  console.log('response==>', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const {byId, allIds, status} = getEntity(response.data)
    if (response.status === 201) {
      const byId = {[response.data._id]: response.data}
      const allIds = [response.data._id]
      yield put(AlbumActions.albumCreateSuccess({formSubmitMessage: 'success post data', byId, allIds}))
    } else yield put(AlbumActions.albumCreateFailed({ formSubmitMessage: 'Failed create data' }))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    yield put(AlbumActions.albumCreateFailed({ formSubmitMessage: validationMessages }))
  }
}

export function * updateAlbum (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateAlbum, data, id, {session: s})
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const {byId, allIds, status} = getEntity(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(AlbumActions.albumDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(AlbumActions.albumUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(AlbumActions.albumUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(AlbumActions.albumUpdateFailed({ formSubmitMessage: validationMessages }))
  }
}
export function * updateAlbumBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateAlbumBatch, data, {session: s})
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const {byId, allIds, status} = getEntityBatch(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(AlbumActions.albumDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(AlbumActions.albumUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(AlbumActions.albumUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(AlbumActions.albumUpdateFailed({ formSubmitMessage: validationMessages }))
  }
}

export function * removeAlbum (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeAlbum, data, id, {session: s})
  console.log('removeAlbum response=>', response)

  // success?
  if (response.ok) {
    yield put(AlbumActions.albumRemoveSuccess({id}))
  } else {
    yield put(AlbumActions.albumRequestFailed({requestMessage: 'failed remove data'}))
  }
}

export function * getAlbums (api, action) {
  // console.log('album.sagas.getAlbums ======>>>>>>')
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getAlbums, data, {session: s})
  // console.log('responseeeeee', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // if (path(['originalError', 'response', 'status'], response) === 403 && path(['originalError', 'response', 'statusText'], response) === 'Forbidden') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { byId, allIds, maxModifiedon } = response.data
    const {byId, allIds, maxModifiedon} = getEntityCollection(response.data, 'tb_album')
    let { page_count: pageCount, page_size: pageSize } = response.data
    yield put(AlbumActions.albumRequestSuccess({requestMessage: 'success fetch data', byId, allIds, maxModifiedon, pageCount, pageSize}))
    const allDeletedIds = ((_.filter(allIds.map(r => byId[r]), { 'status': 'delete' })) || []).map(r => r._id)
    allDeletedIds.push(undefined)
    allDeletedIds.push('undefined')
    allDeletedIds.push(null)
    // allDeletedIds.push(null)
    yield put(AlbumActions.albumDeleteSuccess({listId: allDeletedIds}))
  } else {
    yield put(AlbumActions.albumRequestFailed({requestMessage: 'failed fetch data'}))
  }
}
