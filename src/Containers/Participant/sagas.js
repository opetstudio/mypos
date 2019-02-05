import { call, put, select } from 'redux-saga/effects'
import ParticipantActions from './redux'
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
export const theData = state => state.participant.data
export const theMulti = state => state.participant.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getParticipant (api, action) {
  // console.log('[ParticipantSaga] getParticipant action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getParticipant, data, { session: s })
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
      ParticipantActions.participantRequestSuccess({
        requestMessage: 'success fetch data',
        byId,
        allIds
      })
    )
  } else {
    yield put(
      ParticipantActions.participantRequestFailed({
        requestMessage: 'failed fetch data'
      })
    )
  }
}
export function * postParticipant (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postParticipant, data, { session: s })
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
        ParticipantActions.participantCreateSuccess({
          formSubmitMessage: 'success post data',
          byId,
          allIds
        })
      )
    } else {
      yield put(
        ParticipantActions.participantCreateFailed({
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
      ParticipantActions.participantCreateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}

export function * updateParticipant (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateParticipant, data, id, { session: s })
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
    //   yield put(ParticipantActions.participantDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(ParticipantActions.participantUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      ParticipantActions.participantUpdateSuccess({
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
      ParticipantActions.participantUpdateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}
export function * updateParticipantBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateParticipantBatch, data, { session: s })
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
    //   yield put(ParticipantActions.participantDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(ParticipantActions.participantUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      ParticipantActions.participantUpdateSuccess({
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
      ParticipantActions.participantUpdateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}

export function * removeParticipant (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeParticipant, data, id, { session: s })
  // console.log('removeParticipant response=>', response)

  // success?
  if (response.ok) {
    yield put(ParticipantActions.participantRemoveSuccess({ id }))
  } else {
    yield put(
      ParticipantActions.participantRequestFailed({
        requestMessage: 'failed remove data'
      })
    )
  }
}

export function * getParticipants (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getParticipants, data, { session: s })
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
      'tb_participant'
    )
    yield put(
      ParticipantActions.participantRequestSuccess({
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
      ParticipantActions.participantDeleteSuccess({ listId: allDeletedIds })
    )
  } else {
    yield put(
      ParticipantActions.participantRequestFailed({
        requestMessage: 'failed fetch data'
      })
    )
  }
}
export function * participantFetchInspect (api, action) {
  const { data } = action
  const s = yield select(session)
  const response = yield call(api.participantFetchInspect, data, { session: s })
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  if (response.ok) {
    const { byId, allIds, maxModifiedon } = getEntityCollection(
      response.data,
      'tb_inspect'
    )
    yield put(
      ParticipantActions.participantFetchInspectDone({
        inspectById: byId,
        inspectAllIds: allIds,
        maxModifiedon
      })
    )
  }
}
