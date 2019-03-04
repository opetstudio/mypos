import Actions, { reducer, INITIAL_STATE } from '../redux'

it('creates', () => {
  const state = reducer(INITIAL_STATE, Actions.eventCreate())

  expect(state.fetching).toBe(true)
  expect(state.payload).toBe(null)
})
test('requests', () => {
  const state = reducer(INITIAL_STATE, Actions.eventRequest('data'))

  expect(state.fetching).toBe(true)
})
test('updates', () => {
  const state = reducer(INITIAL_STATE, Actions.eventUpdate('data'))

  expect(state.fetching).toBe(true)
  expect(state.payload).toBe(null)
})

test('removes', () => {
  const state = reducer(INITIAL_STATE, Actions.eventRemove('data'))

  expect(state.fetching).toBe(true)
  expect(state.payload).not.toBe(null)
})

test('gets All Records', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAll('data'))

  expect(state.fetching).toBe(true)
  expect(state.payload).toBe(null)
})

test('success', () => {
  const state = reducer(INITIAL_STATE, Actions.eventSuccess('hi'))

  expect(state.payload).toBe('hi')
})

test('success - single', () => {
  const state = reducer(INITIAL_STATE, Actions.eventSingleSuccess('hi'))

  expect(state.payload).toEqual('hi')
  expect(state.single).toEqual('hi')
  expect(state.multi).toEqual(null)
})

test('success - all', () => {
  const state = reducer(INITIAL_STATE, Actions.eventAllSuccess('hi'))

  expect(state.payload).toEqual('hi')
  expect(state.single).toEqual(null)
  expect(state.multi).toEqual('hi')
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.eventFailure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
})

test('data', () => {
  const state = reducer(INITIAL_STATE, Actions.eventData('jingoes'))
  expect(state.data).toBe('jingoes')
})
