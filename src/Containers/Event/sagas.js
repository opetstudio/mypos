import { call, put, select } from 'redux-saga/effects'
import EventActions from './redux'
import LoginActions from '../Login/redux'
import { getAttributes, getEntity, getEntityCollection, getEntityBatch } from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import _ from 'lodash'
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({...state.login.single, token: state.login.token, isLoggedIn: state.login.isLoggedIn})
export const theData = state => state.event.data
export const theMulti = state => state.event.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getEvent (api, action) {
  console.log('[EventSaga] getEvent action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getEvent, data, {session: s})
  console.log('responseeeeee', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // const { contentDetail } = response.data
    const {byId, allIds} = getEntity(response.data)
    yield put(EventActions.eventRequestSuccess({requestMessage: 'success fetch data', byId, allIds}))
  } else {
    yield put(EventActions.eventRequestFailed({requestMessage: 'failed fetch data'}))
  }
}
export function * postEvent (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postEvent, data, {session: s})
  console.log('response==>', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const {byId, allIds, status} = getEntity(response.data)
    if (response.status === 201) {
      const byId = {[response.data._id]: response.data}
      const allIds = [response.data._id]
      yield put(EventActions.eventCreateSuccess({formSubmitMessage: 'success post data', byId, allIds}))
    } else yield put(EventActions.eventCreateFailed({ formSubmitMessage: 'Failed create data' }))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    yield put(EventActions.eventCreateFailed({ formSubmitMessage: validationMessages }))
  }
}

export function * updateEvent (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateEvent, data, id, {session: s})
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const {byId, allIds, status} = getEntity(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(EventActions.eventDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(EventActions.eventUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(EventActions.eventUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(EventActions.eventUpdateFailed({ formSubmitMessage: validationMessages }))
  }
}
export function * updateEventBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateEventBatch, data, {session: s})
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const {byId, allIds, status} = getEntityBatch(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(EventActions.eventDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(EventActions.eventUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(EventActions.eventUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(EventActions.eventUpdateFailed({ formSubmitMessage: validationMessages }))
  }
}

export function * removeEvent (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeEvent, data, id, {session: s})
  console.log('removeEvent response=>', response)

  // success?
  if (response.ok) {
    yield put(EventActions.eventRemoveSuccess({id}))
  } else {
    yield put(EventActions.eventRequestFailed({requestMessage: 'failed remove data'}))
  }
}

export function * getEvents (api, action) {
  console.log('getEvents======')
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getEvents, data, {session: s})
  console.log('responseeeeee', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // if (path(['originalError', 'response', 'status'], response) === 403 && path(['originalError', 'response', 'statusText'], response) === 'Forbidden') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { byId, allIds, maxModifiedon } = response.data
    const {byId, allIds, maxModifiedon, slug} = getEntityCollection(response.data, 'tb_event')
    let { page_count: pageCount, page_size: pageSize } = response.data
    yield put(EventActions.eventRequestSuccess({requestMessage: 'success fetch data', byId, allIds, maxModifiedon, pageCount, pageSize, slug}))
    const allDeletedIds = ((_.filter(allIds.map(r => byId[r]), { 'status': 'delete' })) || []).map(r => r._id)
    allDeletedIds.push(undefined)
    allDeletedIds.push('undefined')
    allDeletedIds.push(null)
    // allDeletedIds.push(null)
    yield put(EventActions.eventDeleteSuccess({listId: allDeletedIds}))
  } else {
    yield put(EventActions.eventRequestFailed({requestMessage: 'failed fetch data'}))
  }
}
