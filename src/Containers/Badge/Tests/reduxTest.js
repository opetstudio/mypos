import Actions, { reducer, INITIAL_STATE } from '../redux'

it('creates', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeCreate())

  expect(state.fetching).toBe(true)
  expect(state.payload).toBe(null)
})
test('requests', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeRequest('data'))

  expect(state.fetching).toBe(true)
})
test('updates', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeUpdate('data'))

  expect(state.fetching).toBe(true)
  expect(state.payload).toBe(null)
})

test('removes', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeRemove('data'))

  expect(state.fetching).toBe(true)
  expect(state.payload).not.toBe(null)
})

test('gets All Records', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeAll('data'))

  expect(state.fetching).toBe(true)
  expect(state.payload).toBe(null)
})

test('success', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeSuccess('hi'))

  expect(state.payload).toBe('hi')
})

test('success - single', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeSingleSuccess('hi'))

  expect(state.payload).toEqual('hi')
  expect(state.single).toEqual('hi')
  expect(state.multi).toEqual(null)
})

test('success - all', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeAllSuccess('hi'))

  expect(state.payload).toEqual('hi')
  expect(state.single).toEqual(null)
  expect(state.multi).toEqual('hi')
})

test('failure', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeFailure())

  expect(state.fetching).toBe(false)
  expect(state.error).toBe(true)
})

test('data', () => {
  const state = reducer(INITIAL_STATE, Actions.badgeData('jingoes'))
  expect(state.data).toBe('jingoes')
})
