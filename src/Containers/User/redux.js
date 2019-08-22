import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { arrayMerge, cleaningObject } from '../../Utils/helper/datamining'
import _ from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // C
  userCreate: ['data'],
  userCreateFailed: ['data'],
  userCreateSuccess: ['data'],

  // R
  userRequestProfile: ['data'],
  userRequestProfileSuccess: ['data'],
  userRequest: ['data'],
  userRequestAll: ['data'],
  userRequestFailed: ['data'],
  userRequestSuccess: ['data'],

  userRemove: ['data', 'id'],
  userUpdate: ['data', 'id'],
  userUpdateBatch: ['data'],
  userUpdateFailed: ['data'],
  userUpdateSuccess: ['data'],

  userRemoveFailed: ['data'],
  userRemoveSuccess: ['data'],
  userSetFormValue: ['data'],

  userFormReset: ['data'],
  userDeleteSuccess: ['data'],
  userReset: []
})

export const UserTypes = Types
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

  profile: {},

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

  pageCount: 0,
  pageSize: 10
})

/* ------------- Selectors ------------- */

export const UserSelectors = {
  getData: state => state.data,
  getDetailById: (state, id) => (state.byId || {})[id],
  getAllIds: state => state.allIds,
  getAllDataArr: state => state.allIds.map(id => (state.byId || {})[id] || {}),
  getMaxModifiedon: state => state.maxModifiedon,
  getById: state => state.byId,
  getIsError: state => state.isError,
  getMessage: state => state.message,
  getIsCreateSucces: state => state.isCreateSucces,
  getSingle: state => state.single,
  getFetching: state => state.fetching,
  getProfile: state => state.profile,
  getFullnameById: state => {
    return id => {
      let dataDetail = state.byId[id] || {}
      return `${dataDetail.first_name} ${dataDetail.last_name}`
    }
  },

  // getRequest: state => state.request,
  // getRequestSuccess: state => state.requestSuccess,
  // getRequestFailed: state => state.requestFailed,
  // getRequestMessage: state => state.requestMessage,
  getForm: state => state.form,
  getFormSubmit: state => state.formSubmit,
  getFormSubmitSuccess: state => state.formSubmitSuccess,
  getFormSubmitFailed: state => state.formSubmitFailed,
  getFormSubmitMessage: state => state.formSubmitMessage,
  getNewRecordId: state => state.newRecordId,

  getPageCount: state => state.pageCount,
  getPageSize: state => state.pageSize

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
  console.log('user requestSuccess=', action)
  const data = action.data
  const allIds = _.compact(data.allIds)
  const byId = cleaningObject(data.byId)
  const maxModifiedon = data.maxModifiedon
  const pageCount = data.pageCount
  const pageSize = data.pageSize
  console.log('user requestSuccess byId=', byId)
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
    // byId: { ...state.byId, ...byId },
    // allIds: arrayMerge([state.allIds, allIds]),
    byId,
    allIds,
    maxModifiedon: maxModifiedon || state.maxModifiedon,
    pageCount,
    pageSize
  })
}
export const requestProfileSuccess = (state, action) => {
  const { detail } = action.data
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
    profile: detail
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
  console.log('user doFormSubmitSuccess', action.data)
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
  console.log('user removeSuccess', action.data)
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
  [Types.USER_REQUEST_PROFILE]: request,
  [Types.USER_REQUEST]: request,
  [Types.USER_REQUEST_ALL]: request,
  [Types.USER_REQUEST_SUCCESS]: requestSuccess,
  [Types.USER_REQUEST_PROFILE_SUCCESS]: requestProfileSuccess,
  [Types.USER_REQUEST_FAILED]: requestFailed,
  [Types.USER_DELETE_SUCCESS]: deleteSuccess,

  [Types.USER_CREATE]: doFormSubmit,
  [Types.USER_CREATE_SUCCESS]: doFormSubmitSuccess,
  [Types.USER_CREATE_FAILED]: doFormSubmitFailed,

  [Types.USER_FORM_RESET]: doFormReset,
  [Types.USER_SET_FORM_VALUE]: setFormValue,
 
  [Types.USER_UPDATE]: doFormSubmit,
  [Types.USER_UPDATE_BATCH]: doFormSubmit,
  [Types.USER_UPDATE_SUCCESS]: doFormSubmitSuccess,
  [Types.USER_UPDATE_FAILED]: doFormSubmitFailed,

  [Types.USER_REMOVE]: remove,
  [Types.USER_REMOVE_SUCCESS]: removeSuccess,
  [Types.USER_REMOVE_FAILED]: doFormSubmitFailed,
  [Types.USER_RESET]: reset
})
