import { call, put, select } from 'redux-saga/effects'
import Immutable from 'seamless-immutable'
import ClassesActions from './redux'
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
import ClassparticipantActions, {
  ClassparticipantSelectors
} from '../Classparticipant/redux'
import ParticipantActions, { ParticipantSelectors } from '../Participant/redux'

export const session = state => ({
  ...state.login.single,
  token: state.login.token,
  isLoggedIn: state.login.isLoggedIn
})
export const theData = state => state.classes.data
export const getClassFormValue = state => state.classes.form
export const getClassParticipantState = state => state.classparticipant
export const getParticipantState = state => state.participant
export const theMulti = state => state.classes.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getClasses (api, action) {
  // console.log('[ClassesSaga] getClasses action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getClasses, data, { session: s })
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
      ClassesActions.classesRequestSuccess({
        requestMessage: 'success fetch data',
        byId,
        allIds
      })
    )
  } else {
    yield put(
      ClassesActions.classesRequestFailed({
        requestMessage: 'failed fetch data'
      })
    )
  }
}
export function * doEvaluatedParticipant (api, action) {
  const { data } = action
  const s = yield select(session)
  const response = yield call(api.doEvaluatedParticipant, data, { session: s })
  console.log('response evaluated=', response)
  if (
    path(['originalError', 'response', 'status'], response) === 401 &&
    path(['originalError', 'response', 'statusText'], response) ===
      'Unauthorized'
  ) { return yield put(LoginActions.loginRemoveSuccess({})) }
  if (response.ok) {
    yield put(ClassesActions.classesEvaluatedParticipantDone(response.data))
    // let classId = path(['data', 'class_id'], response)
    // let participantId = path(['data', 'participant_id'], response)
    let status = path(['data', 'status'], response)
    let theData = path(['data', 'data'], response)
    if (status) {
      const { byId, allIds } = getAttributes(theData)
      console.log('evaluated theData=', theData)
      console.log('evaluated byId=', byId)
      console.log('evaluated allIds=', allIds)
      yield put(
        ClassparticipantActions.classparticipantRequestSuccess({
          requestMessage: '',
          byId,
          allIds
        })
      )

      const participantState = yield select(getParticipantState)
      const allDataInspectArr = ParticipantSelectors.getAllDataInspectArr(
        participantState
      )
      const allDataInspectArrImmutable = Immutable.asMutable(
        allDataInspectArr,
        { deep: true }
      )
      console.log('allDataInspectArrImmutable', allDataInspectArrImmutable)
      let inspectDetailArr = _.filter(allDataInspectArrImmutable, {
        participant_id: theData.participant_id,
        class_id: theData.class_id
      }) || [{}]
      let inspectDetail = inspectDetailArr[0]
      if (inspectDetail) {
        console.log('inspectDetail', inspectDetail)
        inspectDetail.is_evaluated = '1'
        const inspectById = {}
        inspectById[inspectDetail._id] = inspectDetail
        yield put(
          ParticipantActions.participantEvaluatedInspect({
            inspectById: inspectById
          })
        )
      }
    }
  }
  yield put(ClassesActions.classesEvaluatedParticipantDone(response.data))
}
export function * doDeleteParticipant (api, action) {
  // console.log('[ClassesSaga] getClasses action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.doDeleteParticipant, data, { session: s })
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
    // const {byId, allIds} = getEntity(response.data)
    // yield put(ClassesActions.classesRequestSuccess({requestMessage: 'success fetch data', byId, allIds}))
    let classId = path(['data', 'class_id'], response)
    let participantId = path(['data', 'participant_id'], response)
    let status = path(['data', 'status'], response)
    // let participantId = path(['data', 'participant_id'], response)
    // let status = path(['data', 'status'], response)
    // const classParticipantList = yield select((state) => )
    // ClassparticipantSelectors.getAllParticipantIdByClassId(state.classparticipant, classId)
    // yield put(ClassparticipantActions.)
    // const classParticipantId = yield select(getClassParticipantState)
    // const classParticipantId = yield select(classParticipantState)
    // getAllDataArr
    if (status) {
      const clsPartSt = yield select(getClassParticipantState)
      const classFormValue = yield select(getClassFormValue)
      // console.log('clsPartSt==>', clsPartSt)
      const allClassParticipant = ClassparticipantSelectors.getAllDataArr(
        clsPartSt
      )
      const allClassParticipantMutable = Immutable.asMutable(
        allClassParticipant,
        { deep: true }
      )

      // console.log('allClassParticipant==>', allClassParticipantMutable)
      // console.log('classId==>', classId)
      // console.log('participantId==>', participantId)
      const classParticipantId = ((
        _.filter(allClassParticipantMutable, {
          class_id: classId,
          participant_id: participantId
        }) || []
      ).map(o => o._id) || [0])[0]
      // console.log('classParticipantId==>', classParticipantId)
      yield put(
        ClassparticipantActions.classparticipantRemoveSuccess({
          id: classParticipantId
        })
      )
      const currentClassParticipants = Immutable.asMutable(
        classFormValue['class_participants'] || [],
        { deep: true }
      )
      console.log('classFormValue==>', classFormValue)
      console.log('currentClassParticipants==>', currentClassParticipants)
      currentClassParticipants.splice(
        currentClassParticipants.indexOf(participantId),
        1
      )
      yield put(
        ClassesActions.classesSetFormValue({
          class_participants: currentClassParticipants
        })
      )
    }
    yield put(ClassesActions.classesDeleteParticipantDone(response.data))
  } else {
    // yield put(ClassesActions.classesRequestFailed({requestMessage: 'failed fetch data'}))
    yield put(ClassesActions.classesDeleteParticipantDone(response.data))
  }
}
export function * postClasses (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postClasses, data, { session: s })
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
        ClassesActions.classesCreateSuccess({
          formSubmitMessage: 'success post data',
          byId,
          allIds
        })
      )
    } else {
      yield put(
        ClassesActions.classesCreateFailed({
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
      ClassesActions.classesCreateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}

export function * updateClasses (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateClasses, data, id, { session: s })
  console.log('response==>', response)
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
    //   yield put(ClassesActions.classesDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(ClassesActions.classesUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      ClassesActions.classesUpdateSuccess({
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
    } else validationMessages = path(['data', 'detail'], response)
    yield yield put(
      ClassesActions.classesUpdateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}
export function * updateClassesBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateClassesBatch, data, { session: s })
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
    //   yield put(ClassesActions.classesDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(ClassesActions.classesUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(
      ClassesActions.classesUpdateSuccess({
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
      ClassesActions.classesUpdateFailed({
        formSubmitMessage: validationMessages
      })
    )
  }
}

export function * removeClasses (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeClasses, data, id, { session: s })
  // console.log('removeClasses response=>', response)

  // success?
  if (response.ok) {
    yield put(ClassesActions.classesRemoveSuccess({ id }))
  } else {
    yield put(
      ClassesActions.classesRequestFailed({
        requestMessage: 'failed remove data'
      })
    )
  }
}

export function * getClassess (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getClassess, data, { session: s })
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
      'tb_classes'
    )
    yield put(
      ClassesActions.classesRequestSuccess({
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
    yield put(ClassesActions.classesDeleteSuccess({ listId: allDeletedIds }))
  } else {
    yield put(
      ClassesActions.classesRequestFailed({
        requestMessage: 'failed fetch data'
      })
    )
  }
}
