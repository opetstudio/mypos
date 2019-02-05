import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { arrayMerge } from '../../Utils/helper/datamining'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // C
  conferenceCreate: ['data'],
  conferenceCreateFailed: ['data'],
  conferenceCreateSuccess: ['data'],

  // R
  conferenceRequest: ['data'],
  conferenceRequestAll: ['data'],
  conferenceRequestFailed: ['data'],
  conferenceRequestSuccess: ['data'],

  conferenceRemove: ['data', 'id'],
  conferenceUpdate: ['data', 'id'],
  conferenceUpdateBatch: ['data'],
  conferenceUpdateFailed: ['data'],
  conferenceUpdateSuccess: ['data'],

  conferenceRemoveFailed: ['data'],
  conferenceRemoveSuccess: ['data'],

  conferenceSetFormValue: ['data'],

  conferenceFormReset: ['data'],
  conferenceDeleteSuccess: ['data'],
  conferenceReset: []
})

export const ConferenceTypes = Types
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
  formSubmit: false,
  formSubmitSuccess: false,
  formSubmitFailed: false,
  formSubmitMessage: '',
  newRecordId: '',

  update: false,
  updateSuccess: false,
  updateFailed: false,
  updateMessage: ''
})

/* ------------- Selectors ------------- */

export const ConferenceSelectors = {
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
  // allIds.forEach(r => {
  //   if (byId[r].status === 'delete'){
  //     state.byId.without(r)
  //   }
  // })
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
  // console.log('deleteSuccess==>', action.data.listId)
  // const allIds = _.difference(state.allIds, action.data.listId)
  // const byId = state.byId.without(action.data.listId)
  // return state.merge({byId, allIds})
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

// or, Update it.
// export const update = state => state.merge({ update: true, updateFailed: false, updateSuccess: false, updateMessage: 'sending update data' })
// export const updateFailed = (state, action) => {
//   return state.merge({ update: false, updateFailed: true, updateSuccess: false, updateMessage: action.data.updateMessage })
// }
// export const updateSuccess = (state, action) => {
//   const {byId, allIds} = action.data
//   return state.merge({
//     update: false,
//     updateFailed: false,
//     updateSuccess: true,
//     updateMessage: action.data.updateMessage,
//     newRecordId: allIds[0],
//     byId: {...state.byId, ...byId},
//     allIds: arrayMerge([state.allIds, allIds])
//   })
// }

// or, Delete it.
// export const remove = state => state.merge({ fetching: true, isError: false, message: 'removing process' })
export const remove = state =>
  state.merge({
    formSubmit: true,
    formSubmitFaied: false,
    formSubmitSuccess: false,
    formSubmitMessage: 'removing process'
  })
export const removeSuccess = (state, action) => {
  // console.log('deleteSuccess==>', action.data.listId)
  // const allIds = _.difference(state.allIds, action.data.listId)
  // const byId = state.byId.without(action.data.listId)
  // return state.merge({byId, allIds})
  const { id } = action.data
  // state.byId.without(id)
  // state.allIds.splice(state.allIds.indexOf(id), 1)
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
  // return state
}
// successful api lookup
// export const success = (state, action) => {
//   const { payload } = action
//   return state.merge({ single: {}, fetching: false, error: null, payload, isError: false, isCreateSucces: false })
// }

export const setFormValue = (state, action) => {
  const { data } = action
  return state.merge({ form: data ? { ...state.form, ...data } : null })
}
export const reset = state => state.merge(INITIAL_STATE)

// export const singleSuccess = (state, action) => {
//   // const { payload } = action

//   const { data } = action
//   const byId = {}
//   byId[data.contentDetail._id] = data.contentDetail
//   return state.merge({ single: data.contentDetail, byId: {...state.byId, ...byId} })
// }

// export const allSuccess = (state, action) => {
//   const { byId, allIds, maxModifiedon } = action.data
//   return state.merge({ fetching: false, error: null, byId: {...state.byId, ...byId}, allIds: arrayMerge([state.allIds, allIds]) })
// }

// Something went wrong somewhere.
// export const failure = state =>
//   state.merge({ fetching: false, error: true, payload: null })

// Or just merge a new object
// export const data = (state, { data }) =>
//   state.merge({ data }, {deep: true})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONFERENCE_REQUEST]: request,
  [Types.CONFERENCE_REQUEST_ALL]: request,
  [Types.CONFERENCE_REQUEST_SUCCESS]: requestSuccess,
  [Types.CONFERENCE_REQUEST_FAILED]: requestFailed,
  [Types.CONFERENCE_DELETE_SUCCESS]: deleteSuccess,

  [Types.CONFERENCE_CREATE]: doFormSubmit,
  [Types.CONFERENCE_CREATE_SUCCESS]: doFormSubmitSuccess,
  [Types.CONFERENCE_CREATE_FAILED]: doFormSubmitFailed,

  [Types.CONFERENCE_FORM_RESET]: doFormReset,
  [Types.CONFERENCE_SET_FORM_VALUE]: setFormValue,

  [Types.CONFERENCE_UPDATE]: doFormSubmit,
  [Types.CONFERENCE_UPDATE_BATCH]: doFormSubmit,
  [Types.CONFERENCE_UPDATE_SUCCESS]: doFormSubmitSuccess,
  [Types.CONFERENCE_UPDATE_FAILED]: doFormSubmitFailed,

  [Types.CONFERENCE_REMOVE]: remove,
  [Types.CONFERENCE_REMOVE_SUCCESS]: removeSuccess,
  [Types.CONFERENCE_REMOVE_FAILED]: doFormSubmitFailed,
  [Types.CONFERENCE_RESET]: reset
})
