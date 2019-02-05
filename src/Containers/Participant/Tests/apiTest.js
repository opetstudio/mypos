import API from '../../../Services/Api'

const baseUrl = 'https://jsonplaceholder.typicode.com/'
const api = API.create(baseUrl)

test('Api getParticipants', async () => {
  const response = await api.getParticipants()
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api getParticipant', async () => {
  const id = 1
  const response = await api.getParticipant({ id })
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api postParticipant', async () => {
  const data = {
    field1: 'value1'
  }
  const response = await api.postParticipant(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api updateParticipant', async () => {
  const data = {
    id: 1,
    field1: 'value1'
  }
  const response = await api.updateParticipant(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api removeParticipant', async () => {
  const data = {
    id: 1
  }
  const response = await api.removeParticipant(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
