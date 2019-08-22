import { call, put, select } from 'redux-saga/effects'
import Immutable from 'seamless-immutable'
import UserActions from '../User/redux'
import UserroleActions, {UserroleSelectors} from './redux'
import LoginActions from '../Login/redux'
import { getAttributes, getEntity, getEntityCollection, getEntityBatch } from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import _ from 'lodash'
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({...state.login.single, token: state.login.token, isLoggedIn: state.login.isLoggedIn})
export const theData = state => state.userrole.data
export const theMulti = state => state.userrole.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)
export const getUserRoleState = state => state.userrole
export const getUserFormValue = state => state.user.form

export function * getUserrole (api, action) {
  console.log('[UserroleSaga] getUserrole action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getUserrole, data, {session: s})
  console.log('responseeeeee', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // const { contentDetail } = response.data
    const {byId, allIds} = getEntity(response.data)
    yield put(UserroleActions.userroleRequestSuccess({requestMessage: 'success fetch data', byId, allIds}))
  } else {
    yield put(UserroleActions.userroleRequestFailed({requestMessage: 'failed fetch data'}))
  }
}
export function * postUserrole (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postUserrole, data, {session: s})
  console.log('response==>', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const {byId, allIds, status} = getEntity(response.data)
    if (response.status === 201) {
      const byId = {[response.data._id]: response.data}
      const allIds = [response.data._id]
      yield put(UserroleActions.userroleCreateSuccess({formSubmitMessage: 'success post data', byId, allIds}))
    } else yield put(UserroleActions.userroleCreateFailed({ formSubmitMessage: 'Failed create data' }))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    yield put(UserroleActions.userroleCreateFailed({ formSubmitMessage: validationMessages }))
  }
}

export function * updateUserrole (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateUserrole, data, id, {session: s})
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const {byId, allIds, status} = getEntity(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(UserroleActions.userroleDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(UserroleActions.userroleUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(UserroleActions.userroleUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(UserroleActions.userroleUpdateFailed({ formSubmitMessage: validationMessages }))
  }
}
export function * updateUserroleBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateUserroleBatch, data, {session: s})
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const {byId, allIds, status} = getEntityBatch(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(UserroleActions.userroleDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(UserroleActions.userroleUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(UserroleActions.userroleUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(UserroleActions.userroleUpdateFailed({ formSubmitMessage: validationMessages }))
  }
}

export function * removeUserrole (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeUserrole, data, id, {session: s})
  console.log('removeUserrole response=>', response)

  // success?
  if (response.ok) {
    yield put(UserroleActions.userroleRemoveSuccess({id}))
  } else {
    yield put(UserroleActions.userroleRequestFailed({requestMessage: 'failed remove data'}))
  }
}

export function * getUserroles (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getUserroles, data, {session: s})
  console.log('responseeeeee', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // if (path(['originalError', 'response', 'status'], response) === 403 && path(['originalError', 'response', 'statusText'], response) === 'Forbidden') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { byId, allIds, maxModifiedon } = response.data
    const {byId, allIds, maxModifiedon} = getEntityCollection(response.data, 'tb_userrole')
    yield put(UserroleActions.userroleRequestSuccess({requestMessage: 'success fetch data', byId, allIds, maxModifiedon}))
    const allDeletedIds = ((_.filter(allIds.map(r => byId[r]), { 'status': 'delete' })) || []).map(r => r._id)
    allDeletedIds.push(undefined)
    allDeletedIds.push('undefined')
    allDeletedIds.push(null)
    // allDeletedIds.push(null)
    yield put(UserroleActions.userroleDeleteSuccess({listId: allDeletedIds}))
  } else {
    yield put(UserroleActions.userroleRequestFailed({requestMessage: 'failed fetch data'}))
  }
}
export function * doDeleteRole (api, action) {
  const { data } = action
  console.log('doDeleteRole=====>', data)
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.doDeleteUserRole, data, { session: s })
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') {
    return yield put(LoginActions.loginRemoveSuccess({}))
  }
  if (response.ok) {
    let userId = path(['data', 'user_id'], response)
    let roleId = path(['data', 'role_id'], response)
    let status = path(['data', 'status'], response)
    if (status) {
      const userRoleState = yield select(getUserRoleState)
      const userFormValue = yield select(getUserFormValue)
      const allUserRole = UserroleSelectors.getAllDataArr(userRoleState)
      const allUserRoleMutable = Immutable.asMutable(allUserRole, { deep: true })
      const userroleId = ((_.filter(allUserRoleMutable, {user_id: userId, role_id: roleId}) || []).map(o => o._id) || [0])[0]
      yield put(UserroleActions.userroleRemoveSuccess({id: userroleId}))
      const currentUserRole = Immutable.asMutable(userFormValue['user_roles'] || [], { deep: true })
      currentUserRole.splice(currentUserRole.indexOf(roleId), 1)
      yield put(
        UserActions.userSetFormValue({
          user_roles: currentUserRole
        })
      )
    }
    yield put(UserroleActions.userroleDeleteRoleDone(response.data))
  } else {
    yield put(UserroleActions.userroleDeleteRoleDone(response.data))
  }
}
