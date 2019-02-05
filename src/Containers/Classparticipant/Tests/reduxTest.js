import Actions, { reducer, INITIAL_STATE } from '../redux'

it('creates', () => {
  const state = reducer(INITIAL_STATE, Actions.classparticipantCreate())

  expect(state.fetching).toBe(true)
  expect(state.payload).toBe(null)
})
test('requests', () => {
  const state = reducer(INITIAL_STATE, Actions.classparticipantRequest('data'))

  expect(state.fetching).toBe(true)
})
test('updates', () => {
  const state = reducer(INITIAL_STATE, Actions.classparticipantUpdate('data'))

  expect(state.fetching).toBe(true)
  expect(state.payload).toBe(null)
})

test('removes', () => {
  const state = reducer(INITIAL_STATE, Actions.classparticipantRemove('data'))

  expect(state.fetching).toBe(true)
  expect(state.payload).not.toBe(null)
})

test('gets All Records', () => {
  const state = reducer(INITIAL_STATE, Actions.classparticipantAll('data'))

  expect(state.fetching).toBe(true)
  expect(state.payload).toBe(null)
})

test('success', () => {
  const state = reducer(INITIAL_STATE, Actions.classparticipantSuccess('hi'))

  expect(state.payload).toBe('hi')
})

test('success - single', () => {
  const state = reducer(
    INITIAL_STATE,
    Actions.classparticipantSingleSuccess('hi')
  )

  expect(state.payload).toEqual('hi')
  expect(state.single).toEqual('hi')
  expect(state.multi).toEqual(null)
})

test('success - all', () => {
  const state = reducer(INITIAL_STATE, Actions.classparticipantAllSuccess('hi'))

  expect(state.payload).toEqual('hi')
  expect(state.single).toEqual(null)
  expect(state.multi).toEqual('hi')
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.classparticipantFailure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
})

test('data', () => {
  const state = reducer(INITIAL_STATE, Actions.classparticipantData('jingoes'))
  expect(state.data).toBe('jingoes')
})
