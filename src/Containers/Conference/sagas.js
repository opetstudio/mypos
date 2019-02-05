import { call, put, select } from 'redux-saga/effects'
import ConferenceActions from './redux'
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
export const theData = state => state.conference.data
export const theMulti = state => state.conference.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getConference (api, action) {
  // console.log('[ConferenceSaga] getConference action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getConference, data, { session: s })
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
      ConferenceActions.conferenceRequestSuccess({
        requestMessage: 'success fetch data',
        byId,
        allIds
      })
    )
  } else {
    yield put(
      ConferenceActions.conferenceRequestFailed({
        requestMessage: 'failed fetch data'
      })
    )
  }
}
export function * postConference (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postConference, data, { session: s })
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
        ConferenceActions.conferenceCreateSuccess({
          formSubmitMessage: 'success post data',
          byId,
          allIds
        })
      )
    } else {
      yield put(
        ConferenceActions.conferenceCreateFailed({
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
      ConferenceActions.conferenceCreateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}

export function * updateConference (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateConference, data, id, { session: s })
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
    //   yield put(ConferenceActions.conferenceDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(ConferenceActions.conferenceUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      ConferenceActions.conferenceUpdateSuccess({
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
      ConferenceActions.conferenceUpdateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}
export function * updateConferenceBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateConferenceBatch, data, { session: s })
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
    //   yield put(ConferenceActions.conferenceDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(ConferenceActions.conferenceUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      ConferenceActions.conferenceUpdateSuccess({
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
      ConferenceActions.conferenceUpdateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}

export function * removeConference (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeConference, data, id, { session: s })
  // console.log('removeConference response=>', response)

  // success?
  if (response.ok) {
    yield put(ConferenceActions.conferenceRemoveSuccess({ id }))
  } else {
    yield put(
      ConferenceActions.conferenceRequestFailed({
        requestMessage: 'failed remove data'
      })
    )
  }
}

export function * getConferences (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getConferences, data, { session: s })
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
      'tb_conference'
    )
    yield put(
      ConferenceActions.conferenceRequestSuccess({
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
      ConferenceActions.conferenceDeleteSuccess({ listId: allDeletedIds })
    )
  } else {
    yield put(
      ConferenceActions.conferenceRequestFailed({
        requestMessage: 'failed fetch data'
      })
    )
  }
}
