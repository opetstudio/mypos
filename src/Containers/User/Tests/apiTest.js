import API from '../../../Services/Api'

const baseUrl = 'https://jsonplaceholder.typicode.com/'
const api = API.create(baseUrl)

test('Api getUsers', async () => {
  const response = await api.getUsers()
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api getUser', async () => {
  const id = 1
  const response = await api.getUser({ id })
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api postUser', async () => {
  const data = {
    field1: 'value1'
  }
  const response = await api.postUser(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api updateUser', async () => {
  const data = {
    id: 1,
    field1: 'value1'
  }
  const response = await api.updateUser(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api removeUser', async () => {
  const data = {
    id: 1
  }
  const response = await api.removeUser(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
