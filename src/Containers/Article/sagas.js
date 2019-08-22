import { call, put, select } from 'redux-saga/effects'
import ArticleActions from './redux'
import LoginActions from '../Login/redux'
import { getAttributes, getEntity, getEntityCollection, getEntityBatch } from '../../Transforms/TransformAttributes'
import { merge, path } from 'ramda'
import _ from 'lodash'
// import { showSagaMessage } from '../Translations/SagaMessages'
// import history from '../Services/BrowserHistory'

export const session = state => ({...state.login.single, token: state.login.token, isLoggedIn: state.login.isLoggedIn})
export const theData = state => state.article.data
export const theMulti = state => state.article.multi
export const theUserPrefs = state => state.user.preferences
export const transformedData = response => getAttributes(response.data)

export function * getArticle (api, action) {
  console.log('[ArticleSaga] getArticle action=', action)
  const { data } = action
  const s = yield select(session)
  // make the call to the api
  const response = yield call(api.getArticle, data, {session: s})
  console.log('responseeeeee', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    // const { contentDetail } = response.data
    const {byId, allIds} = getEntity(response.data)
    yield put(ArticleActions.articleRequestSuccess({requestMessage: 'success fetch data', byId, allIds}))
  } else {
    yield put(ArticleActions.articleRequestFailed({requestMessage: 'failed fetch data'}))
  }
}
export function * postArticle (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.postArticle, data, {session: s})
  console.log('response==>', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const {byId, allIds, status} = getEntity(response.data)
    if (response.status === 201) {
      const byId = {[response.data._id]: response.data}
      const allIds = [response.data._id]
      yield put(ArticleActions.articleCreateSuccess({formSubmitMessage: 'success post data', byId, allIds}))
    } else yield put(ArticleActions.articleCreateFailed({ formSubmitMessage: 'Failed create data' }))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    // if (path(['originalError', 'response', 'status'], response) === 500) return yield put(LoginActions.loginRemoveSuccess({}))
    yield put(ArticleActions.articleCreateFailed({ formSubmitMessage: validationMessages }))
  }
}

export function * updateArticle (api, action) {
  const { data, id } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateArticle, data, id, {session: s})
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const {byId, allIds, status} = getEntity(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(ArticleActions.articleDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(ArticleActions.articleUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(ArticleActions.articleUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(ArticleActions.articleUpdateFailed({ formSubmitMessage: validationMessages }))
  }
}
export function * updateArticleBatch (api, action) {
  const { data } = action
  // make the call to the api
  // const params = yield select(theData)
  const s = yield select(session)
  const response = yield call(api.updateArticleBatch, data, {session: s})
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { contentDetail, status, msg } = response.data
    // console.log('contentDetail', contentDetail)
    const {byId, allIds, status} = getEntityBatch(response.data)
    // if (status === 'delete') {
    //   const allDeletedIds = allIds
    //   yield put(ArticleActions.articleDeleteSuccess({listId: allDeletedIds}))
    // } else yield put(ArticleActions.articleUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
    yield put(ArticleActions.articleUpdateSuccess({formSubmitMessage: 'success update data', byId, allIds}))
  } else {
    let validationMessages = JSON.stringify(path(['originalError', 'response', 'data', 'validation_messages'], response))
    if (response.status === 500) validationMessages = path(['originalError', 'response', 'data', 'detail'], response)
    yield yield put(ArticleActions.articleUpdateFailed({ formSubmitMessage: validationMessages }))
  }
}

export function * removeArticle (api, action) {
  const { data, id } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.removeArticle, data, id, {session: s})
  console.log('removeArticle response=>', response)

  // success?
  if (response.ok) {
    yield put(ArticleActions.articleRemoveSuccess({id}))
  } else {
    yield put(ArticleActions.articleRequestFailed({requestMessage: 'failed remove data'}))
  }
}

export function * getArticles (api, action) {
  const { data } = action
  // make the call to the api
  const s = yield select(session)
  const response = yield call(api.getArticles, data, {session: s})
  console.log('responseeeeee', response)
  if (path(['originalError', 'response', 'status'], response) === 401 && path(['originalError', 'response', 'statusText'], response) === 'Unauthorized') return yield put(LoginActions.loginRemoveSuccess({}))
  // if (path(['originalError', 'response', 'status'], response) === 403 && path(['originalError', 'response', 'statusText'], response) === 'Forbidden') return yield put(LoginActions.loginRemoveSuccess({}))
  // success?
  if (response.ok) {
    // const { byId, allIds, maxModifiedon } = response.data
    const {byId, allIds, maxModifiedon} = getEntityCollection(response.data, 'tb_article')
    let { page_count: pageCount, page_size: pageSize } = response.data
    yield put(ArticleActions.articleRequestSuccess({requestMessage: 'success fetch data', byId, allIds, maxModifiedon, pageCount, pageSize}))
    const allDeletedIds = ((_.filter(allIds.map(r => byId[r]), { 'status': 'delete' })) || []).map(r => r._id)
    allDeletedIds.push(undefined)
    allDeletedIds.push('undefined')
    allDeletedIds.push(null)
    // allDeletedIds.push(null)
    yield put(ArticleActions.articleDeleteSuccess({listId: allDeletedIds}))
  } else {
    yield put(ArticleActions.articleRequestFailed({requestMessage: 'failed fetch data'}))
  }
}
