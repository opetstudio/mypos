import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { arrayMerge } from '../../Utils/helper/datamining'
import _ from 'lodash'
import { path } from 'ramda'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // C
  classesCreate: ['data'],
  classesCreateFailed: ['data'],
  classesCreateSuccess: ['data'],

  // R
  classesRequest: ['data'],
  classesRequestAll: ['data'],
  classesRequestFailed: ['data'],
  classesRequestSuccess: ['data'],

  classesRemove: ['data', 'id'],
  classesUpdate: ['data', 'id'],
  classesUpdateBatch: ['data'],
  classesUpdateFailed: ['data'],
  classesUpdateSuccess: ['data'],

  classesRemoveFailed: ['data'],
  classesRemoveSuccess: ['data'],

  classesSetFormValue: ['data'],

  classesDeleteParticipant: ['data'],
  classesDeleteParticipantDone: ['data'],

  classesEvaluatedParticipant: ['data'],
  classesEvaluatedParticipantDone: ['data'],

  classesFormReset: ['data'],
  classesDeleteSuccess: ['data'],
  classesReset: []
})

export const ClassesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: {},
  fetching: null,
  payload: null,
  single: {},
  multi: null,
  error: null,
  allIds: [],
  byId: {},
  maxModifiedon: 0,
  isError: false,
  message: '',
  isCreateSucces: false,

  request: false,
  requestSuccess: false,
  requestFailed: false,
  requestMessage: '',

  form: {},
  formSubmit: null,
  formSubmitSuccess: false,
  formSubmitFailed: false,
  formSubmitMessage: '',
  newRecordId: '',

  update: false,
  updateSuccess: false,
  updateFailed: false,
  updateMessage: '',

  deleteParticipantOnprogress: false,

  evaluatedParticipantOnprogress: false
})

/* ------------- Selectors ------------- */

export const ClassesSelectors = {
  getData: state => state.data,
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getMaxModifiedon: state => state.maxModifiedon,
  getById: state => state.byId,
  getIsError: state => state.isError,
  getMessage: state => state.message,
  getIsCreateSucces: state => state.isCreateSucces,
  getSingle: state => state.single,
  getFetching: state => state.fetching,

  // getRequest: state => state.request,
  // getRequestSuccess: state => state.requestSuccess,
  // getRequestFailed: state => state.requestFailed,
  // getRequestMessage: state => state.requestMessage,
  getForm: state => state.form,
  getFormSubmit: state => state.formSubmit,
  getFormSubmitSuccess: state => state.formSubmitSuccess,
  getFormSubmitFailed: state => state.formSubmitFailed,
  getFormSubmitMessage: state => state.formSubmitMessage,
  getNewRecordId: state => state.newRecordId

  // getUpdate: state => state.formSubmit,
  // getUpdateSuccess: state => state.formSubmitSuccess,
  // getUpdateFailed: state => state.formSubmitFailed
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({
    create: true,
    requestFailed: false,
    requestSuccess: false,
    requestMessage: 'Request Data'
  })
export const requestFailed = (state, action) =>
  state.merge({
    request: false,
    requestFailed: true,
    requestSuccess: false,
    requestMessage: action.data.requestMessage
  })
export const requestSuccess = (state, action) => {
  const { byId, allIds, maxModifiedon } = action.data
  return state.merge({
    request: false,
    requestFailed: false,
    requestSuccess: true,
    requestMessage: action.data.requestMessage,
    byId: { ...state.byId, ...byId },
    allIds: arrayMerge([state.allIds, allIds]),
    maxModifiedon: maxModifiedon || state.maxModifiedon
  })
}

export const deleteSuccess = (state, action) => {
  const { byId, allIds } = action.data
  return state.merge({
    formSubmit: false,
    formSubmitFailed: false,
    formSubmitSuccess: true,
    formSubmitMessage: '',
    byId: { ...state.byId, ...byId },
    allIds: arrayMerge([state.allIds, allIds])
  })
  // return state
}
// Or post it, straight out of Redux
export const doFormSubmit = state =>
  state.merge({
    formSubmit: true,
    formSubmitFailed: false,
    formSubmitSuccess: false,
    formSubmitMessage: 'Sending Data'
  })
export const doFormSubmitFailed = (state, action) =>
  state.merge({
    formSubmit: false,
    formSubmitFailed: true,
    formSubmitSuccess: false,
    formSubmitMessage: action.data.formSubmitMessage
  })
export const doFormSubmitSuccess = (state, action) => {
  const { byId, allIds } = action.data
  return state.merge({
    formSubmit: false,
    formSubmitFailed: false,
    formSubmitSuccess: true,
    formSubmitMessage: action.data.formSubmitMessage,
    newRecordId: allIds[0],
    byId: { ...state.byId, ...byId },
    allIds: arrayMerge([state.allIds, allIds])
  })
}
export const doFormReset = (state, action) =>
  state.merge({
    formSubmit: false,
    formSubmitFailed: false,
    formSubmitSuccess: false,
    formSubmitMessage: '',
    form: {}
  })
// or, Delete it.
export const remove = state =>
  state.merge({
    formSubmit: true,
    formSubmitFaied: false,
    formSubmitSuccess: false,
    formSubmitMessage: 'removing process'
  })
export const removeSuccess = (state, action) => {
  const { id } = action.data
  const allIds = _.difference(state.allIds, [id])
  const byId = state.byId.without([id])
  return state.merge({
    formSubmit: false,
    formSubmitFailed: false,
    formSubmitSuccess: true,
    formSubmitMessage: '',
    byId: byId,
    allIds: allIds
  })
}

export const setFormValue = (state, action) => {
  const { data } = action
  // console.log('setFormValue=>', data)
  if (!_.isEmpty(data)) {
    return state.merge({ form: { ...state.form, ...data } })
  }
  return state
}

export const reset = state => state.merge(INITIAL_STATE)

export const doEvaluatedParticipant = state =>
  state.merge({ evaluatedParticipantOnprogress: true })
export const doEvaluatedParticipantDone = state =>
  state.merge({ evaluatedParticipantOnprogress: false })

export const doDeleteParticipant = state =>
  state.merge({ deleteParticipantOnprogress: true })
export const doDeleteParticipantDone = (state, action) => {
  // const { data } = action
  // let classId = path(['class_id'], data)
  // let participantId = path(['participant_id'], data)
  // let status = path(['status'], data)

  return state.merge({ deleteParticipantOnprogress: false })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CLASSES_REQUEST]: request,
  [Types.CLASSES_REQUEST_ALL]: request,
  [Types.CLASSES_REQUEST_SUCCESS]: requestSuccess,
  [Types.CLASSES_REQUEST_FAILED]: requestFailed,
  [Types.CLASSES_DELETE_SUCCESS]: deleteSuccess,

  [Types.CLASSES_CREATE]: doFormSubmit,
  [Types.CLASSES_CREATE_SUCCESS]: doFormSubmitSuccess,
  [Types.CLASSES_CREATE_FAILED]: doFormSubmitFailed,

  [Types.CLASSES_FORM_RESET]: doFormReset,
  [Types.CLASSES_SET_FORM_VALUE]: setFormValue,

  [Types.CLASSES_DELETE_PARTICIPANT]: doDeleteParticipant,
  [Types.CLASSES_DELETE_PARTICIPANT_DONE]: doDeleteParticipantDone,

  [Types.CLASSES_EVALUATED_PARTICIPANT]: doEvaluatedParticipant,
  [Types.CLASSES_EVALUATED_PARTICIPANT_DONE]: doEvaluatedParticipantDone,

  [Types.CLASSES_UPDATE]: doFormSubmit,
  [Types.CLASSES_UPDATE_BATCH]: doFormSubmit,
  [Types.CLASSES_UPDATE_SUCCESS]: doFormSubmitSuccess,
  [Types.CLASSES_UPDATE_FAILED]: doFormSubmitFailed,

  [Types.CLASSES_REMOVE]: remove,
  [Types.CLASSES_REMOVE_SUCCESS]: removeSuccess,
  [Types.CLASSES_REMOVE_FAILED]: doFormSubmitFailed,
  [Types.CLASSES_RESET]: reset
})
