/* ***********************************************************
* Wiring Instructions
* To make this test work, you'll need to:
*  - Add a Fixture named getUserrole to the
*    ./App/Services/FixtureApi file. You can just keep adding
*    functions to that file.
*************************************************************/

import FixtureAPI from '../../../Services/FixtureApi'
import API from '../api'
import { call, put, select } from 'redux-saga/effects'
import {
  // getUserrole,
  getUserroles,
  postUserrole,
  updateUserrole,
  // removeUserrole,
  theData,
  // theUserPrefs,
  transformedData,
  theMulti
} from '../sagas'
import UserroleActions from '../redux'
import { mapAttributes, updateMulti, insertMulti } from '../../../Transforms/TransformAttributes'

const stepper = (fn) => (mock) => fn.next(mock).value

// it('first calls API', () => {
//   const step = stepper(getUserrole(theApi, {data: 'taco'}))
//   // first yield is the API
//   expect(step()).toEqual(call(theApi.getUserrole, 'taco'))
// })

// it('success path', () => {
//   const response = theApi.getUserrole('taco')
//   const step = stepper(getUserrole(theApi, {data: 'taco'}))
//   // Step 1: Hit the api
//   step()
//   // Step 2: Successful return and data!
//   expect(step(response)).toEqual(put(UserroleActions.userroleSuccess(21)))
// })

// it('failure path', () => {
//   const response = {ok: false}
//   const step = stepper(getUserrole(theApi, {data: 'taco'}))
//   // Step 1: Hit the api
//   step()
//   // Step 2: Failed response.
//   expect(step(response)).toEqual(put(UserroleActions.userroleFailure()))
// })

const okIDResponse = {
  ok: true,
  data: { data: { attributes: { id: 'someValue', name: 'Something' } } }
}
const action = { type: 'Userrole', data: { someKey: 'someValue' } }

const baseUrl = 'http://localhost:8090/api/'

test('calls the index action', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = getUserroles(theApi, action)

  actual = saga.next(action.data).value
  expect(actual).toEqual(call(theApi.getUserroles, action.data))
  response = {
    ok: true,
    data: { data: { attributes: { something: 'someValue' } } }
  }

  actual = saga.next(response).value
  expect(actual).toEqual(put(UserroleActions.userroleAllSuccess(mapAttributes(response.data))))

  expect(saga.next().done).toEqual(true)
})

test('calls the index action, but fails', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = getUserroles(theApi, action)

  actual = saga.next(action.data).value
  expect(actual).toEqual(call(theApi.getUserroles, action.data))

  response = {
    ok: false,
    data: {
      errors: [{ detail: 'An error goes here' }]
    }
  }

  actual = saga.next(response).value
  expect(actual).toEqual(
    put(UserroleActions.userroleFailure(response.data.errors))
  )

  expect(actual).toEqual(put(UserroleActions.userroleFailure(response.data.errors)))
  expect(saga.next().done).toEqual(true)
})

test('posts successfully', () => {
  let actual
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = postUserrole(theApi, action)

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.postUserrole, action.data))

  // actual = saga.next(okIDResponse).value
  // expect(actual).toEqual(put(UserroleActions.userroleSingleSuccess(transformedData(okIDResponse))))

  // actual = saga.next(okIDResponse).value
  // expect(actual).toEqual(
  //   put(UserroleActions.userroleData(transformedData(okIDResponse)))
  // )

  // actual = saga.next().value
  // expect(actual).toEqual(select(theMulti))

  // let multi = [{ id: 'aValue', name: 'aSomething' }]
  // actual = saga.next(multi).value
  // expect(actual).toEqual(put(UserroleActions.userroleAllSuccess(insertMulti(transformedData(okIDResponse), multi))))

  // actual = saga.next().value
  // // expect(actual).toEqual(call(showSagaMessage, 'saved'))

  // expect(saga.next().done).toEqual(true)
})

test('posts, but the server returns an error', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = postUserrole(theApi, action)

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.postUserrole, action.data))
  // response = { ok: false, data: {
  //   errors: [{ detail: "An error goes here" }]
  //   }
  // }

  // actual = saga.next(response).value
  // expect(actual).toEqual(put(UserroleActions.userroleFailure(response.data.errors)))

  // actual = saga.next().value
  // // expect(actual).toEqual(call(showSagaMessage, 'error'))

  // expect(saga.next().done).toEqual(true)
})

test('patches/edits successfully', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = updateUserrole(theApi, action)

  // actual = saga.next().value
  // expect(actual).toEqual(select(theData))

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.updateUserrole, action.data))
  // response = { ok: true, data: { data: { attributes: { id: 'someValue' } } } }

  // actual = saga.next(response).value
  // expect(actual).toEqual(put(UserroleActions.userroleSingleSuccess(transformedData(response))))

  // actual = saga.next(response).value
  // expect(actual).toEqual(
  //   put(UserroleActions.userroleData(transformedData(response)))
  // )

  // actual = saga.next().value
  // expect(actual).toEqual(select(theMulti))

  // let multi = [{ id: 'someValue' }]
  // actual = saga.next(multi).value
  // expect(actual).toEqual(put(UserroleActions.userroleAllSuccess(updateMulti(transformedData(response), multi))))

  // actual = saga.next(response).value
  // // expect(actual).toEqual(call(showSagaMessage, 'saved'))

  // expect(saga.next().done).toEqual(true)
})

test('patches/edits but fails with server error', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = updateUserrole(theApi, action)

  // actual = saga.next().value
  // expect(actual).toEqual(select(theData))

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.updateUserrole, action.data))

  // response = {
  //   ok: false,
  //   data: {
  //     errors: [{ detail: 'An error goes here' }]
  //   }
  // }

  // actual = saga.next(response).value
  // expect(actual).toEqual(
  //   put(UserroleActions.userroleFailure(response.data.errors))
  // )

  // actual = saga.next(response).value
  // // expect(actual).toEqual(call(showSagaMessage, 'error'))

  // expect(saga.next().done).toEqual(true)
})
