import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {arrayMerge, cleaningObject} from '../../Utils/helper/datamining'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // C
  userroleCreate: ['data'],
  userroleCreateFailed: ['data'],
  userroleCreateSuccess: ['data'],

  // R
  userroleRequest: ['data'],
  userroleRequestAll: ['data'],
  userroleRequestFailed: ['data'],
  userroleRequestSuccess: ['data'],

  userroleRemove: ['data', 'id'],
  userroleUpdate: ['data', 'id'],
  userroleUpdateBatch: ['data'],
  userroleUpdateFailed: ['data'],
  userroleUpdateSuccess: ['data'],

  userroleRemoveFailed: ['data'],
  userroleRemoveSuccess: ['data'],
  // BEGIN MULTISELECT ROLE
  userroleDeleteRole: ['data'],
  userroleDeleteRoleDone: ['data'],

  // END MULTISELECT ROLE
  userroleSetFormValue: ['data'],

  userroleFormReset: ['data'],
  userroleDeleteSuccess: ['data'],
  userroleReset: []
})

export const UserroleTypes = Types
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
  updateMessage: '',
  // BEGIN MULTISELECT ROLE
  deleteRoleOnprogress: false
  // END MULTISELECT ROLE

})

/* ------------- Selectors ------------- */

export const UserroleSelectors = {
  getData: state => state.data,
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id]),
  getAllRoleIdByUserId: (state, userId) => {
    // console.log('getAllIdsByClassId ==>', (state.allIds.map(id => (state.byId || {})[id]) || []))
    // let tes = _.filter((ClassparticipantSelectors.getAllDataArr(state) || []), (o) => o.class_id === classId) || []
    // console.log('tes===>'+classId, (ClassparticipantSelectors.getAllDataArr(state) || []))
    return (
      _.filter(
        UserroleSelectors.getAllDataArr(state) || [],
        o => o.user_id === userId
      ) || []
    ).map(o => o.role_id)
    // return (_.filter((state.allIds.map(id => (state.byId || {})[id]) || []), (o) => o.class_id === classId) || []).map(o => o.participant_id)
  },
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
export const request = (state, { data }) => state.merge({ create: true, requestFailed: false, requestSuccess: false, requestMessage: 'Request Data' })
export const requestFailed = (state, action) => state.merge({ request: false, requestFailed: true, requestSuccess: false, requestMessage: action.data.requestMessage })
export const requestSuccess = (state, action) => {
  const data = action.data
  const allIds = _.compact(data.allIds)
  const byId = cleaningObject(data.byId)
  const maxModifiedon = data.maxModifiedon
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
    byId: {...state.byId, ...byId},
    allIds: arrayMerge([state.allIds, allIds]),
    maxModifiedon: maxModifiedon || state.maxModifiedon
  })
}

export const deleteSuccess = (state, action) => {
  // console.log('deleteSuccess==>', action.data.listId)
  // const allIds = _.difference(state.allIds, action.data.listId)
  // const byId = state.byId.without(action.data.listId)
  // return state.merge({byId, allIds})
  const {byId, allIds} = action.data
  return state.merge({
    formSubmit: false,
    formSubmitFailed: false,
    formSubmitSuccess: true,
    formSubmitMessage: '',
    byId: {...state.byId, ...byId},
    allIds: arrayMerge([state.allIds, allIds])
  })
  // return state
}
// Or post it, straight out of Redux
export const doFormSubmit = state => state.merge({ formSubmit: true, formSubmitFailed: false, formSubmitSuccess: false, formSubmitMessage: 'Sending Data' })
export const doFormSubmitFailed = (state, action) => state.merge({ formSubmit: false, formSubmitFailed: true, formSubmitSuccess: false, formSubmitMessage: action.data.formSubmitMessage })
export const doFormSubmitSuccess = (state, action) => {
  const {byId, allIds} = action.data
  return state.merge({
    formSubmit: false,
    formSubmitFailed: false,
    formSubmitSuccess: true,
    formSubmitMessage: action.data.formSubmitMessage,
    newRecordId: allIds[0],
    byId: {...state.byId, ...byId},
    allIds: arrayMerge([state.allIds, allIds])
  })
}
export const doFormReset = (state, action) => state.merge({ formSubmit: false, formSubmitFailed: false, formSubmitSuccess: false, formSubmitMessage: '', form: {} })

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
export const remove = state => state.merge({ formSubmit: true, formSubmitFaied: false, formSubmitSuccess: false, formSubmitMessage: 'removing process' })
export const removeSuccess = (state, action) => {
  // console.log('deleteSuccess==>', action.data.listId)
  // const allIds = _.difference(state.allIds, action.data.listId)
  // const byId = state.byId.without(action.data.listId)
  // return state.merge({byId, allIds})
  const {id} = action.data
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
  return state.merge({ form: data ? {...state.form, ...data} : null })
}

export const reset = (state) => state.merge(INITIAL_STATE)

// BEGIN MULTISELECT ROLE
export const doDeleteRole = state => state.merge({ deleteRoleOnprogress: true })
export const doDeleteRoleDone = (state, action) => state.merge({ deleteRoleOnprogress: false })
// END MULTISELECT ROLE

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
  [Types.USERROLE_REQUEST]: request,
  [Types.USERROLE_REQUEST_ALL]: request,
  [Types.USERROLE_REQUEST_SUCCESS]: requestSuccess,
  [Types.USERROLE_REQUEST_FAILED]: requestFailed,
  [Types.USERROLE_DELETE_SUCCESS]: deleteSuccess,

  [Types.USERROLE_CREATE]: doFormSubmit,
  [Types.USERROLE_CREATE_SUCCESS]: doFormSubmitSuccess,
  [Types.USERROLE_CREATE_FAILED]: doFormSubmitFailed,

  [Types.USERROLE_FORM_RESET]: doFormReset,
  [Types.USERROLE_SET_FORM_VALUE]: setFormValue,

  // BEGIN MULTISELECT ROLE
  [Types.USERROLE_DELETE_ROLE]: doDeleteRole,
  [Types.USERROLE_DELETE_ROLE_DONE]: doDeleteRoleDone,
  // END MULTISELECT ROLE

  [Types.USERROLE_UPDATE]: doFormSubmit,
  [Types.USERROLE_UPDATE_BATCH]: doFormSubmit,
  [Types.USERROLE_UPDATE_SUCCESS]: doFormSubmitSuccess,
  [Types.USERROLE_UPDATE_FAILED]: doFormSubmitFailed,

  [Types.USERROLE_REMOVE]: remove,
  [Types.USERROLE_REMOVE_SUCCESS]: removeSuccess,
  [Types.USERROLE_REMOVE_FAILED]: doFormSubmitFailed,
  [Types.USERROLE_RESET]: reset
})
