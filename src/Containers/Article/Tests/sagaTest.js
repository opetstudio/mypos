/* ***********************************************************
* Wiring Instructions
* To make this test work, you'll need to:
*  - Add a Fixture named getArticle to the
*    ./App/Services/FixtureApi file. You can just keep adding
*    functions to that file.
*************************************************************/

import FixtureAPI from '../../../Services/FixtureApi'
import API from '../api'
import { call, put, select } from 'redux-saga/effects'
import {
  // getArticle,
  getArticles,
  postArticle,
  updateArticle,
  // removeArticle,
  theData,
  // theUserPrefs,
  transformedData,
  theMulti
} from '../sagas'
import ArticleActions from '../redux'
import { mapAttributes, updateMulti, insertMulti } from '../../../Transforms/TransformAttributes'

const stepper = (fn) => (mock) => fn.next(mock).value

// it('first calls API', () => {
//   const step = stepper(getArticle(theApi, {data: 'taco'}))
//   // first yield is the API
//   expect(step()).toEqual(call(theApi.getArticle, 'taco'))
// })

// it('success path', () => {
//   const response = theApi.getArticle('taco')
//   const step = stepper(getArticle(theApi, {data: 'taco'}))
//   // Step 1: Hit the api
//   step()
//   // Step 2: Successful return and data!
//   expect(step(response)).toEqual(put(ArticleActions.articleSuccess(21)))
// })

// it('failure path', () => {
//   const response = {ok: false}
//   const step = stepper(getArticle(theApi, {data: 'taco'}))
//   // Step 1: Hit the api
//   step()
//   // Step 2: Failed response.
//   expect(step(response)).toEqual(put(ArticleActions.articleFailure()))
// })

const okIDResponse = {
  ok: true,
  data: { data: { attributes: { id: 'someValue', name: 'Something' } } }
}
const action = { type: 'Article', data: { someKey: 'someValue' } }

const baseUrl = 'http://localhost:8090/api/'

test('calls the index action', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = getArticles(theApi, action)

  actual = saga.next(action.data).value
  expect(actual).toEqual(call(theApi.getArticles, action.data))
  response = {
    ok: true,
    data: { data: { attributes: { something: 'someValue' } } }
  }

  actual = saga.next(response).value
  expect(actual).toEqual(put(ArticleActions.articleAllSuccess(mapAttributes(response.data))))

  expect(saga.next().done).toEqual(true)
})

test('calls the index action, but fails', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = getArticles(theApi, action)

  actual = saga.next(action.data).value
  expect(actual).toEqual(call(theApi.getArticles, action.data))

  response = {
    ok: false,
    data: {
      errors: [{ detail: 'An error goes here' }]
    }
  }

  actual = saga.next(response).value
  expect(actual).toEqual(
    put(ArticleActions.articleFailure(response.data.errors))
  )

  expect(actual).toEqual(put(ArticleActions.articleFailure(response.data.errors)))
  expect(saga.next().done).toEqual(true)
})

test('posts successfully', () => {
  let actual
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = postArticle(theApi, action)

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.postArticle, action.data))

  // actual = saga.next(okIDResponse).value
  // expect(actual).toEqual(put(ArticleActions.articleSingleSuccess(transformedData(okIDResponse))))

  // actual = saga.next(okIDResponse).value
  // expect(actual).toEqual(
  //   put(ArticleActions.articleData(transformedData(okIDResponse)))
  // )

  // actual = saga.next().value
  // expect(actual).toEqual(select(theMulti))

  // let multi = [{ id: 'aValue', name: 'aSomething' }]
  // actual = saga.next(multi).value
  // expect(actual).toEqual(put(ArticleActions.articleAllSuccess(insertMulti(transformedData(okIDResponse), multi))))

  // actual = saga.next().value
  // // expect(actual).toEqual(call(showSagaMessage, 'saved'))

  // expect(saga.next().done).toEqual(true)
})

test('posts, but the server returns an error', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = postArticle(theApi, action)

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.postArticle, action.data))
  // response = { ok: false, data: {
  //   errors: [{ detail: "An error goes here" }]
  //   }
  // }

  // actual = saga.next(response).value
  // expect(actual).toEqual(put(ArticleActions.articleFailure(response.data.errors)))

  // actual = saga.next().value
  // // expect(actual).toEqual(call(showSagaMessage, 'error'))

  // expect(saga.next().done).toEqual(true)
})

test('patches/edits successfully', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = updateArticle(theApi, action)

  // actual = saga.next().value
  // expect(actual).toEqual(select(theData))

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.updateArticle, action.data))
  // response = { ok: true, data: { data: { attributes: { id: 'someValue' } } } }

  // actual = saga.next(response).value
  // expect(actual).toEqual(put(ArticleActions.articleSingleSuccess(transformedData(response))))

  // actual = saga.next(response).value
  // expect(actual).toEqual(
  //   put(ArticleActions.articleData(transformedData(response)))
  // )

  // actual = saga.next().value
  // expect(actual).toEqual(select(theMulti))

  // let multi = [{ id: 'someValue' }]
  // actual = saga.next(multi).value
  // expect(actual).toEqual(put(ArticleActions.articleAllSuccess(updateMulti(transformedData(response), multi))))

  // actual = saga.next(response).value
  // // expect(actual).toEqual(call(showSagaMessage, 'saved'))

  // expect(saga.next().done).toEqual(true)
})

test('patches/edits but fails with server error', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = updateArticle(theApi, action)

  // actual = saga.next().value
  // expect(actual).toEqual(select(theData))

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.updateArticle, action.data))

  // response = {
  //   ok: false,
  //   data: {
  //     errors: [{ detail: 'An error goes here' }]
  //   }
  // }

  // actual = saga.next(response).value
  // expect(actual).toEqual(
  //   put(ArticleActions.articleFailure(response.data.errors))
  // )

  // actual = saga.next(response).value
  // // expect(actual).toEqual(call(showSagaMessage, 'error'))

  // expect(saga.next().done).toEqual(true)
})
