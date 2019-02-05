/* ***********************************************************
 * Wiring Instructions
 * To make this test work, you'll need to:
 *  - Add a Fixture named getParticipantbadge to the
 *    ./App/Services/FixtureApi file. You can just keep adding
 *    functions to that file.
 *************************************************************/

import FixtureAPI from '../../../Services/FixtureApi'
import API from '../api'
import { call, put, select } from 'redux-saga/effects'
import {
  // getParticipantbadge,
  getParticipantbadges,
  postParticipantbadge,
  updateParticipantbadge,
  // removeParticipantbadge,
  theData,
  // theUserPrefs,
  transformedData,
  theMulti
} from '../sagas'
import ParticipantbadgeActions from '../redux'
import {
  mapAttributes,
  updateMulti,
  insertMulti
} from '../../../Transforms/TransformAttributes'

const stepper = fn => mock => fn.next(mock).value

// it('first calls API', () => {
//   const step = stepper(getParticipantbadge(theApi, {data: 'taco'}))
//   // first yield is the API
//   expect(step()).toEqual(call(theApi.getParticipantbadge, 'taco'))
// })

// it('success path', () => {
//   const response = theApi.getParticipantbadge('taco')
//   const step = stepper(getParticipantbadge(theApi, {data: 'taco'}))
//   // Step 1: Hit the api
//   step()
//   // Step 2: Successful return and data!
//   expect(step(response)).toEqual(put(ParticipantbadgeActions.participantbadgeSuccess(21)))
// })

// it('failure path', () => {
//   const response = {ok: false}
//   const step = stepper(getParticipantbadge(theApi, {data: 'taco'}))
//   // Step 1: Hit the api
//   step()
//   // Step 2: Failed response.
//   expect(step(response)).toEqual(put(ParticipantbadgeActions.participantbadgeFailure()))
// })

const okIDResponse = {
  ok: true,
  data: { data: { attributes: { id: 'someValue', name: 'Something' } } }
}
const action = { type: 'Participantbadge', data: { someKey: 'someValue' } }

const baseUrl = 'http://localhost:8090/api/'

test('calls the index action', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = getParticipantbadges(theApi, action)

  actual = saga.next(action.data).value
  expect(actual).toEqual(call(theApi.getParticipantbadges, action.data))
  response = {
    ok: true,
    data: { data: { attributes: { something: 'someValue' } } }
  }

  actual = saga.next(response).value
  expect(actual).toEqual(
    put(
      ParticipantbadgeActions.participantbadgeAllSuccess(
        mapAttributes(response.data)
      )
    )
  )

  expect(saga.next().done).toEqual(true)
})

test('calls the index action, but fails', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = getParticipantbadges(theApi, action)

  actual = saga.next(action.data).value
  expect(actual).toEqual(call(theApi.getParticipantbadges, action.data))

  response = {
    ok: false,
    data: {
      errors: [{ detail: 'An error goes here' }]
    }
  }

  actual = saga.next(response).value
  expect(actual).toEqual(
    put(ParticipantbadgeActions.participantbadgeFailure(response.data.errors))
  )

  expect(actual).toEqual(
    put(ParticipantbadgeActions.participantbadgeFailure(response.data.errors))
  )
  expect(saga.next().done).toEqual(true)
})

test('posts successfully', () => {
  let actual
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  let saga = postParticipantbadge(theApi, action)

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.postParticipantbadge, action.data))

  // actual = saga.next(okIDResponse).value
  // expect(actual).toEqual(put(ParticipantbadgeActions.participantbadgeSingleSuccess(transformedData(okIDResponse))))

  // actual = saga.next(okIDResponse).value
  // expect(actual).toEqual(
  //   put(ParticipantbadgeActions.participantbadgeData(transformedData(okIDResponse)))
  // )

  // actual = saga.next().value
  // expect(actual).toEqual(select(theMulti))

  // let multi = [{ id: 'aValue', name: 'aSomething' }]
  // actual = saga.next(multi).value
  // expect(actual).toEqual(put(ParticipantbadgeActions.participantbadgeAllSuccess(insertMulti(transformedData(okIDResponse), multi))))

  // actual = saga.next().value
  // // expect(actual).toEqual(call(showSagaMessage, 'saved'))

  // expect(saga.next().done).toEqual(true)
})

test('posts, but the server returns an error', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = postParticipantbadge(theApi, action)

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.postParticipantbadge, action.data))
  // response = { ok: false, data: {
  //   errors: [{ detail: "An error goes here" }]
  //   }
  // }

  // actual = saga.next(response).value
  // expect(actual).toEqual(put(ParticipantbadgeActions.participantbadgeFailure(response.data.errors)))

  // actual = saga.next().value
  // // expect(actual).toEqual(call(showSagaMessage, 'error'))

  // expect(saga.next().done).toEqual(true)
})

test('patches/edits successfully', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = updateParticipantbadge(theApi, action)

  // actual = saga.next().value
  // expect(actual).toEqual(select(theData))

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.updateParticipantbadge, action.data))
  // response = { ok: true, data: { data: { attributes: { id: 'someValue' } } } }

  // actual = saga.next(response).value
  // expect(actual).toEqual(put(ParticipantbadgeActions.participantbadgeSingleSuccess(transformedData(response))))

  // actual = saga.next(response).value
  // expect(actual).toEqual(
  //   put(ParticipantbadgeActions.participantbadgeData(transformedData(response)))
  // )

  // actual = saga.next().value
  // expect(actual).toEqual(select(theMulti))

  // let multi = [{ id: 'someValue' }]
  // actual = saga.next(multi).value
  // expect(actual).toEqual(put(ParticipantbadgeActions.participantbadgeAllSuccess(updateMulti(transformedData(response), multi))))

  // actual = saga.next(response).value
  // // expect(actual).toEqual(call(showSagaMessage, 'saved'))

  // expect(saga.next().done).toEqual(true)
})

test('patches/edits but fails with server error', () => {
  let actual, response
  let theApi = API.create(baseUrl)
  // let theApi = FixtureAPI

  // let saga = updateParticipantbadge(theApi, action)

  // actual = saga.next().value
  // expect(actual).toEqual(select(theData))

  // actual = saga.next(action.data).value
  // expect(actual).toEqual(call(theApi.updateParticipantbadge, action.data))

  // response = {
  //   ok: false,
  //   data: {
  //     errors: [{ detail: 'An error goes here' }]
  //   }
  // }

  // actual = saga.next(response).value
  // expect(actual).toEqual(
  //   put(ParticipantbadgeActions.participantbadgeFailure(response.data.errors))
  // )

  // actual = saga.next(response).value
  // // expect(actual).toEqual(call(showSagaMessage, 'error'))

  // expect(saga.next().done).toEqual(true)
})
