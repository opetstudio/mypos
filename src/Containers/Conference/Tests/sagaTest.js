/* ***********************************************************
 * Wiring Instructions
 * To make this test work, you'll need to:
 *  - Add a Fixture named getConference to the
 *    ./App/Services/FixtureApi file. You can just keep adding
 *    functions to that file.
 *************************************************************/

import FixtureAPI from '../../../Services/FixtureApi'
import API from '../api'
import { call, put, select } from 'redux-saga/effects'
import {
  // getConference,
  getConferences,
  postConference,
  updateConference,
  // removeConference,
  theData,
  // theUserPrefs,
  transformedData,
  theMulti
} from '../sagas'
import ConferenceActions from '../redux'
import {
  mapAttributes,
  updateMulti,
  insertMulti
} from '../../../Transforms/TransformAttributes'

const stepper = fn => mock => fn.next(mock).value

// it('first calls API', () => {
//   const step = stepper(getConference(theApi, {data: 'taco'}))
//   // first yield is the API
//   expect(step()).toEqual(call(theApi.getConference, 'taco'))
// })

// it('success path', () => {
//   const response = theApi.getConference('taco')
//   const step = stepper(getConference(theApi, {data: 'taco'}))
//   // Step 1: Hit the api
//   step()
//   // Step 2: Successful return and data!
//   expect(step(response)).toEqual(put(ConferenceActions.conferenceSuccess(21)))
// })

// it('failure path', () => {
//   const response = {ok: false}
//   const step = stepper(getConference(theApi, {data: 'taco'}))
//   // Step 1: Hit the api
//   step()
//   // Step 2: Failed response.
//   expect(step(response)).toEqual(put(ConferenceActions.conferenceFailure()))
// })

const okIDResponse = {
  ok: true,
  data: { data: { attributes: { id: 'someValue', name: 'Something' } } }
}
const action = { type: 'Conference', data: { someKey: 'someValue' } }

const baseUrl = 'http://localhost:8090/api/'

test('calls the index action', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = getConferences(theApi, action)

  actual = saga.next(action.data).value
  expect(actual).toEqual(call(theApi.getConferences, action.data))
  response = {
    ok: true,
    data: { data: { attributes: { something: 'someValue' } } }
  }

  actual = saga.next(response).value
  expect(actual).toEqual(
    put(ConferenceActions.conferenceAllSuccess(mapAttributes(response.data)))
  )

  expect(saga.next().done).toEqual(true)
})

test('calls the index action, but fails', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = getConferences(theApi, action)

  actual = saga.next(action.data).value
  expect(actual).toEqual(call(theApi.getConferences, action.data))

  response = {
    ok: false,
    data: {
      errors: [{ detail: 'An error goes here' }]
    }
  }

  actual = saga.next(response).value
  expect(actual).toEqual(
    put(ConferenceActions.conferenceFailure(response.data.errors))
  )

  expect(actual).toEqual(
    put(ConferenceActions.conferenceFailure(response.data.errors))
  )
  expect(saga.next().done).toEqual(true)
})

test('posts successfully', () => {
  let actual
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = postConference(theApi, action)

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.postConference, action.data))

  // actual = saga.next(okIDResponse).value
  // expect(actual).toEqual(put(ConferenceActions.conferenceSingleSuccess(transformedData(okIDResponse))))

  // actual = saga.next(okIDResponse).value
  // expect(actual).toEqual(
  //   put(ConferenceActions.conferenceData(transformedData(okIDResponse)))
  // )

  // actual = saga.next().value
  // expect(actual).toEqual(select(theMulti))

  // let multi = [{ id: 'aValue', name: 'aSomething' }]
  // actual = saga.next(multi).value
  // expect(actual).toEqual(put(ConferenceActions.conferenceAllSuccess(insertMulti(transformedData(okIDResponse), multi))))

  // actual = saga.next().value
  // // expect(actual).toEqual(call(showSagaMessage, 'saved'))

  // expect(saga.next().done).toEqual(true)
})

test('posts, but the server returns an error', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = postConference(theApi, action)

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.postConference, action.data))
  // response = { ok: false, data: {
  //   errors: [{ detail: "An error goes here" }]
  //   }
  // }

  // actual = saga.next(response).value
  // expect(actual).toEqual(put(ConferenceActions.conferenceFailure(response.data.errors)))

  // actual = saga.next().value
  // // expect(actual).toEqual(call(showSagaMessage, 'error'))

  // expect(saga.next().done).toEqual(true)
})

test('patches/edits successfully', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = updateConference(theApi, action)

  // actual = saga.next().value
  // expect(actual).toEqual(select(theData))

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.updateConference, action.data))
  // response = { ok: true, data: { data: { attributes: { id: 'someValue' } } } }

  // actual = saga.next(response).value
  // expect(actual).toEqual(put(ConferenceActions.conferenceSingleSuccess(transformedData(response))))

  // actual = saga.next(response).value
  // expect(actual).toEqual(
  //   put(ConferenceActions.conferenceData(transformedData(response)))
  // )

  // actual = saga.next().value
  // expect(actual).toEqual(select(theMulti))

  // let multi = [{ id: 'someValue' }]
  // actual = saga.next(multi).value
  // expect(actual).toEqual(put(ConferenceActions.conferenceAllSuccess(updateMulti(transformedData(response), multi))))

  // actual = saga.next(response).value
  // // expect(actual).toEqual(call(showSagaMessage, 'saved'))

  // expect(saga.next().done).toEqual(true)
})

test('patches/edits but fails with server error', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = updateConference(theApi, action)

  // actual = saga.next().value
  // expect(actual).toEqual(select(theData))

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.updateConference, action.data))

  // response = {
  //   ok: false,
  //   data: {
  //     errors: [{ detail: 'An error goes here' }]
  //   }
  // }

  // actual = saga.next(response).value
  // expect(actual).toEqual(
  //   put(ConferenceActions.conferenceFailure(response.data.errors))
  // )

  // actual = saga.next(response).value
  // // expect(actual).toEqual(call(showSagaMessage, 'error'))

  // expect(saga.next().done).toEqual(true)
})
