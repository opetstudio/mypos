import API from '../../../Services/Api'

const baseUrl = 'https://jsonplaceholder.typicode.com/'
const api = API.create(baseUrl)

test('Api getUserroles', async () => {
  const response = await api.getUserroles()
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api getUserrole', async () => {
  const id = 1
  const response = await api.getUserrole({id})
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api postUserrole', async () => {
  const data = {
    'field1': 'value1'
  }
  const response = await api.postUserrole(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api updateUserrole', async () => {
  const data = {
    'id': 1,
    'field1': 'value1'
  }
  const response = await api.updateUserrole(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api removeUserrole', async () => {
  const data = {
    'id': 1
  }
  const response = await api.removeUserrole(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
