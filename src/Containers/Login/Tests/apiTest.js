import API from '../../../Services/Api'

const baseUrl = 'https://jsonplaceholder.typicode.com/'
const api = API.create(baseUrl)

test('Api getLogins', async () => {
  const response = await api.getLogins()
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api getLogin', async () => {
  const id = 1
  const response = await api.getLogin({ id })
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api postLogin', async () => {
  const data = {
    field1: 'value1'
  }
  const response = await api.postLogin(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api updateLogin', async () => {
  const data = {
    id: 1,
    field1: 'value1'
  }
  const response = await api.updateLogin(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
test('Api removeLogin', async () => {
  const data = {
    id: 1
  }
  const response = await api.removeLogin(data)
  const hasData = 'data' in response
  const hasOk = 'ok' in response
  expect(hasData).toBe(true)
  expect(hasOk).toBe(true)
  expect(response.ok).toBe(true)
})
